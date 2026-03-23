import { useState, useMemo, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   FIFA WORLD CUP 2026 SIMULATOR — Production v7
   - 3 modes: Auto / Manual / Quick
   - 6 languages with translated team names
   - Official FIFA bracket M73→M104
   - Light theme, large text, mobile responsive
   - Affiliation CTA
   ═══════════════════════════════════════════════════════════ */

// ── TEAM NAMES (6 languages) ──
const TN={
MEX:{fr:"Mexique",en:"Mexico",ar:"المكسيك",pt:"México",es:"México",hi:"मैक्सिको"},
KOR:{fr:"Corée du Sud",en:"South Korea",ar:"كوريا الجنوبية",pt:"Coreia do Sul",es:"Corea del Sur",hi:"दक्षिण कोरिया"},
RSA:{fr:"Afrique du Sud",en:"South Africa",ar:"جنوب أفريقيا",pt:"África do Sul",es:"Sudáfrica",hi:"दक्षिण अफ़्रीका"},
DEN:{fr:"Danemark",en:"Denmark",ar:"الدنمارك",pt:"Dinamarca",es:"Dinamarca",hi:"डेनमार्क"},
CAN:{fr:"Canada",en:"Canada",ar:"كندا",pt:"Canadá",es:"Canadá",hi:"कनाडा"},
SUI:{fr:"Suisse",en:"Switzerland",ar:"سويسرا",pt:"Suíça",es:"Suiza",hi:"स्विट्ज़रलैंड"},
QAT:{fr:"Qatar",en:"Qatar",ar:"قطر",pt:"Catar",es:"Catar",hi:"क़तर"},
ITA:{fr:"Italie",en:"Italy",ar:"إيطاليا",pt:"Itália",es:"Italia",hi:"इटली"},
BRA:{fr:"Brésil",en:"Brazil",ar:"البرازيل",pt:"Brasil",es:"Brasil",hi:"ब्राज़ील"},
MAR:{fr:"Maroc",en:"Morocco",ar:"المغرب",pt:"Marrocos",es:"Marruecos",hi:"मोरक्को"},
SCO:{fr:"Écosse",en:"Scotland",ar:"اسكتلندا",pt:"Escócia",es:"Escocia",hi:"स्कॉटलैंड"},
HAI:{fr:"Haïti",en:"Haiti",ar:"هايتي",pt:"Haiti",es:"Haití",hi:"हैती"},
USA:{fr:"États-Unis",en:"USA",ar:"أمريكا",pt:"EUA",es:"EE.UU.",hi:"अमेरिका"},
AUS:{fr:"Australie",en:"Australia",ar:"أستراليا",pt:"Austrália",es:"Australia",hi:"ऑस्ट्रेलिया"},
PAR:{fr:"Paraguay",en:"Paraguay",ar:"باراغواي",pt:"Paraguai",es:"Paraguay",hi:"पैराग्वे"},
TUR:{fr:"Turquie",en:"Türkiye",ar:"تركيا",pt:"Turquia",es:"Turquía",hi:"तुर्की"},
GER:{fr:"Allemagne",en:"Germany",ar:"ألمانيا",pt:"Alemanha",es:"Alemania",hi:"जर्मनी"},
CIV:{fr:"Côte d'Ivoire",en:"Ivory Coast",ar:"ساحل العاج",pt:"Costa do Marfim",es:"Costa de Marfil",hi:"आइवरी कोस्ट"},
ECU:{fr:"Équateur",en:"Ecuador",ar:"الإكوادور",pt:"Equador",es:"Ecuador",hi:"इक्वाडोर"},
CUR:{fr:"Curaçao",en:"Curaçao",ar:"كوراساو",pt:"Curaçao",es:"Curazao",hi:"कुराकाओ"},
NED:{fr:"Pays-Bas",en:"Netherlands",ar:"هولندا",pt:"Holanda",es:"Países Bajos",hi:"नीदरलैंड"},
TUN:{fr:"Tunisie",en:"Tunisia",ar:"تونس",pt:"Tunísia",es:"Túnez",hi:"ट्यूनीशिया"},
JPN:{fr:"Japon",en:"Japan",ar:"اليابان",pt:"Japão",es:"Japón",hi:"जापान"},
UKR:{fr:"Ukraine",en:"Ukraine",ar:"أوكرانيا",pt:"Ucrânia",es:"Ucrania",hi:"यूक्रेन"},
BEL:{fr:"Belgique",en:"Belgium",ar:"بلجيكا",pt:"Bélgica",es:"Bélgica",hi:"बेल्जियम"},
IRN:{fr:"Iran",en:"Iran",ar:"إيران",pt:"Irã",es:"Irán",hi:"ईरान"},
EGY:{fr:"Égypte",en:"Egypt",ar:"مصر",pt:"Egito",es:"Egipto",hi:"मिस्र"},
NZL:{fr:"Nlle-Zélande",en:"New Zealand",ar:"نيوزيلندا",pt:"Nova Zelândia",es:"Nueva Zelanda",hi:"न्यूज़ीलैंड"},
ESP:{fr:"Espagne",en:"Spain",ar:"إسبانيا",pt:"Espanha",es:"España",hi:"स्पेन"},
URU:{fr:"Uruguay",en:"Uruguay",ar:"أوروغواي",pt:"Uruguai",es:"Uruguay",hi:"उरुग्वे"},
KSA:{fr:"Arabie Saoudite",en:"Saudi Arabia",ar:"السعودية",pt:"Arábia Saudita",es:"Arabia Saudí",hi:"सऊदी अरब"},
CPV:{fr:"Cap-Vert",en:"Cape Verde",ar:"الرأس الأخضر",pt:"Cabo Verde",es:"Cabo Verde",hi:"केप वर्डे"},
FRA:{fr:"France",en:"France",ar:"فرنسا",pt:"França",es:"Francia",hi:"फ़्रांस"},
SEN:{fr:"Sénégal",en:"Senegal",ar:"السنغال",pt:"Senegal",es:"Senegal",hi:"सेनेगल"},
NOR:{fr:"Norvège",en:"Norway",ar:"النرويج",pt:"Noruega",es:"Noruega",hi:"नॉर्वे"},
IRQ:{fr:"Irak",en:"Iraq",ar:"العراق",pt:"Iraque",es:"Irak",hi:"इराक"},
ARG:{fr:"Argentine",en:"Argentina",ar:"الأرجنتين",pt:"Argentina",es:"Argentina",hi:"अर्जेंटीना"},
AUT:{fr:"Autriche",en:"Austria",ar:"النمسا",pt:"Áustria",es:"Austria",hi:"ऑस्ट्रिया"},
JOR:{fr:"Jordanie",en:"Jordan",ar:"الأردن",pt:"Jordânia",es:"Jordania",hi:"जॉर्डन"},
ALG:{fr:"Algérie",en:"Algeria",ar:"الجزائر",pt:"Argélia",es:"Argelia",hi:"अल्जीरिया"},
POR:{fr:"Portugal",en:"Portugal",ar:"البرتغال",pt:"Portugal",es:"Portugal",hi:"पुर्तगाल"},
COL:{fr:"Colombie",en:"Colombia",ar:"كولومبيا",pt:"Colômbia",es:"Colombia",hi:"कोलंबिया"},
UZB:{fr:"Ouzbékistan",en:"Uzbekistan",ar:"أوزبكستان",pt:"Uzbequistão",es:"Uzbekistán",hi:"उज़्बेकिस्तान"},
COD:{fr:"RD Congo",en:"DR Congo",ar:"الكونغو",pt:"RD Congo",es:"RD Congo",hi:"कांगो"},
ENG:{fr:"Angleterre",en:"England",ar:"إنجلترا",pt:"Inglaterra",es:"Inglaterra",hi:"इंग्लैंड"},
CRO:{fr:"Croatie",en:"Croatia",ar:"كرواتيا",pt:"Croácia",es:"Croacia",hi:"क्रोएशिया"},
GHA:{fr:"Ghana",en:"Ghana",ar:"غانا",pt:"Gana",es:"Ghana",hi:"घाना"},
PAN:{fr:"Panama",en:"Panama",ar:"بنما",pt:"Panamá",es:"Panamá",hi:"पनामा"},
};

// ── TRANSLATIONS ──
const LANGS={
fr:{flag:"🇫🇷",label:"Français",title:"COUPE DU MONDE 2026",sub:"USA • MEXIQUE • CANADA",teams:"ÉQUIPES",chooseMode:"CHOISIS TON MODE",auto:"⚡ SIMULATION AUTO",autoD:"Tout est simulé automatiquement",manual:"🎮 SIMULATION MANUELLE",manualD:"Choisis le score de chaque match",quick:"🏆 MANUELLE RAPIDE",quickD:"Classe les équipes par groupe puis choisis qui se qualifie",groups:"PHASE DE GROUPES",best3:"8 MEILLEURS 3es",r32:"32es DE FINALE",r16:"16es DE FINALE",qf:"QUARTS DE FINALE",sf:"DEMI-FINALES",final:"FINALE",third:"3e PLACE",champion:"CHAMPION DU MONDE 2026",chMode:"← MODE",next:"SUIVANT ➡️",seeC:"🏆 CHAMPION",pickW:"Choisis le vainqueur ou simule",simOne:"⚡ Simuler",simAll:"⚡ TOUT SIMULER",goKO:"PHASE ÉLIMINATOIRE ➡️",done:"terminé",group:"GROUPE",mp:"J",w:"V",d:"N",l:"D",gf:"BP",ga:"BC",gd:"DB",pts:"PTS",chLang:"🌐",et:"a.p.",pen:"tab",ok:"✓",resim:"🔄 Ressimuler",rankHint:"Utilise ▲ ▼ pour classer de 1er à 4e",bet:"Parie sur ce résultat →",share:"📤 Partager mon résultat",pick3:"Choisis 8 des 12 troisièmes qui se qualifient",pick3count:"3es sélectionnés",of:"sur"},
en:{flag:"🇬🇧",label:"English",title:"WORLD CUP 2026",sub:"USA • MEXICO • CANADA",teams:"TEAMS",chooseMode:"CHOOSE YOUR MODE",auto:"⚡ AUTO SIMULATION",autoD:"Everything simulated automatically",manual:"🎮 MANUAL SIMULATION",manualD:"Pick the score of every match",quick:"🏆 QUICK MANUAL",quickD:"Rank teams per group then pick who advances",groups:"GROUP STAGE",best3:"8 BEST 3RD",r32:"ROUND OF 32",r16:"ROUND OF 16",qf:"QUARTER-FINALS",sf:"SEMI-FINALS",final:"FINAL",third:"3RD PLACE",champion:"2026 WORLD CHAMPION",chMode:"← MODE",next:"NEXT ➡️",seeC:"🏆 CHAMPION",pickW:"Pick the winner or simulate",simOne:"⚡ Simulate",simAll:"⚡ SIMULATE ALL",goKO:"KNOCKOUT STAGE ➡️",done:"done",group:"GROUP",mp:"MP",w:"W",d:"D",l:"L",gf:"GF",ga:"GA",gd:"GD",pts:"PTS",chLang:"🌐",et:"a.e.t.",pen:"pen",ok:"✓",resim:"🔄 Re-simulate",rankHint:"Use ▲ ▼ to rank 1st → 4th",bet:"Bet on this result →",share:"📤 Share my result",pick3:"Pick 8 of the 12 third-place teams that qualify",pick3count:"3rds selected",of:"of"},
ar:{flag:"🇸🇦",label:"العربية",title:"كأس العالم 2026",sub:"أمريكا • المكسيك • كندا",teams:"منتخب",chooseMode:"اختر الوضع",auto:"⚡ محاكاة تلقائية",autoD:"كل النتائج تلقائية",manual:"🎮 محاكاة يدوية",manualD:"أنت تختار نتيجة كل مباراة",quick:"🏆 يدوية سريعة",quickD:"رتّب المنتخبات ثم اختر من يتأهل",groups:"دور المجموعات",best3:"أفضل 8 ثوالث",r32:"دور الـ32",r16:"دور الـ16",qf:"ربع النهائي",sf:"نصف النهائي",final:"النهائي",third:"المركز الثالث",champion:"بطل العالم 2026",chMode:"← الوضع",next:"التالي ➡️",seeC:"🏆 البطل",pickW:"اختر الفائز أو حاكي",simOne:"⚡ حاكي",simAll:"⚡ حاكي الكل",goKO:"مرحلة الإقصاء ➡️",done:"انتهى",group:"مجموعة",mp:"م",w:"ف",d:"ت",l:"خ",gf:"له",ga:"عليه",gd:"فارق",pts:"نقاط",chLang:"🌐",et:"و.إ.",pen:"ركلات",ok:"✓",resim:"🔄 إعادة",rankHint:"استعمل ▲ ▼ للترتيب من 1 إلى 4",bet:"راهن على هذه النتيجة →",share:"📤 شارك نتيجتك",pick3:"اختر 8 من 12 ثالث يتأهلون",pick3count:"ثوالث مختارين",of:"من"},
pt:{flag:"🇧🇷",label:"Português",title:"COPA DO MUNDO 2026",sub:"EUA • MÉXICO • CANADÁ",teams:"SELEÇÕES",chooseMode:"ESCOLHA SEU MODO",auto:"⚡ SIMULAÇÃO AUTO",autoD:"Tudo simulado automaticamente",manual:"🎮 SIMULAÇÃO MANUAL",manualD:"Escolha o placar de cada jogo",quick:"🏆 MANUAL RÁPIDO",quickD:"Classifique por grupo e escolha quem avança",groups:"FASE DE GRUPOS",best3:"8 MELHORES 3ºS",r32:"32 AVOS",r16:"OITAVAS",qf:"QUARTAS",sf:"SEMIFINAIS",final:"FINAL",third:"3º LUGAR",champion:"CAMPEÃO MUNDIAL 2026",chMode:"← MODO",next:"PRÓXIMO ➡️",seeC:"🏆 CAMPEÃO",pickW:"Escolha o vencedor ou simule",simOne:"⚡ Simular",simAll:"⚡ SIMULAR TUDO",goKO:"MATA-MATA ➡️",done:"feito",group:"GRUPO",mp:"J",w:"V",d:"E",l:"D",gf:"GP",ga:"GC",gd:"SG",pts:"PTS",chLang:"🌐",et:"prorr.",pen:"pên",ok:"✓",resim:"🔄 Resimular",rankHint:"Use ▲ ▼ para classificar 1º → 4º",bet:"Aposte neste resultado →",share:"📤 Compartilhar resultado",pick3:"Escolha 8 dos 12 terceiros que se classificam",pick3count:"3ºs selecionados",of:"de"},
es:{flag:"🇪🇸",label:"Español",title:"COPA DEL MUNDO 2026",sub:"EE.UU. • MÉXICO • CANADÁ",teams:"EQUIPOS",chooseMode:"ELIGE TU MODO",auto:"⚡ SIMULACIÓN AUTO",autoD:"Todo simulado automáticamente",manual:"🎮 SIMULACIÓN MANUAL",manualD:"Elige el marcador de cada partido",quick:"🏆 MANUAL RÁPIDO",quickD:"Clasifica por grupo y elige quién avanza",groups:"FASE DE GRUPOS",best3:"8 MEJORES 3OS",r32:"DIECISEISAVOS",r16:"OCTAVOS",qf:"CUARTOS",sf:"SEMIFINALES",final:"FINAL",third:"3ER LUGAR",champion:"CAMPEÓN DEL MUNDO 2026",chMode:"← MODO",next:"SIGUIENTE ➡️",seeC:"🏆 CAMPEÓN",pickW:"Elige al ganador o simula",simOne:"⚡ Simular",simAll:"⚡ SIMULAR TODO",goKO:"ELIMINATORIAS ➡️",done:"hecho",group:"GRUPO",mp:"PJ",w:"G",d:"E",l:"P",gf:"GF",ga:"GC",gd:"DG",pts:"PTS",chLang:"🌐",et:"prór.",pen:"pen",ok:"✓",resim:"🔄 Resimular",rankHint:"Usa ▲ ▼ para clasificar 1º → 4º",bet:"Apuesta en este resultado →",share:"📤 Compartir resultado",pick3:"Elige 8 de los 12 terceros que clasifican",pick3count:"3os seleccionados",of:"de"},
hi:{flag:"🇮🇳",label:"हिन्दी",title:"विश्व कप 2026",sub:"अमेरिका • मैक्सिको • कनाडा",teams:"टीमें",chooseMode:"मोड चुनें",auto:"⚡ ऑटो सिमुलेशन",autoD:"सब कुछ स्वचालित",manual:"🎮 मैनुअल सिमुलेशन",manualD:"हर मैच का स्कोर चुनें",quick:"🏆 क्विक मैनुअल",quickD:"ग्रुप में रैंक करें फिर चुनें कौन आगे बढ़े",groups:"ग्रुप चरण",best3:"8 सर्वश्रेष्ठ तीसरे",r32:"32 का दौर",r16:"16 का दौर",qf:"क्वार्टर फाइनल",sf:"सेमी फाइनल",final:"फाइनल",third:"तीसरा स्थान",champion:"2026 विश्व चैंपियन",chMode:"← मोड",next:"अगला ➡️",seeC:"🏆 चैंपियन",pickW:"विजेता चुनें या सिमुलेट करें",simOne:"⚡ सिमुलेट",simAll:"⚡ सब सिमुलेट",goKO:"नॉकआउट ➡️",done:"पूर्ण",group:"ग्रुप",mp:"मैच",w:"जीत",d:"ड्रॉ",l:"हार",gf:"गो+",ga:"गो-",gd:"गो.अ.",pts:"अंक",chLang:"🌐",et:"अ.स.",pen:"पेन",ok:"✓",resim:"🔄 पुनः",rankHint:"▲ ▼ से 1→4 रैंक करें",bet:"इस पर दांव लगाएं →",share:"📤 परिणाम शेयर करें",pick3:"12 में से 8 तीसरे स्थान की टीमें चुनें जो क्वालिफाई करें",pick3count:"तीसरे चुने गए",of:"में से"},
};

// ── TEAMS ──
// rt: composite rating (FIFA rank + ELO + form), rk: FIFA rank
// wc: World Cup pedigree (titles + deep runs), fm: current form (0-10), df: defensive strength (0-10), ho: host bonus
const TM={
MEX:{c:"MEX",f:"🇲🇽",g:"A",rt:82,rk:15,wc:3,fm:6,df:6,ho:1},KOR:{c:"KOR",f:"🇰🇷",g:"A",rt:76,rk:23,wc:2,fm:5,df:5,ho:0},RSA:{c:"RSA",f:"🇿🇦",g:"A",rt:65,rk:59,wc:1,fm:4,df:4,ho:0},DEN:{c:"DEN",f:"🇩🇰",g:"A",rt:78,rk:19,wc:2,fm:6,df:7,ho:0},
CAN:{c:"CAN",f:"🇨🇦",g:"B",rt:72,rk:40,wc:0,fm:5,df:5,ho:1},SUI:{c:"SUI",f:"🇨🇭",g:"B",rt:80,rk:16,wc:2,fm:6,df:7,ho:0},QAT:{c:"QAT",f:"🇶🇦",g:"B",rt:62,rk:45,wc:0,fm:3,df:4,ho:0},ITA:{c:"ITA",f:"🇮🇹",g:"B",rt:83,rk:9,wc:8,fm:7,df:8,ho:0},
BRA:{c:"BRA",f:"🇧🇷",g:"C",rt:87,rk:5,wc:10,fm:6,df:5,ho:0},MAR:{c:"MAR",f:"🇲🇦",g:"C",rt:79,rk:14,wc:4,fm:7,df:8,ho:0},SCO:{c:"SCO",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",g:"C",rt:70,rk:36,wc:1,fm:5,df:5,ho:0},HAI:{c:"HAI",f:"🇭🇹",g:"C",rt:52,rk:88,wc:0,fm:3,df:3,ho:0},
USA:{c:"USA",f:"🇺🇸",g:"D",rt:81,rk:11,wc:2,fm:7,df:6,ho:2},AUS:{c:"AUS",f:"🇦🇺",g:"D",rt:73,rk:25,wc:1,fm:5,df:5,ho:0},PAR:{c:"PAR",f:"🇵🇾",g:"D",rt:70,rk:43,wc:1,fm:4,df:5,ho:0},TUR:{c:"TUR",f:"🇹🇷",g:"D",rt:77,rk:26,wc:3,fm:6,df:5,ho:0},
GER:{c:"GER",f:"🇩🇪",g:"E",rt:84,rk:8,wc:9,fm:7,df:6,ho:0},CIV:{c:"CIV",f:"🇨🇮",g:"E",rt:72,rk:38,wc:1,fm:6,df:4,ho:0},ECU:{c:"ECU",f:"🇪🇨",g:"E",rt:71,rk:33,wc:1,fm:5,df:5,ho:0},CUR:{c:"CUR",f:"🇨🇼",g:"E",rt:48,rk:83,wc:0,fm:3,df:3,ho:0},
NED:{c:"NED",f:"🇳🇱",g:"F",rt:83,rk:7,wc:6,fm:7,df:7,ho:0},TUN:{c:"TUN",f:"🇹🇳",g:"F",rt:68,rk:39,wc:1,fm:5,df:6,ho:0},JPN:{c:"JPN",f:"🇯🇵",g:"F",rt:80,rk:13,wc:3,fm:8,df:6,ho:0},UKR:{c:"UKR",f:"🇺🇦",g:"F",rt:75,rk:22,wc:2,fm:5,df:5,ho:0},
BEL:{c:"BEL",f:"🇧🇪",g:"G",rt:80,rk:6,wc:3,fm:5,df:6,ho:0},IRN:{c:"IRN",f:"🇮🇷",g:"G",rt:72,rk:21,wc:1,fm:5,df:6,ho:0},EGY:{c:"EGY",f:"🇪🇬",g:"G",rt:70,rk:31,wc:1,fm:5,df:5,ho:0},NZL:{c:"NZL",f:"🇳🇿",g:"G",rt:55,rk:95,wc:0,fm:4,df:4,ho:0},
ESP:{c:"ESP",f:"🇪🇸",g:"H",rt:90,rk:1,wc:9,fm:9,df:8,ho:0},URU:{c:"URU",f:"🇺🇾",g:"H",rt:80,rk:10,wc:6,fm:6,df:7,ho:0},KSA:{c:"KSA",f:"🇸🇦",g:"H",rt:67,rk:56,wc:1,fm:4,df:4,ho:0},CPV:{c:"CPV",f:"🇨🇻",g:"H",rt:55,rk:62,wc:0,fm:4,df:4,ho:0},
FRA:{c:"FRA",f:"🇫🇷",g:"I",rt:88,rk:3,wc:9,fm:7,df:7,ho:0},SEN:{c:"SEN",f:"🇸🇳",g:"I",rt:75,rk:20,wc:2,fm:6,df:5,ho:0},NOR:{c:"NOR",f:"🇳🇴",g:"I",rt:74,rk:17,wc:1,fm:7,df:5,ho:0},IRQ:{c:"IRQ",f:"🇮🇶",g:"I",rt:63,rk:55,wc:0,fm:4,df:4,ho:0},
ARG:{c:"ARG",f:"🇦🇷",g:"J",rt:89,rk:2,wc:10,fm:8,df:7,ho:0},AUT:{c:"AUT",f:"🇦🇹",g:"J",rt:76,rk:24,wc:2,fm:6,df:6,ho:0},JOR:{c:"JOR",f:"🇯🇴",g:"J",rt:64,rk:68,wc:0,fm:5,df:5,ho:0},ALG:{c:"ALG",f:"🇩🇿",g:"J",rt:68,rk:37,wc:1,fm:5,df:5,ho:0},
POR:{c:"POR",f:"🇵🇹",g:"K",rt:86,rk:4,wc:5,fm:7,df:7,ho:0},COL:{c:"COL",f:"🇨🇴",g:"K",rt:81,rk:12,wc:2,fm:7,df:6,ho:0},UZB:{c:"UZB",f:"🇺🇿",g:"K",rt:66,rk:53,wc:0,fm:5,df:5,ho:0},COD:{c:"COD",f:"🇨🇩",g:"K",rt:60,rk:49,wc:0,fm:4,df:4,ho:0},
ENG:{c:"ENG",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:"L",rt:85,rk:4,wc:6,fm:7,df:7,ho:0},CRO:{c:"CRO",f:"🇭🇷",g:"L",rt:79,rk:18,wc:5,fm:6,df:7,ho:0},GHA:{c:"GHA",f:"🇬🇭",g:"L",rt:66,rk:44,wc:2,fm:5,df:4,ho:0},PAN:{c:"PAN",f:"🇵🇦",g:"L",rt:58,rk:72,wc:0,fm:4,df:4,ho:0},
};
const GS=["A","B","C","D","E","F","G","H","I","J","K","L"];
const gT=g=>Object.values(TM).filter(t=>t.g===g);
const nm=(code,lg)=>TN[code]?.[lg]||code;

// ── SIMULATION ENGINE ──
// Poisson distribution for realistic goal generation
const poi=lam=>{let L=Math.exp(-lam),k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};

// Composite strength: FIFA rating (50%) + WC pedigree (15%) + form (20%) + defense (10%) + host bonus (5%)
function getStrength(t){
  return t.rt * 0.50
    + (t.wc || 0) * 1.5   // WC pedigree: titles/deep runs boost (max ~15 pts)
    + (t.fm || 5) * 2.0    // current form: 0-10 scaled to 0-20 (max ~20 pts)
    + (t.df || 5) * 1.0    // defensive solidity: 0-10 (max ~10 pts)
    + (t.ho || 0) * 3.0;   // host nation bonus (USA=2 → 6pts, MEX/CAN=1 → 3pts)
}

// Realistic match simulation using composite strength
// Accounts for: team quality gap, defensive matchups, KO pressure, low-scoring tendencies
function simM(a,b,ko=false){
  const sA=getStrength(a), sB=getStrength(b);
  const diff=(sA-sB)/100;

  // Base expected goals: ~1.25 average, adjusted by strength diff
  // Defensive teams concede less: opponent xG reduced by high df
  const defFactorB = 1 - ((b.df||5) - 5) * 0.04; // good defense (df=8) reduces opponent xG by ~12%
  const defFactorA = 1 - ((a.df||5) - 5) * 0.04;

  // KO matches tend to be tighter / more cagey
  const koFactor = ko ? 0.88 : 1.0;

  const xgA = Math.max(0.25, (1.25 + diff * 2.0) * defFactorB * koFactor);
  const xgB = Math.max(0.25, (1.25 - diff * 2.0) * defFactorA * koFactor);

  let x = poi(xgA), y = poi(xgB);

  // Cap unrealistic scorelines: max 6 goals per team (7-0 extremely rare in WC)
  x = Math.min(x, 6); y = Math.min(y, 6);

  if(ko && x === y){
    // Extra time: tighter, fewer goals, slight favorite advantage
    const favA = sA >= sB;
    const etXgA = favA ? 0.35 : 0.25;
    const etXgB = favA ? 0.25 : 0.35;
    const e1 = poi(etXgA);
    const e2 = poi(etXgB);
    x += e1; y += e2;

    if(x === y){
      // Penalties: slight favorite edge (55/45) + experienced teams do better
      const wcBonus = ((a.wc||0) - (b.wc||0)) * 0.02; // WC experience helps in pens
      const penChance = Math.min(0.65, Math.max(0.35, (favA ? 0.55 : 0.45) + wcBonus));
      const favWins = Math.random() < penChance;
      // Realistic pen scores: 5-4, 4-3, 5-3, 6-5
      const penScores = [[5,4],[4,3],[5,3],[6,5],[4,2],[3,2]];
      const ps = penScores[Math.floor(Math.random() * penScores.length)];
      const p1 = favWins ? ps[0] : ps[1];
      const p2 = favWins ? ps[1] : ps[0];
      return {g1:x, g2:y, p1, p2, et:true};
    }
    return {g1:x, g2:y, p1:null, p2:null, et:true};
  }
  return {g1:x, g2:y, p1:null, p2:null, et:false};
}
function winner(a,b,r){if(r.g1>r.g2)return a;if(r.g2>r.g1)return b;if(r.p1!=null)return r.p1>r.p2?a:b;return null}

function buildTable(teams,results){
  const tb={};
  teams.forEach(t=>{tb[t.c]={...t,pts:0,gf:0,ga:0,gd:0,w:0,d:0,l:0}});
  results.forEach(r=>{
    if(!r||!tb[r.t1.c]||!tb[r.t2.c])return;
    const a=tb[r.t1.c],b=tb[r.t2.c];
    a.gf+=r.g1;a.ga+=r.g2;b.gf+=r.g2;b.ga+=r.g1;
    if(r.g1>r.g2){a.pts+=3;a.w++;b.l++}
    else if(r.g1<r.g2){b.pts+=3;b.w++;a.l++}
    else{a.pts++;b.pts++;a.d++;b.d++}
  });
  Object.values(tb).forEach(t=>{t.gd=t.gf-t.ga});
  return Object.values(tb).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.rk-b.rk);
}

function buildBracket(tb){
  const w=g=>tb[g][0], r=g=>tb[g][1];
  const thirds=GS.map(g=>({...tb[g][2],fg:g}));
  thirds.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.rk-b.rk);
  const q3=thirds.slice(0,8), q3G=new Set(q3.map(t=>t.fg));
  // FIFA 3rd-place allocation pools
  const slots=[{id:74,p:"ABCDF"},{id:77,p:"CDFGH"},{id:79,p:"CEFHI"},{id:80,p:"EHIJK"},{id:81,p:"BEFIJ"},{id:82,p:"AEHIJ"},{id:85,p:"EFGIJ"},{id:87,p:"DEIJL"}];
  const used=new Set(), avail=[...q3], assigned={};
  for(const s of slots){
    const pool=s.p.split("").filter(g=>q3G.has(g)&&!used.has(g));
    const cands=avail.filter(t=>pool.includes(t.fg));
    if(cands.length){assigned[s.id]=cands[0];used.add(cands[0].fg);avail.splice(avail.findIndex(t=>t.c===cands[0].c),1)}
  }
  for(const s of slots) if(!assigned[s.id]&&avail.length) assigned[s.id]=avail.shift();

  return{
    r32:[
      {id:73,t1:r("A"),t2:r("B"),lb:"2A v 2B"},{id:75,t1:w("F"),t2:r("C"),lb:"1F v 2C"},
      {id:74,t1:w("E"),t2:assigned[74],lb:"1E v 3rd"},{id:77,t1:w("I"),t2:assigned[77],lb:"1I v 3rd"},
      {id:76,t1:w("C"),t2:r("F"),lb:"1C v 2F"},{id:78,t1:r("E"),t2:r("I"),lb:"2E v 2I"},
      {id:79,t1:w("A"),t2:assigned[79],lb:"1A v 3rd"},{id:80,t1:w("L"),t2:assigned[80],lb:"1L v 3rd"},
      {id:83,t1:r("K"),t2:r("L"),lb:"2K v 2L"},{id:84,t1:w("H"),t2:r("J"),lb:"1H v 2J"},
      {id:81,t1:w("D"),t2:assigned[81],lb:"1D v 3rd"},{id:82,t1:w("G"),t2:assigned[82],lb:"1G v 3rd"},
      {id:86,t1:w("J"),t2:r("H"),lb:"1J v 2H"},{id:88,t1:r("D"),t2:r("G"),lb:"2D v 2G"},
      {id:85,t1:w("B"),t2:assigned[85],lb:"1B v 3rd"},{id:87,t1:w("K"),t2:assigned[87],lb:"1K v 3rd"},
    ],
    r16:[[90,73,75],[89,74,77],[91,76,78],[92,79,80],[93,83,84],[94,81,82],[95,86,88],[96,85,87]],
    qf:[[97,89,90],[99,91,92],[98,93,94],[100,95,96]],
    sf:[[101,97,99],[102,98,100]],
    q3
  };
}

// ── COLORS ──
const C={bg:"#FAFBFD",b2:"#F0F2F6",cd:"#FFFFFF",tx:"#1a1a2e",t2:"#555577",t3:"#9999bb",
  ac:"#d4145a",a2:"#fbb03b",gn:"#00a854",bd:"#E2E5EB",bl:"#2563eb"};

// ── REUSABLE BUTTON COMPONENTS (outside render) ──
const Btn=({onClick,children,color=C.bl})=>(
  <button onClick={onClick} style={{padding:"6px 16px",fontSize:12,fontWeight:700,fontFamily:"'Oswald',sans-serif",letterSpacing:1,borderRadius:8,border:`1px solid ${color}`,background:`${color}11`,color,cursor:"pointer"}}>{children}</button>
);
const BigBtn=({onClick,children,color=C.gn})=>(
  <button onClick={onClick} style={{padding:"14px 40px",fontSize:16,fontWeight:800,fontFamily:"'Oswald',sans-serif",letterSpacing:3,border:"none",borderRadius:50,cursor:"pointer",color:"#fff",background:`linear-gradient(135deg,${color},${color}cc)`,boxShadow:`0 4px 20px ${color}33`,transition:"transform .15s"}}
    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{children}</button>
);

// ════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════
export default function App(){
  const[lang,setLang]=useState(null);
  const[mode,setMode]=useState(null);
  const[gm,setGm]=useState({});
  const[qR,setQR]=useState(()=>{const o={};GS.forEach(g=>{o[g]=gT(g).map(t=>t.c)});return o});
  const[q3Pick,setQ3Pick]=useState({}); // quick mode: which 3rd-place teams user picks {groupLetter: true/false}
  const[gDone,setGDone]=useState(false);
  const[br,setBr]=useState(null);
  const[koRnd,setKoRnd]=useState(null);
  const[koM,setKoM]=useState([]);
  const[koW,setKoW]=useState({});
  const[koH,setKoH]=useState({r32:[],r16:[],qf:[],sf:[]});
  const[champ,setChamp]=useState(null);
  const[autoAll,setAutoAll]=useState(null);
  const[autoStep,setAutoStep]=useState(0);
  const koRef=useRef(null);
  const savedMode=useRef(null);

  const L=lang?LANGS[lang]:LANGS.fr;
  const rtl=lang==="ar";
  const N=useCallback(t=>{if(!t||!t.c)return"?";return nm(t.c,lang||"fr")},[lang]);

  const fullReset=useCallback(()=>{
    setMode(null);setGm({});
    setQR(()=>{const o={};GS.forEach(g=>{o[g]=gT(g).map(t=>t.c)});return o});
    setQ3Pick({});
    setGDone(false);setBr(null);setKoRnd(null);setKoW({});
    setKoH({r32:[],r16:[],qf:[],sf:[]});setChamp(null);setAutoAll(null);setAutoStep(0);
  },[]);

  // Scroll to knockout section
  useEffect(()=>{if(koRef.current&&(koRnd||autoStep>0))koRef.current.scrollIntoView({behavior:"smooth",block:"start"})},[koRnd,autoStep]);

  // ── GROUP FIXTURES ──
  const gFx=useMemo(()=>{const fx={};GS.forEach(g=>{const ts=gT(g),ms=[];
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++)ms.push({t1:ts[i],t2:ts[j]});fx[g]=ms});return fx},[]);

  // ── AUTO MODE ──
  const doAuto=useCallback(()=>{
    setMode("auto");setChamp(null);setAutoStep(0);
    const g={},tb={};
    GS.forEach(gr=>{const ts=gT(gr),ms=[];
      for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){const r=simM(ts[i],ts[j]);ms.push({t1:ts[i],t2:ts[j],...r})}
      g[gr]=ms;tb[gr]=buildTable(ts,ms)});
    setGm(g);setGDone(true);
    const b=buildBracket(tb);setBr(b);
    const ws={},all=[];
    b.r32.forEach(m=>{const r=simM(m.t1,m.t2,true);ws[m.id]=winner(m.t1,m.t2,r);all.push({...m,...r})});
    b.r16.forEach(([id,a,c])=>{const t1=ws[a],t2=ws[c],r=simM(t1,t2,true);ws[id]=winner(t1,t2,r);all.push({id,t1,t2,...r})});
    b.qf.forEach(([id,a,c])=>{const t1=ws[a],t2=ws[c],r=simM(t1,t2,true);ws[id]=winner(t1,t2,r);all.push({id,t1,t2,...r})});
    b.sf.forEach(([id,a,c])=>{const t1=ws[a],t2=ws[c],r=simM(t1,t2,true);ws[id]=winner(t1,t2,r);all.push({id,t1,t2,...r})});
    const sf0=all.find(m=>m.id===101),sf1=all.find(m=>m.id===102);
    const lo1=ws[101]===sf0.t1?sf0.t2:sf0.t1, lo2=ws[102]===sf1.t1?sf1.t2:sf1.t1;
    all.push({id:103,t1:lo1,t2:lo2,...simM(lo1,lo2,true)});
    all.push({id:104,t1:ws[101],t2:ws[102],...simM(ws[101],ws[102],true)});
    setAutoAll(all);
    // Progressive reveal
    setTimeout(()=>setAutoStep(1),200);
    setTimeout(()=>setAutoStep(2),600);
    setTimeout(()=>setAutoStep(3),1000);
    setTimeout(()=>setAutoStep(4),1400);
    setTimeout(()=>setAutoStep(5),1800);
    setTimeout(()=>{setAutoStep(6);setChamp(winner(all[all.length-1].t1,all[all.length-1].t2,all[all.length-1]))},2200);
  },[]);

  // ── MANUAL ──
  const setGMatch=useCallback((g,i,r)=>setGm(p=>{const n={...p};if(!n[g])n[g]=[];n[g]=[...(n[g]||[])];n[g][i]=r;return n}),[]);
  const simAllGr=useCallback(()=>{setGm(prev=>{const n={...prev};GS.forEach(g=>{const fx=gFx[g];if(!n[g])n[g]=[];
    fx.forEach((f,i)=>{if(!n[g][i])n[g][i]={...f,...simM(f.t1,f.t2)}})});return n})},[gFx]);
  const allGrD=useMemo(()=>GS.every(g=>gFx[g]?.every((_,i)=>gm[g]?.[i])),[gm,gFx]);

  // ── QUICK ──
  const mvUp=useCallback((g,i)=>{if(i<=0)return;setQR(p=>{const r=[...p[g]];[r[i-1],r[i]]=[r[i],r[i-1]];return{...p,[g]:r}})},[]);
  const mvDn=useCallback((g,i)=>{if(i>=3)return;setQR(p=>{const r=[...p[g]];[r[i],r[i+1]]=[r[i+1],r[i]];return{...p,[g]:r}})},[]);

  // ── TABLES (for completed groups or quick mode) ──
  const tables=useMemo(()=>{
    if(mode==="quick"){
      const t={};GS.forEach(g=>{const ranked=qR[g];
        // 3rd place team gets boosted stats if user picked them as qualifying 3rd
        const picked3=q3Pick[g];
        t[g]=ranked.map((c,i)=>({...TM[c],
          pts:i===0?9:i===1?6:i===2?(picked3?4:3):0,
          gf:7-i*2,ga:1+i,gd:6-i*3,w:i===0?3:i===1?2:i===2?(picked3?1:1):0,
          d:i===2?(picked3?1:0):0,l:i,
        }))});return t}
    if(!allGrD)return null;
    const t={};GS.forEach(g=>{t[g]=buildTable(gT(g),gm[g]||[])});return t
  },[allGrD,gm,mode,qR,q3Pick]);

  // Quick mode: count how many 3rds are picked
  const q3Count=useMemo(()=>Object.values(q3Pick).filter(Boolean).length,[q3Pick]);
  const q3Ready=q3Count===8;

  // ── KNOCKOUT CONTROLS ──
  const goKO=useCallback(()=>{
    if(!tables)return;setGDone(true);
    const b=buildBracket(tables);setBr(b);setKoRnd("r32");setKoM(b.r32);
    setKoW({});setKoH({r32:[],r16:[],qf:[],sf:[]})
  },[tables]);

  const kPick=useCallback((id,t)=>setKoW(p=>({...p,[id]:t})),[]);
  const kSim=useCallback(m=>{const r=simM(m.t1,m.t2,true);setKoW(p=>({...p,[m.id]:winner(m.t1,m.t2,r)}))},[]);
  const kSimAll=useCallback(()=>{setKoW(prev=>{const nw={...prev};koM.forEach(m=>{if(!nw[m.id]){const r=simM(m.t1,m.t2,true);nw[m.id]=winner(m.t1,m.t2,r)}});return nw})},[koM]);

  const canAdv=useMemo(()=>{
    if(!br)return false;const w=koW;
    if(koRnd==="r32")return br.r32.every(m=>w[m.id]);
    if(koRnd==="r16")return br.r16.every(([id])=>w[id]);
    if(koRnd==="qf")return br.qf.every(([id])=>w[id]);
    if(koRnd==="sf")return br.sf.every(([id])=>w[id]);
    if(koRnd==="final")return!!w[104];return false
  },[br,koW,koRnd]);

  const adv=useCallback(()=>{
    if(!br)return;const w=koW;
    if(koRnd==="r32"){setKoH(p=>({...p,r32:br.r32.map(m=>({id:m.id,wn:w[m.id]}))}));setKoM(br.r16.map(([id,a,b])=>({id,t1:w[a],t2:w[b],lb:`W${a} v W${b}`})));setKoRnd("r16")}
    else if(koRnd==="r16"){setKoH(p=>({...p,r16:br.r16.map(([id])=>({id,wn:w[id]}))}));setKoM(br.qf.map(([id,a,b])=>({id,t1:w[a],t2:w[b],lb:`W${a} v W${b}`})));setKoRnd("qf")}
    else if(koRnd==="qf"){setKoH(p=>({...p,qf:br.qf.map(([id])=>({id,wn:w[id]}))}));setKoM(br.sf.map(([id,a,b])=>({id,t1:w[a],t2:w[b],lb:`W${a} v W${b}`})));setKoRnd("sf")}
    else if(koRnd==="sf"){
      setKoH(p=>({...p,sf:br.sf.map(([id])=>({id,wn:w[id]}))}));
      const ms=koM;
      const l1=w[101]===ms[0]?.t1?ms[0]?.t2:ms[0]?.t1;
      const l2=w[102]===ms[1]?.t1?ms[1]?.t2:ms[1]?.t1;
      if(l1&&l2){setKoM([{id:103,t1:l1,t2:l2,lb:L.third},{id:104,t1:w[101],t2:w[102],lb:"🏆 "+L.final}]);setKoRnd("final")}}
    else if(koRnd==="final"&&w[104])setChamp(w[104]);
  },[br,koW,koRnd,koM,L]);

  const roundNames={r32:L.r32,r16:L.r16,qf:L.qf,sf:L.sf,final:L.final+" & "+L.third};

  // Share
  const doShare=useCallback(()=>{
    if(!champ)return;
    const text=`${L.champion}: ${champ.f} ${N(champ)}! 🏆⚽\n\nWorldCup2026Simulator.com`;
    if(navigator.share){navigator.share({title:L.title,text})}
    else if(navigator.clipboard){navigator.clipboard.writeText(text)}
  },[champ,L,N]);

  // ══════ LANGUAGE SELECT ══════
  if(!lang) return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg},#e8edf5)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Manrope',sans-serif",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{fontSize:60,marginBottom:16}}>⚽</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(24px,6vw,32px)",fontWeight:800,color:C.tx,letterSpacing:3,textAlign:"center"}}>FIFA WORLD CUP 2026</div>
      <div style={{fontSize:14,color:C.t2,marginBottom:32,letterSpacing:2}}>USA • MEXICO • CANADA</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:480,width:"100%"}}>
        {Object.entries(LANGS).map(([k,v])=>(
          <button key={k} onClick={()=>setLang(k)} style={{padding:"18px 10px",borderRadius:14,border:`2px solid ${C.bd}`,background:C.cd,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.ac;e.currentTarget.style.transform="scale(1.03)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.transform="scale(1)"}}>
            <span style={{fontSize:34}}>{v.flag}</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:C.tx}}>{v.label}</span>
          </button>))}
      </div>
    </div>
  );

  // ══════ RENDER ══════
  return(
  <div dir={rtl?"rtl":"ltr"} style={{minHeight:"100vh",background:C.bg,color:C.tx,fontFamily:"'Manrope',sans-serif"}}>
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}select{appearance:auto}
  @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu .4s ease-out forwards}
  @keyframes pop{0%{transform:scale(.8);opacity:0}100%{transform:scale(1);opacity:1}}.pop{animation:pop .4s ease-out forwards}
  @keyframes shine{0%{background-position:200%}100%{background-position:-200%}}
  `}</style>

  {/* ── HEADER ── */}
  <div style={{textAlign:"center",padding:"24px 16px 12px",background:C.cd,borderBottom:`1px solid ${C.bd}`}}>
    <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(22px,5vw,38px)",fontWeight:800,letterSpacing:2,color:C.tx}}>{L.title}</h1>
    <div style={{fontSize:13,color:C.t2,marginTop:3}}>{L.sub} — 48 {L.teams}</div>
    <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
      <Btn onClick={()=>{setLang(null);fullReset()}} color={C.t3}>{L.chLang}</Btn>
      {mode&&<Btn onClick={fullReset} color={C.t2}>{L.chMode}</Btn>}
      {mode&&<Btn onClick={()=>{const m=mode;fullReset();setTimeout(()=>{if(m==="auto")doAuto();else setMode(m)},50)}} color={C.ac}>{L.resim}</Btn>}
    </div>
  </div>

  {/* ── MODE SELECT ── */}
  {!mode&&(
  <div className="fu" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"28px 16px",maxWidth:540,margin:"0 auto"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,letterSpacing:3,color:C.t2}}>{L.chooseMode}</div>
    {[["auto",L.auto,L.autoD,C.ac],["manual",L.manual,L.manualD,C.bl],["quick",L.quick,L.quickD,C.gn]].map(([m,t,d,col])=>(
      <button key={m} onClick={()=>m==="auto"?doAuto():setMode(m)} style={{width:"100%",padding:"22px",borderRadius:16,border:`2px solid ${col}22`,background:C.cd,cursor:"pointer",textAlign:rtl?"right":"left",transition:"all 0.2s",boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.transform="translateY(-2px)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=col+"22";e.currentTarget.style.transform="translateY(0)"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,letterSpacing:2,color:C.tx}}>{t}</div>
        <div style={{fontSize:14,color:C.t2,marginTop:5}}>{d}</div>
      </button>))}
  </div>)}

  {/* ── CHAMPION ── */}
  {champ&&(
  <div className="pop" style={{textAlign:"center",margin:"16px auto",padding:"24px 20px",maxWidth:420,background:C.cd,borderRadius:20,border:`2px solid ${C.a2}`,boxShadow:`0 6px 30px ${C.a2}33`}}>
    <div style={{fontSize:52}}>🏆</div>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:6,color:C.t3,marginTop:4}}>{L.champion}</div>
    <div style={{fontSize:44,marginTop:4}}>{champ.f}</div>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:30,fontWeight:800,color:C.ac,marginTop:2}}>{N(champ).toUpperCase()}</div>
    <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
      <button onClick={doShare} style={{padding:"10px 20px",fontSize:13,fontWeight:700,borderRadius:10,border:`1px solid ${C.bl}`,background:`${C.bl}11`,color:C.bl,cursor:"pointer"}}>{L.share}</button>
      <button style={{padding:"10px 20px",fontSize:13,fontWeight:700,borderRadius:10,border:`1px solid ${C.gn}`,background:`${C.gn}11`,color:C.gn,cursor:"pointer"}}>{L.bet} 🎰</button>
    </div>
  </div>)}

  {/* ── QUICK MODE GROUPS ── */}
  {mode==="quick"&&!gDone&&(
  <div style={{padding:"16px 12px",maxWidth:1440,margin:"0 auto"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,letterSpacing:4,color:C.t2,textAlign:"center",marginBottom:6}}>{L.groups}</div>
    <div style={{fontSize:14,textAlign:"center",color:C.t3,marginBottom:14}}>{L.rankHint}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
      {GS.map(g=>(
        <div key={g} style={{background:C.cd,borderRadius:14,padding:"14px",border:`1px solid ${C.bd}`,boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:800,fontSize:18,color:C.ac,letterSpacing:2,marginBottom:10}}>{L.group} {g}</div>
          {qR[g].map((c,i)=>{const t=TM[c];const q=i<2;const t3=i===2;
            return(
              <div key={c} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",marginBottom:5,borderRadius:10,
                background:q?`${C.gn}08`:t3?`${C.a2}08`:C.b2,
                border:q?`2px solid ${C.gn}33`:t3?`2px solid ${C.a2}33`:`1px solid ${C.bd}`}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:800,color:q?C.gn:t3?C.a2:C.t3,width:28,textAlign:"center"}}>{i+1}</div>
                <span style={{fontSize:22}}>{t.f}</span>
                <span style={{flex:1,fontSize:15,fontWeight:q?700:500,color:q?C.tx:C.t2}}>{N(t)}</span>
                <div style={{display:"flex",flexDirection:"column",gap:2}}>
                  <button onClick={()=>mvUp(g,i)} disabled={i===0} style={{width:32,height:24,border:`1px solid ${C.bd}`,borderRadius:5,background:C.cd,cursor:i===0?"default":"pointer",fontSize:13,color:i===0?C.bd:C.t2,fontWeight:700}}>▲</button>
                  <button onClick={()=>mvDn(g,i)} disabled={i>=3} style={{width:32,height:24,border:`1px solid ${C.bd}`,borderRadius:5,background:C.cd,cursor:i>=3?"default":"pointer",fontSize:13,color:i>=3?C.bd:C.t2,fontWeight:700}}>▼</button>
                </div>
              </div>)})}
          <div style={{fontSize:10,color:C.t3,textAlign:"center",marginTop:5}}>🟢 1-2 · 🟡 3: {L.best3}</div>
        </div>))}
    </div>

    {/* 3RD PLACE PICKER */}
    <div style={{marginTop:20,background:C.cd,borderRadius:16,padding:"18px",border:`2px solid ${C.a2}44`,boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,letterSpacing:3,color:C.a2,textAlign:"center",marginBottom:4}}>
        🟡 {L.best3}
      </div>
      <div style={{fontSize:13,textAlign:"center",color:C.t2,marginBottom:12}}>
        {L.pick3} — <strong style={{color:q3Count===8?C.gn:C.ac}}>{q3Count} {L.of} 8</strong>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8}}>
        {GS.map(g=>{
          const thirdCode=qR[g][2];
          const t=TM[thirdCode];
          const picked=!!q3Pick[g];
          const disabled=!picked&&q3Count>=8;
          return(
            <button key={g} onClick={()=>{if(disabled)return;setQ3Pick(p=>({...p,[g]:!p[g]}))}}
              style={{
                display:"flex",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,
                cursor:disabled?"not-allowed":"pointer",transition:"all .2s",
                border:picked?`2px solid ${C.gn}`:`2px solid ${C.bd}`,
                background:picked?`${C.gn}10`:disabled?`${C.b2}`:`${C.cd}`,
                opacity:disabled?.5:1,
              }}>
              <span style={{fontSize:20}}>{t.f}</span>
              <span style={{fontSize:14,fontWeight:picked?700:500,color:picked?C.tx:C.t2}}>{N(t)}</span>
              <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:C.t3,marginLeft:2}}>({L.group}{g})</span>
              {picked&&<span style={{color:C.gn,fontWeight:900,fontSize:16}}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>

    <div className="fu" style={{textAlign:"center",marginTop:18}}>
      {q3Ready ? (
        <BigBtn onClick={goKO} color={C.gn}>{L.goKO}</BigBtn>
      ) : (
        <div style={{padding:"12px 24px",fontSize:14,color:C.t3,fontFamily:"'Oswald',sans-serif",letterSpacing:2}}>
          {L.pick3count}: {q3Count}/8
        </div>
      )}
    </div>
  </div>)}

  {/* ── MANUAL GROUPS ── */}
  {mode==="manual"&&!gDone&&(
  <div style={{padding:"16px 12px",maxWidth:1440,margin:"0 auto"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,letterSpacing:4,color:C.t2,textAlign:"center",marginBottom:8}}>{L.groups}</div>
    <div style={{textAlign:"center",marginBottom:12}}><Btn onClick={simAllGr} color={C.bl}>{L.simAll}</Btn></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
      {GS.map(g=>{const fx=gFx[g],ms=gm[g]||[];
        return(<div key={g} style={{background:C.cd,borderRadius:14,padding:"14px",border:`1px solid ${C.bd}`}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:800,fontSize:18,color:C.ac,letterSpacing:2,marginBottom:10}}>{L.group} {g}</div>
          {fx.map((f,idx)=>{const done=ms[idx];const sid=`${g}${idx}`;
            return(<div key={idx} style={{background:done?C.b2:`${C.a2}08`,borderRadius:10,padding:"8px 10px",marginBottom:6,border:done?`1px solid ${C.bd}`:`2px solid ${C.a2}44`}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:14,fontWeight:700}}>{f.t1.f} {N(f.t1)}</span>
                {done&&<span style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:900,background:C.b2,borderRadius:6,padding:"2px 12px"}}>{done.g1} - {done.g2}</span>}
                <span style={{fontSize:14,fontWeight:700}}>{N(f.t2)} {f.t2.f}</span>
              </div>
              {!done&&(<div style={{display:"flex",gap:5,alignItems:"center",justifyContent:"center",marginTop:6}}>
                <select defaultValue={0} id={`a${sid}`} style={{fontSize:18,fontWeight:800,padding:"4px",borderRadius:6,border:`1px solid ${C.bd}`,width:48,textAlign:"center",fontFamily:"'Oswald',sans-serif"}}>
                  {[0,1,2,3,4,5,6,7].map(v=><option key={v}>{v}</option>)}</select>
                <span style={{fontWeight:800,color:C.t3,fontSize:16}}>-</span>
                <select defaultValue={0} id={`b${sid}`} style={{fontSize:18,fontWeight:800,padding:"4px",borderRadius:6,border:`1px solid ${C.bd}`,width:48,textAlign:"center",fontFamily:"'Oswald',sans-serif"}}>
                  {[0,1,2,3,4,5,6,7].map(v=><option key={v}>{v}</option>)}</select>
                <Btn onClick={()=>{const el1=document.getElementById(`a${sid}`),el2=document.getElementById(`b${sid}`);if(el1&&el2)setGMatch(g,idx,{t1:f.t1,t2:f.t2,g1:+el1.value,g2:+el2.value,p1:null,p2:null,et:false})}} color={C.gn}>{L.ok}</Btn>
                <Btn onClick={()=>{const r=simM(f.t1,f.t2);setGMatch(g,idx,{t1:f.t1,t2:f.t2,...r})}} color={C.bl}>{L.simOne}</Btn>
              </div>)}
            </div>)})}
        </div>)})}
    </div>
    {allGrD&&(<div className="pop" style={{textAlign:"center",marginTop:18}}><BigBtn onClick={goKO} color={C.gn}>{L.goKO}</BigBtn></div>)}
  </div>)}

  {/* ── GROUP TABLES (after done) ── */}
  {gDone&&tables&&(
  <div style={{padding:"14px 12px",maxWidth:1440,margin:"0 auto"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,letterSpacing:4,color:C.t2,textAlign:"center",marginBottom:10}}>{L.groups}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:9}}>
      {GS.map(g=>{const tb=tables[g];if(!tb)return null;
        return(<div key={g} style={{background:C.cd,borderRadius:12,padding:"10px 12px",border:`1px solid ${C.bd}`}}>
          <span style={{fontFamily:"'Oswald',sans-serif",fontWeight:800,fontSize:16,color:C.ac,letterSpacing:2}}>{L.group} {g}</span>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,marginTop:6}}>
            <thead><tr style={{color:C.t3,fontSize:10}}>
              <th style={{textAlign:rtl?"right":"left"}}></th><th style={{width:32}}>{L.pts}</th><th style={{width:32}}>{L.gd}</th><th style={{width:32}}>{L.gf}</th>
            </tr></thead>
            <tbody>{tb.map((t,i)=>{const q=i<2,mr=t.c==="MAR";
              return(<tr key={t.c} style={{color:mr?C.ac:q?C.tx:C.t2,fontWeight:q||mr?700:400,
                background:mr?`${C.ac}08`:q?`${C.gn}06`:"transparent",
                borderLeft:rtl?"none":(q?`3px solid ${C.gn}`:"3px solid transparent"),
                borderRight:rtl?(q?`3px solid ${C.gn}`:"3px solid transparent"):"none"}}>
                <td style={{padding:"5px"}}>{t.f} {N(t)}</td>
                <td style={{textAlign:"center",fontWeight:900,color:q?C.ac:undefined}}>{t.pts}</td>
                <td style={{textAlign:"center"}}>{t.gd>0?"+"+t.gd:t.gd}</td>
                <td style={{textAlign:"center"}}>{t.gf}</td>
              </tr>)})}</tbody>
          </table>
        </div>)})}
    </div>
    {br?.q3&&(<div style={{textAlign:"center",marginTop:10,padding:"6px 14px",background:`${C.a2}11`,borderRadius:10,border:`1px solid ${C.a2}33`}}>
      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:12,letterSpacing:2,color:C.a2}}>{L.best3}: {br.q3.map(t=>`${t.f} ${N(t)}`).join(" · ")}</span>
    </div>)}
  </div>)}

  {/* ── AUTO KNOCKOUT (progressive reveal) ── */}
  {mode==="auto"&&autoAll&&(
  <div ref={koRef} style={{padding:"16px 12px",maxWidth:1440,margin:"0 auto"}}>
    {[[1,L.r32,0,16],[2,L.r16,16,24],[3,L.qf,24,28],[4,L.sf,28,30],[5,L.third,30,31],[6,"🏆 "+L.final,31,32]].map(([step,title,s,e])=>
      autoStep>=step&&(
      <div key={step} className="fu" style={{marginBottom:22}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:String(title).includes("🏆")?24:17,letterSpacing:3,color:String(title).includes("🏆")?C.ac:C.t2,textAlign:"center",marginBottom:10,fontWeight:700}}>{title}</div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8}}>
          {autoAll.slice(s,e).map((m,i)=>{const wn=winner(m.t1,m.t2,m);const big=String(title).includes("🏆");const tg=m.et?(m.p1!=null?L.pen:L.et):"";
            return(<div key={i} style={{background:C.cd,borderRadius:big?16:10,padding:big?"12px 18px":"7px 11px",border:big?`2px solid ${C.a2}`:`1px solid ${C.bd}`,minWidth:big?260:195,boxShadow:big?`0 4px 24px ${C.a2}22`:"none"}}>
              <div style={{fontSize:10,color:C.t3,textAlign:"center",fontFamily:"'Oswald',sans-serif"}}>M{m.id}{tg?" "+tg:""}</div>
              {[{t:m.t1,g:m.g1,p:m.p1,w:wn===m.t1},{t:m.t2,g:m.g2,p:m.p2,w:wn===m.t2}].map(({t,g,p,w:isW},j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:big?"6px 2px":"3px 2px",fontSize:big?17:14,
                  color:isW?C.tx:C.t3,fontWeight:isW?800:400,borderBottom:j===0?`1px solid ${C.bd}`:"none"}}>
                  <span style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:big?22:16}}>{t.f}</span>{big?N(t):t.c}</span>
                  <span style={{fontWeight:900,fontFamily:"'Oswald',sans-serif",fontSize:big?22:16}}>{g}{p!=null?<span style={{fontSize:10,opacity:.5}}>({p})</span>:""}</span>
                </div>))}
            </div>)})}
        </div>
      </div>))}
  </div>)}

  {/* ── MANUAL/QUICK KNOCKOUT ── */}
  {(mode==="manual"||mode==="quick")&&gDone&&koRnd&&!champ&&(
  <div ref={koRef} style={{padding:"16px 12px",maxWidth:1440,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:14,padding:"12px 18px",background:`${C.gn}08`,borderRadius:16,border:`1px solid ${C.gn}22`}}>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,letterSpacing:3}}>🎮 {roundNames[koRnd]}</div>
      <div style={{fontSize:14,color:C.t2,marginTop:4}}>{L.pickW}</div>
    </div>
    <div style={{textAlign:"center",marginBottom:12}}><Btn onClick={kSimAll} color={C.bl}>{L.simAll}</Btn></div>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10,marginBottom:18}}>
      {koM.map(m=>{const dn=koW[m.id];return(
        <div key={m.id} style={{background:C.cd,borderRadius:14,padding:"10px 14px",border:dn?`1px solid ${C.bd}`:`2px solid ${C.a2}`,minWidth:220,boxShadow:dn?"none":`0 2px 12px ${C.a2}22`,transition:"all .2s"}}>
          <div style={{fontSize:11,color:C.t3,textAlign:"center",fontFamily:"'Oswald',sans-serif",marginBottom:4}}>M{m.id}</div>
          {[m.t1,m.t2].map((t,i)=>(
            <div key={i} onClick={()=>!dn&&kPick(m.id,t)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6,
              padding:"8px 10px",fontSize:15,cursor:dn?"default":"pointer",borderRadius:10,margin:"3px 0",transition:"all .15s",
              color:dn?(dn.c===t.c?C.tx:C.t3):C.tx,fontWeight:dn?.c===t.c?800:500,
              background:dn?(dn.c===t.c?`${C.gn}12`:"transparent"):C.b2,
              borderLeft:dn?.c===t.c?`3px solid ${C.gn}`:"3px solid transparent"}}
              onMouseEnter={e=>{if(!dn)e.currentTarget.style.background=`${C.a2}18`}}
              onMouseLeave={e=>{if(!dn)e.currentTarget.style.background=dn?"transparent":C.b2}}>
              <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:20}}>{t.f}</span>{N(t)}</span>
              {!dn&&<span style={{fontSize:12,color:C.a2,fontWeight:700}}>▶</span>}
              {dn?.c===t.c&&<span style={{color:C.gn,fontWeight:900,fontSize:16}}>✓</span>}
            </div>))}
          {!dn&&<button onClick={()=>kSim(m)} style={{width:"100%",marginTop:5,padding:"6px",fontSize:12,fontWeight:700,borderRadius:8,border:`1px solid ${C.bl}`,background:`${C.bl}11`,color:C.bl,cursor:"pointer"}}>{L.simOne}</button>}
        </div>)})}
    </div>
    {canAdv&&(<div className="pop" style={{textAlign:"center",marginBottom:18}}>
      <BigBtn onClick={adv} color={koRnd==="final"?C.ac:C.gn}>{koRnd==="final"?L.seeC:L.next}</BigBtn>
    </div>)}
    {/* History of past rounds */}
    {["r32","r16","qf","sf"].map(r=>koH[r].length>0&&koRnd!==r&&(
      <details key={r} style={{marginBottom:8}}>
        <summary style={{cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:2,color:C.t3,padding:"4px 0"}}>{roundNames[r]} ({L.done})</summary>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:5}}>
          {koH[r].map(m=><span key={m.id} style={{fontSize:12,background:C.b2,borderRadius:8,padding:"3px 10px",color:C.t2}}>
            M{m.id}: {m.wn?.f} {m.wn?N(m.wn):""} ✓
          </span>)}
        </div>
      </details>))}
  </div>)}

  {/* ── FOOTER ── */}
  <div style={{textAlign:"center",padding:"14px 12px 32px",color:C.t3,fontSize:10}}>
    FIFA World Cup 2026 Simulator — Official Bracket M73→M104 — 48 {L.teams}
  </div>
  </div>);
}
