import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   FIFA WORLD CUP 2026 SIMULATOR — Production v7
   - 3 modes: Auto / Manual / Quick
   - 6 languages with translated team names
   - Official FIFA bracket M73→M104
   - Light theme, large text, mobile responsive
   - Affiliation CTA
   ═══════════════════════════════════════════════════════════ */

// ── TEAM NAMES (8 languages) ──
const TN={
MEX:{fr:"Mexique",en:"Mexico",ar:"المكسيك",pt:"México",es:"México",hi:"मैक्सिको",it:"Messico",de:"Mexiko",zh:"墨西哥"},
KOR:{fr:"Corée du Sud",en:"South Korea",ar:"كوريا الجنوبية",pt:"Coreia do Sul",es:"Corea del Sur",hi:"दक्षिण कोरिया",it:"Corea del Sud",de:"Südkorea",zh:"韩国"},
RSA:{fr:"Afrique du Sud",en:"South Africa",ar:"جنوب أفريقيا",pt:"África do Sul",es:"Sudáfrica",hi:"दक्षिण अफ़्रीका",it:"Sudafrica",de:"Südafrika",zh:"南非"},
CZE:{fr:"Tchéquie",en:"Czechia",ar:"التشيك",pt:"Tchéquia",es:"Chequia",hi:"चेकिया",it:"Cechia",de:"Tschechien",zh:"捷克"},
CAN:{fr:"Canada",en:"Canada",ar:"كندا",pt:"Canadá",es:"Canadá",hi:"कनाडा",it:"Canada",de:"Kanada",zh:"加拿大"},
SUI:{fr:"Suisse",en:"Switzerland",ar:"سويسرا",pt:"Suíça",es:"Suiza",hi:"स्विट्ज़रलैंड",it:"Svizzera",de:"Schweiz",zh:"瑞士"},
QAT:{fr:"Qatar",en:"Qatar",ar:"قطر",pt:"Catar",es:"Catar",hi:"क़तर",it:"Qatar",de:"Katar",zh:"卡塔尔"},
BIH:{fr:"Bosnie",en:"Bosnia & Herzegovina",ar:"البوسنة",pt:"Bósnia",es:"Bosnia",hi:"बोस्निया",it:"Bosnia",de:"Bosnien",zh:"波黑"},
BRA:{fr:"Brésil",en:"Brazil",ar:"البرازيل",pt:"Brasil",es:"Brasil",hi:"ब्राज़ील",it:"Brasile",de:"Brasilien",zh:"巴西"},
MAR:{fr:"Maroc",en:"Morocco",ar:"المغرب",pt:"Marrocos",es:"Marruecos",hi:"मोरक्को",it:"Marocco",de:"Marokko",zh:"摩洛哥"},
SCO:{fr:"Écosse",en:"Scotland",ar:"اسكتلندا",pt:"Escócia",es:"Escocia",hi:"स्कॉटलैंड",it:"Scozia",de:"Schottland",zh:"苏格兰"},
HAI:{fr:"Haïti",en:"Haiti",ar:"هايتي",pt:"Haiti",es:"Haití",hi:"हैती",it:"Haiti",de:"Haiti",zh:"海地"},
USA:{fr:"États-Unis",en:"USA",ar:"أمريكا",pt:"EUA",es:"EE.UU.",hi:"अमेरिका",it:"USA",de:"USA",zh:"美国"},
AUS:{fr:"Australie",en:"Australia",ar:"أستراليا",pt:"Austrália",es:"Australia",hi:"ऑस्ट्रेलिया",it:"Australia",de:"Australien",zh:"澳大利亚"},
PAR:{fr:"Paraguay",en:"Paraguay",ar:"باراغواي",pt:"Paraguai",es:"Paraguay",hi:"पैराग्वे",it:"Paraguay",de:"Paraguay",zh:"巴拉圭"},
TUR:{fr:"Turquie",en:"Türkiye",ar:"تركيا",pt:"Turquia",es:"Turquía",hi:"तुर्की",it:"Turchia",de:"Türkei",zh:"土耳其"},
GER:{fr:"Allemagne",en:"Germany",ar:"ألمانيا",pt:"Alemanha",es:"Alemania",hi:"जर्मनी",it:"Germania",de:"Deutschland",zh:"德国"},
CIV:{fr:"Côte d'Ivoire",en:"Ivory Coast",ar:"ساحل العاج",pt:"Costa do Marfim",es:"Costa de Marfil",hi:"आइवरी कोस्ट",it:"Costa d'Avorio",de:"Elfenbeinküste",zh:"科特迪瓦"},
ECU:{fr:"Équateur",en:"Ecuador",ar:"الإكوادور",pt:"Equador",es:"Ecuador",hi:"इक्वाडोर",it:"Ecuador",de:"Ecuador",zh:"厄瓜多尔"},
CUR:{fr:"Curaçao",en:"Curaçao",ar:"كوراساو",pt:"Curaçao",es:"Curazao",hi:"कुराकाओ",it:"Curaçao",de:"Curaçao",zh:"库拉索"},
NED:{fr:"Pays-Bas",en:"Netherlands",ar:"هولندا",pt:"Holanda",es:"Países Bajos",hi:"नीदरलैंड",it:"Paesi Bassi",de:"Niederlande",zh:"荷兰"},
TUN:{fr:"Tunisie",en:"Tunisia",ar:"تونس",pt:"Tunísia",es:"Túnez",hi:"ट्यूनीशिया",it:"Tunisia",de:"Tunesien",zh:"突尼斯"},
JPN:{fr:"Japon",en:"Japan",ar:"اليابان",pt:"Japão",es:"Japón",hi:"जापान",it:"Giappone",de:"Japan",zh:"日本"},
SWE:{fr:"Suède",en:"Sweden",ar:"السويد",pt:"Suécia",es:"Suecia",hi:"स्वीडन",it:"Svezia",de:"Schweden",zh:"瑞典"},
BEL:{fr:"Belgique",en:"Belgium",ar:"بلجيكا",pt:"Bélgica",es:"Bélgica",hi:"बेल्जियम",it:"Belgio",de:"Belgien",zh:"比利时"},
IRN:{fr:"Iran",en:"Iran",ar:"إيران",pt:"Irã",es:"Irán",hi:"ईरान",it:"Iran",de:"Iran",zh:"伊朗"},
EGY:{fr:"Égypte",en:"Egypt",ar:"مصر",pt:"Egito",es:"Egipto",hi:"मिस्र",it:"Egitto",de:"Ägypten",zh:"埃及"},
NZL:{fr:"Nlle-Zélande",en:"New Zealand",ar:"نيوزيلندا",pt:"Nova Zelândia",es:"Nueva Zelanda",hi:"न्यूज़ीलैंड",it:"Nuova Zelanda",de:"Neuseeland",zh:"新西兰"},
ESP:{fr:"Espagne",en:"Spain",ar:"إسبانيا",pt:"Espanha",es:"España",hi:"स्पेन",it:"Spagna",de:"Spanien",zh:"西班牙"},
URU:{fr:"Uruguay",en:"Uruguay",ar:"أوروغواي",pt:"Uruguai",es:"Uruguay",hi:"उरुग्वे",it:"Uruguay",de:"Uruguay",zh:"乌拉圭"},
KSA:{fr:"Arabie Saoudite",en:"Saudi Arabia",ar:"السعودية",pt:"Arábia Saudita",es:"Arabia Saudí",hi:"सऊदी अरब",it:"Arabia Saudita",de:"Saudi-Arabien",zh:"沙特阿拉伯"},
CPV:{fr:"Cap-Vert",en:"Cape Verde",ar:"الرأس الأخضر",pt:"Cabo Verde",es:"Cabo Verde",hi:"केप वर्डे",it:"Capo Verde",de:"Kap Verde",zh:"佛得角"},
FRA:{fr:"France",en:"France",ar:"فرنسا",pt:"França",es:"Francia",hi:"फ़्रांस",it:"Francia",de:"Frankreich",zh:"法国"},
SEN:{fr:"Sénégal",en:"Senegal",ar:"السنغال",pt:"Senegal",es:"Senegal",hi:"सेनेगल",it:"Senegal",de:"Senegal",zh:"塞内加尔"},
NOR:{fr:"Norvège",en:"Norway",ar:"النرويج",pt:"Noruega",es:"Noruega",hi:"नॉर्वे",it:"Norvegia",de:"Norwegen",zh:"挪威"},
IRQ:{fr:"Irak",en:"Iraq",ar:"العراق",pt:"Iraque",es:"Irak",hi:"इराक",it:"Iraq",de:"Irak",zh:"伊拉克"},
ARG:{fr:"Argentine",en:"Argentina",ar:"الأرجنتين",pt:"Argentina",es:"Argentina",hi:"अर्जेंटीना",it:"Argentina",de:"Argentinien",zh:"阿根廷"},
AUT:{fr:"Autriche",en:"Austria",ar:"النمسا",pt:"Áustria",es:"Austria",hi:"ऑस्ट्रिया",it:"Austria",de:"Österreich",zh:"奥地利"},
JOR:{fr:"Jordanie",en:"Jordan",ar:"الأردن",pt:"Jordânia",es:"Jordania",hi:"जॉर्डन",it:"Giordania",de:"Jordanien",zh:"约旦"},
ALG:{fr:"Algérie",en:"Algeria",ar:"الجزائر",pt:"Argélia",es:"Argelia",hi:"अल्जीरिया",it:"Algeria",de:"Algerien",zh:"阿尔及利亚"},
POR:{fr:"Portugal",en:"Portugal",ar:"البرتغال",pt:"Portugal",es:"Portugal",hi:"पुर्तगाल",it:"Portogallo",de:"Portugal",zh:"葡萄牙"},
COL:{fr:"Colombie",en:"Colombia",ar:"كولومبيا",pt:"Colômbia",es:"Colombia",hi:"कोलंबिया",it:"Colombia",de:"Kolumbien",zh:"哥伦比亚"},
UZB:{fr:"Ouzbékistan",en:"Uzbekistan",ar:"أوزبكستان",pt:"Uzbequistão",es:"Uzbekistán",hi:"उज़्बेकिस्तान",it:"Uzbekistan",de:"Usbekistan",zh:"乌兹别克斯坦"},
COD:{fr:"RD Congo",en:"DR Congo",ar:"الكونغو",pt:"RD Congo",es:"RD Congo",hi:"कांगो",it:"RD Congo",de:"DR Kongo",zh:"刚果民主共和国"},
ENG:{fr:"Angleterre",en:"England",ar:"إنجلترا",pt:"Inglaterra",es:"Inglaterra",hi:"इंग्लैंड",it:"Inghilterra",de:"England",zh:"英格兰"},
CRO:{fr:"Croatie",en:"Croatia",ar:"كرواتيا",pt:"Croácia",es:"Croacia",hi:"क्रोएशिया",it:"Croazia",de:"Kroatien",zh:"克罗地亚"},
GHA:{fr:"Ghana",en:"Ghana",ar:"غانا",pt:"Gana",es:"Ghana",hi:"घाना",it:"Ghana",de:"Ghana",zh:"加纳"},
PAN:{fr:"Panama",en:"Panama",ar:"بنما",pt:"Panamá",es:"Panamá",hi:"पनामा",it:"Panama",de:"Panama",zh:"巴拿马"},
};

// ── TRANSLATIONS ──
const LANGS={
fr:{flag:"🇫🇷",label:"Français",title:"COUPE DU MONDE 2026",sub:"USA • MEXIQUE • CANADA",teams:"ÉQUIPES",chooseMode:"CHOISIS TON MODE",auto:"⚡ SIMULATION AUTO",autoD:"Tout est simulé automatiquement",manual:"🎮 SIMULATION MANUELLE",manualD:"Choisis le score de chaque match",quick:"🏆 MANUELLE RAPIDE",quickD:"Classe les équipes par groupe puis choisis qui se qualifie",groups:"PHASE DE GROUPES",best3:"8 MEILLEURS 3es",r32:"32es DE FINALE",r16:"16es DE FINALE",qf:"QUARTS DE FINALE",sf:"DEMI-FINALES",final:"FINALE",third:"3e PLACE",champion:"CHAMPION DU MONDE 2026",chMode:"← MODE",next:"SUIVANT ➡️",seeC:"🏆 CHAMPION",pickW:"Choisis le vainqueur ou simule",simOne:"⚡ Simuler",simAll:"⚡ TOUT SIMULER",goKO:"PHASE ÉLIMINATOIRE ➡️",done:"terminé",group:"GROUPE",mp:"J",w:"V",d:"N",l:"D",gf:"BP",ga:"BC",gd:"DB",pts:"PTS",chLang:"🌐",et:"a.p.",pen:"tab",ok:"✓",resim:"🔄 Ressimuler",rankHint:"Utilise ▲ ▼ pour classer de 1er à 4e",bet:"Parie sur ce résultat →",share:"📤 Partager mon résultat",pick3:"Choisis 8 des 12 troisièmes qui se qualifient",pick3count:"3es sélectionnés",of:"sur"},
en:{flag:"🇬🇧",label:"English",title:"WORLD CUP 2026",sub:"USA • MEXICO • CANADA",teams:"TEAMS",chooseMode:"CHOOSE YOUR MODE",auto:"⚡ AUTO SIMULATION",autoD:"Everything simulated automatically",manual:"🎮 MANUAL SIMULATION",manualD:"Pick the score of every match",quick:"🏆 QUICK MANUAL",quickD:"Rank teams per group then pick who advances",groups:"GROUP STAGE",best3:"8 BEST 3RD",r32:"ROUND OF 32",r16:"ROUND OF 16",qf:"QUARTER-FINALS",sf:"SEMI-FINALS",final:"FINAL",third:"3RD PLACE",champion:"2026 WORLD CHAMPION",chMode:"← MODE",next:"NEXT ➡️",seeC:"🏆 CHAMPION",pickW:"Pick the winner or simulate",simOne:"⚡ Simulate",simAll:"⚡ SIMULATE ALL",goKO:"KNOCKOUT STAGE ➡️",done:"done",group:"GROUP",mp:"MP",w:"W",d:"D",l:"L",gf:"GF",ga:"GA",gd:"GD",pts:"PTS",chLang:"🌐",et:"a.e.t.",pen:"pen",ok:"✓",resim:"🔄 Re-simulate",rankHint:"Use ▲ ▼ to rank 1st → 4th",bet:"Bet on this result →",share:"📤 Share my result",pick3:"Pick 8 of the 12 third-place teams that qualify",pick3count:"3rds selected",of:"of"},
ar:{flag:"🇸🇦",label:"العربية",title:"كأس العالم 2026",sub:"أمريكا • المكسيك • كندا",teams:"منتخب",chooseMode:"اختر الوضع",auto:"⚡ محاكاة تلقائية",autoD:"كل النتائج تلقائية",manual:"🎮 محاكاة يدوية",manualD:"أنت تختار نتيجة كل مباراة",quick:"🏆 يدوية سريعة",quickD:"رتّب المنتخبات ثم اختر من يتأهل",groups:"دور المجموعات",best3:"أفضل 8 ثوالث",r32:"دور الـ32",r16:"دور الـ16",qf:"ربع النهائي",sf:"نصف النهائي",final:"النهائي",third:"المركز الثالث",champion:"بطل العالم 2026",chMode:"← الوضع",next:"التالي ➡️",seeC:"🏆 البطل",pickW:"اختر الفائز أو حاكي",simOne:"⚡ حاكي",simAll:"⚡ حاكي الكل",goKO:"مرحلة الإقصاء ➡️",done:"انتهى",group:"مجموعة",mp:"م",w:"ف",d:"ت",l:"خ",gf:"له",ga:"عليه",gd:"فارق",pts:"نقاط",chLang:"🌐",et:"و.إ.",pen:"ركلات",ok:"✓",resim:"🔄 إعادة",rankHint:"استعمل ▲ ▼ للترتيب من 1 إلى 4",bet:"راهن على هذه النتيجة →",share:"📤 شارك نتيجتك",pick3:"اختر 8 من 12 ثالث يتأهلون",pick3count:"ثوالث مختارين",of:"من"},
pt:{flag:"🇧🇷",label:"Português",title:"COPA DO MUNDO 2026",sub:"EUA • MÉXICO • CANADÁ",teams:"SELEÇÕES",chooseMode:"ESCOLHA SEU MODO",auto:"⚡ SIMULAÇÃO AUTO",autoD:"Tudo simulado automaticamente",manual:"🎮 SIMULAÇÃO MANUAL",manualD:"Escolha o placar de cada jogo",quick:"🏆 MANUAL RÁPIDO",quickD:"Classifique por grupo e escolha quem avança",groups:"FASE DE GRUPOS",best3:"8 MELHORES 3ºS",r32:"32 AVOS",r16:"OITAVAS",qf:"QUARTAS",sf:"SEMIFINAIS",final:"FINAL",third:"3º LUGAR",champion:"CAMPEÃO MUNDIAL 2026",chMode:"← MODO",next:"PRÓXIMO ➡️",seeC:"🏆 CAMPEÃO",pickW:"Escolha o vencedor ou simule",simOne:"⚡ Simular",simAll:"⚡ SIMULAR TUDO",goKO:"MATA-MATA ➡️",done:"feito",group:"GRUPO",mp:"J",w:"V",d:"E",l:"D",gf:"GP",ga:"GC",gd:"SG",pts:"PTS",chLang:"🌐",et:"prorr.",pen:"pên",ok:"✓",resim:"🔄 Resimular",rankHint:"Use ▲ ▼ para classificar 1º → 4º",bet:"Aposte neste resultado →",share:"📤 Compartilhar resultado",pick3:"Escolha 8 dos 12 terceiros que se classificam",pick3count:"3ºs selecionados",of:"de"},
es:{flag:"🇪🇸",label:"Español",title:"COPA DEL MUNDO 2026",sub:"EE.UU. • MÉXICO • CANADÁ",teams:"EQUIPOS",chooseMode:"ELIGE TU MODO",auto:"⚡ SIMULACIÓN AUTO",autoD:"Todo simulado automáticamente",manual:"🎮 SIMULACIÓN MANUAL",manualD:"Elige el marcador de cada partido",quick:"🏆 MANUAL RÁPIDO",quickD:"Clasifica por grupo y elige quién avanza",groups:"FASE DE GRUPOS",best3:"8 MEJORES 3OS",r32:"DIECISEISAVOS",r16:"OCTAVOS",qf:"CUARTOS",sf:"SEMIFINALES",final:"FINAL",third:"3ER LUGAR",champion:"CAMPEÓN DEL MUNDO 2026",chMode:"← MODO",next:"SIGUIENTE ➡️",seeC:"🏆 CAMPEÓN",pickW:"Elige al ganador o simula",simOne:"⚡ Simular",simAll:"⚡ SIMULAR TODO",goKO:"ELIMINATORIAS ➡️",done:"hecho",group:"GRUPO",mp:"PJ",w:"G",d:"E",l:"P",gf:"GF",ga:"GC",gd:"DG",pts:"PTS",chLang:"🌐",et:"prór.",pen:"pen",ok:"✓",resim:"🔄 Resimular",rankHint:"Usa ▲ ▼ para clasificar 1º → 4º",bet:"Apuesta en este resultado →",share:"📤 Compartir resultado",pick3:"Elige 8 de los 12 terceros que clasifican",pick3count:"3os seleccionados",of:"de"},
hi:{flag:"🇮🇳",label:"हिन्दी",title:"विश्व कप 2026",sub:"अमेरिका • मैक्सिको • कनाडा",teams:"टीमें",chooseMode:"मोड चुनें",auto:"⚡ ऑटो सिमुलेशन",autoD:"सब कुछ स्वचालित",manual:"🎮 मैनुअल सिमुलेशन",manualD:"हर मैच का स्कोर चुनें",quick:"🏆 क्विक मैनुअल",quickD:"ग्रुप में रैंक करें फिर चुनें कौन आगे बढ़े",groups:"ग्रुप चरण",best3:"8 सर्वश्रेष्ठ तीसरे",r32:"32 का दौर",r16:"16 का दौर",qf:"क्वार्टर फाइनल",sf:"सेमी फाइनल",final:"फाइनल",third:"तीसरा स्थान",champion:"2026 विश्व चैंपियन",chMode:"← मोड",next:"अगला ➡️",seeC:"🏆 चैंपियन",pickW:"विजेता चुनें या सिमुलेट करें",simOne:"⚡ सिमुलेट",simAll:"⚡ सब सिमुलेट",goKO:"नॉकआउट ➡️",done:"पूर्ण",group:"ग्रुप",mp:"मैच",w:"जीत",d:"ड्रॉ",l:"हार",gf:"गो+",ga:"गो-",gd:"गो.अ.",pts:"अंक",chLang:"🌐",et:"अ.स.",pen:"पेन",ok:"✓",resim:"🔄 पुनः",rankHint:"▲ ▼ से 1→4 रैंक करें",bet:"इस पर दांव लगाएं →",share:"📤 परिणाम शेयर करें",pick3:"12 में से 8 तीसरे स्थान की टीमें चुनें जो क्वालिफाई करें",pick3count:"तीसरे चुने गए",of:"में से"},
it:{flag:"🇮🇹",label:"Italiano",title:"COPPA DEL MONDO 2026",sub:"USA • MESSICO • CANADA",teams:"SQUADRE",chooseMode:"SCEGLI LA MODALITÀ",auto:"⚡ SIMULAZIONE AUTO",autoD:"Tutto simulato automaticamente",manual:"🎮 SIMULAZIONE MANUALE",manualD:"Scegli il punteggio di ogni partita",quick:"🏆 MANUALE RAPIDO",quickD:"Classifica per girone e scegli chi avanza",groups:"FASE A GIRONI",best3:"8 MIGLIORI 3I",r32:"SEDICESIMI",r16:"OTTAVI DI FINALE",qf:"QUARTI DI FINALE",sf:"SEMIFINALI",final:"FINALE",third:"3° POSTO",champion:"CAMPIONE DEL MONDO 2026",chMode:"← MODALITÀ",next:"AVANTI ➡️",seeC:"🏆 CAMPIONE",pickW:"Scegli il vincitore o simula",simOne:"⚡ Simula",simAll:"⚡ SIMULA TUTTO",goKO:"FASE A ELIMINAZIONE ➡️",done:"fatto",group:"GIRONE",mp:"PG",w:"V",d:"P",l:"S",gf:"GF",ga:"GS",gd:"DR",pts:"PNT",chLang:"🌐",et:"d.t.s.",pen:"rig",ok:"✓",resim:"🔄 Risimula",rankHint:"Usa ▲ ▼ per classificare 1° → 4°",bet:"Scommetti su questo risultato →",share:"📤 Condividi il risultato",pick3:"Scegli 8 delle 12 terze che si qualificano",pick3count:"3i selezionati",of:"di"},
de:{flag:"🇩🇪",label:"Deutsch",title:"WELTMEISTERSCHAFT 2026",sub:"USA • MEXIKO • KANADA",teams:"TEAMS",chooseMode:"MODUS WÄHLEN",auto:"⚡ AUTO-SIMULATION",autoD:"Alles wird automatisch simuliert",manual:"🎮 MANUELLE SIMULATION",manualD:"Wähle das Ergebnis jedes Spiels",quick:"🏆 SCHNELL MANUELL",quickD:"Teams pro Gruppe einordnen, dann wählen wer weiterkommt",groups:"GRUPPENPHASE",best3:"8 BESTE DRITTE",r32:"SECHZEHNTELFINALE",r16:"ACHTELFINALE",qf:"VIERTELFINALE",sf:"HALBFINALE",final:"FINALE",third:"SPIEL UM PLATZ 3",champion:"WELTMEISTER 2026",chMode:"← MODUS",next:"WEITER ➡️",seeC:"🏆 CHAMPION",pickW:"Wähle den Gewinner oder simuliere",simOne:"⚡ Simulieren",simAll:"⚡ ALLES SIMULIEREN",goKO:"K.O.-PHASE ➡️",done:"fertig",group:"GRUPPE",mp:"Sp",w:"S",d:"U",l:"N",gf:"T+",ga:"T-",gd:"TD",pts:"Pkt",chLang:"🌐",et:"n.V.",pen:"Elf",ok:"✓",resim:"🔄 Neu simulieren",rankHint:"Nutze ▲ ▼ um 1. → 4. zu ordnen",bet:"Auf dieses Ergebnis wetten →",share:"📤 Ergebnis teilen",pick3:"Wähle 8 der 12 Gruppendritten die weiterkommen",pick3count:"Dritte gewählt",of:"von"},
zh:{flag:"🇨🇳",label:"中文",title:"2026年世界杯",sub:"美国 • 墨西哥 • 加拿大",teams:"球队",chooseMode:"选择模式",auto:"⚡ 自动模拟",autoD:"全部自动模拟",manual:"🎮 手动模拟",manualD:"选择每场比赛的比分",quick:"🏆 快速手动",quickD:"按小组排名然后选择晋级队伍",groups:"小组赛",best3:"8个最佳第三名",r32:"32强",r16:"16强",qf:"四分之一决赛",sf:"半决赛",final:"决赛",third:"季军赛",champion:"2026年世界冠军",chMode:"← 模式",next:"下一轮 ➡️",seeC:"🏆 冠军",pickW:"选择获胜者或模拟",simOne:"⚡ 模拟",simAll:"⚡ 全部模拟",goKO:"淘汰赛 ➡️",done:"完成",group:"小组",mp:"场",w:"胜",d:"平",l:"负",gf:"进球",ga:"失球",gd:"净胜球",pts:"积分",chLang:"🌐",et:"加时",pen:"点球",ok:"✓",resim:"🔄 重新模拟",rankHint:"用 ▲ ▼ 排名第1到第4",bet:"投注此结果 →",share:"📤 分享结果",pick3:"选择12个第三名中晋级的8个",pick3count:"已选第三名",of:"共"},
};

// ── TEAMS ── (March 2026 FIFA Rankings + historical WC data + current form)
// rt: FIFA points (scaled 0-100), rk: FIFA rank, wc: WC titles, wcb: best WC result (1=winner,2=final,3=semi,4=QF,5=R16,6=group,0=never),
// fm: current form 0-10, df: defensive solidity 0-10, ho: host bonus, tier: 1=elite,2=strong,3=mid,4=weak,5=debutant
const TM={
// Group A
MEX:{c:"MEX",f:"🇲🇽",g:"A",rt:84,rk:15,wc:0,wcb:4,fm:6,df:6,ho:1,tier:2},
KOR:{c:"KOR",f:"🇰🇷",g:"A",rt:78,rk:22,wc:0,wcb:3,fm:6,df:6,ho:0,tier:3},
RSA:{c:"RSA",f:"🇿🇦",g:"A",rt:62,rk:61,wc:0,wcb:6,fm:4,df:4,ho:0,tier:4},
CZE:{c:"CZE",f:"🇨🇿",g:"A",rt:76,rk:32,wc:0,wcb:4,fm:6,df:6,ho:0,tier:3},
// Group B
CAN:{c:"CAN",f:"🇨🇦",g:"B",rt:74,rk:27,wc:0,wcb:6,fm:5,df:5,ho:1,tier:3},
SUI:{c:"SUI",f:"🇨🇭",g:"B",rt:81,rk:18,wc:0,wcb:4,fm:6,df:7,ho:0,tier:2},
QAT:{c:"QAT",f:"🇶🇦",g:"B",rt:60,rk:51,wc:0,wcb:6,fm:3,df:4,ho:0,tier:4},
BIH:{c:"BIH",f:"🇧🇦",g:"B",rt:68,rk:46,wc:0,wcb:0,fm:6,df:5,ho:0,tier:3},
// Group C
BRA:{c:"BRA",f:"🇧🇷",g:"C",rt:88,rk:6,wc:5,wcb:1,fm:6,df:5,ho:0,tier:1},
MAR:{c:"MAR",f:"🇲🇦",g:"C",rt:89,rk:5,wc:0,wcb:3,fm:8,df:8,ho:0,tier:1},
SCO:{c:"SCO",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",g:"C",rt:68,rk:35,wc:0,wcb:6,fm:5,df:5,ho:0,tier:3},
HAI:{c:"HAI",f:"🇭🇹",g:"C",rt:48,rk:84,wc:0,wcb:6,fm:3,df:3,ho:0,tier:5},
// Group D
USA:{c:"USA",f:"🇺🇸",g:"D",rt:84,rk:14,wc:0,wcb:3,fm:7,df:6,ho:2,tier:2},
AUS:{c:"AUS",f:"🇦🇺",g:"D",rt:73,rk:26,wc:0,wcb:5,fm:5,df:5,ho:0,tier:3},
PAR:{c:"PAR",f:"🇵🇾",g:"D",rt:68,rk:37,wc:0,wcb:5,fm:4,df:5,ho:0,tier:3},
TUR:{c:"TUR",f:"🇹🇷",g:"D",rt:79,rk:25,wc:0,wcb:3,fm:6,df:5,ho:0,tier:2},
// Group E
GER:{c:"GER",f:"🇩🇪",g:"E",rt:86,rk:10,wc:4,wcb:1,fm:7,df:6,ho:0,tier:1},
CIV:{c:"CIV",f:"🇨🇮",g:"E",rt:70,rk:40,wc:0,wcb:6,fm:6,df:4,ho:0,tier:3},
ECU:{c:"ECU",f:"🇪🇨",g:"E",rt:75,rk:23,wc:0,wcb:5,fm:5,df:5,ho:0,tier:3},
CUR:{c:"CUR",f:"🇨🇼",g:"E",rt:42,rk:82,wc:0,wcb:0,fm:2,df:2,ho:0,tier:5},
// Group F
NED:{c:"NED",f:"🇳🇱",g:"F",rt:88,rk:8,wc:0,wcb:2,fm:7,df:7,ho:0,tier:1},
TUN:{c:"TUN",f:"🇹🇳",g:"F",rt:67,rk:38,wc:0,wcb:6,fm:5,df:6,ho:0,tier:3},
JPN:{c:"JPN",f:"🇯🇵",g:"F",rt:82,rk:19,wc:0,wcb:5,fm:8,df:6,ho:0,tier:2},
SWE:{c:"SWE",f:"🇸🇪",g:"F",rt:78,rk:25,wc:0,wcb:3,fm:7,df:6,ho:0,tier:2},
// Group G
BEL:{c:"BEL",f:"🇧🇪",g:"G",rt:87,rk:9,wc:0,wcb:3,fm:5,df:6,ho:0,tier:1},
IRN:{c:"IRN",f:"🇮🇷",g:"G",rt:77,rk:20,wc:0,wcb:6,fm:5,df:6,ho:0,tier:3},
EGY:{c:"EGY",f:"🇪🇬",g:"G",rt:68,rk:33,wc:0,wcb:6,fm:5,df:5,ho:0,tier:3},
NZL:{c:"NZL",f:"🇳🇿",g:"G",rt:46,rk:86,wc:0,wcb:6,fm:3,df:3,ho:0,tier:5},
// Group H
ESP:{c:"ESP",f:"🇪🇸",g:"H",rt:94,rk:1,wc:1,wcb:1,fm:9,df:8,ho:0,tier:1},
URU:{c:"URU",f:"🇺🇾",g:"H",rt:84,rk:16,wc:2,wcb:1,fm:6,df:7,ho:0,tier:1},
KSA:{c:"KSA",f:"🇸🇦",g:"H",rt:60,rk:60,wc:0,wcb:5,fm:4,df:4,ho:0,tier:4},
CPV:{c:"CPV",f:"🇨🇻",g:"H",rt:44,rk:68,wc:0,wcb:0,fm:3,df:3,ho:0,tier:5},
// Group I
FRA:{c:"FRA",f:"🇫🇷",g:"I",rt:94,rk:3,wc:2,wcb:1,fm:7,df:7,ho:0,tier:1},
SEN:{c:"SEN",f:"🇸🇳",g:"I",rt:80,rk:17,wc:0,wcb:4,fm:7,df:5,ho:0,tier:2},
NOR:{c:"NOR",f:"🇳🇴",g:"I",rt:76,rk:29,wc:0,wcb:6,fm:7,df:5,ho:0,tier:3},
IRQ:{c:"IRQ",f:"🇮🇶",g:"I",rt:56,rk:66,wc:0,wcb:6,fm:4,df:4,ho:0,tier:4},
// Group J
ARG:{c:"ARG",f:"🇦🇷",g:"J",rt:94,rk:2,wc:3,wcb:1,fm:8,df:7,ho:0,tier:1},
AUT:{c:"AUT",f:"🇦🇹",g:"J",rt:77,rk:24,wc:0,wcb:3,fm:6,df:6,ho:0,tier:3},
JOR:{c:"JOR",f:"🇯🇴",g:"J",rt:54,rk:66,wc:0,wcb:0,fm:5,df:5,ho:0,tier:4},
ALG:{c:"ALG",f:"🇩🇿",g:"J",rt:67,rk:34,wc:0,wcb:5,fm:5,df:5,ho:0,tier:3},
// Group K
POR:{c:"POR",f:"🇵🇹",g:"K",rt:88,rk:7,wc:0,wcb:3,fm:7,df:7,ho:0,tier:1},
COL:{c:"COL",f:"🇨🇴",g:"K",rt:83,rk:13,wc:0,wcb:4,fm:7,df:6,ho:0,tier:2},
UZB:{c:"UZB",f:"🇺🇿",g:"K",rt:58,rk:48,wc:0,wcb:0,fm:5,df:5,ho:0,tier:4},
COD:{c:"COD",f:"🇨🇩",g:"K",rt:56,rk:49,wc:0,wcb:0,fm:4,df:4,ho:0,tier:4},
// Group L
ENG:{c:"ENG",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:"L",rt:92,rk:4,wc:1,wcb:1,fm:7,df:7,ho:0,tier:1},
CRO:{c:"CRO",f:"🇭🇷",g:"L",rt:86,rk:11,wc:0,wcb:2,fm:6,df:7,ho:0,tier:1},
GHA:{c:"GHA",f:"🇬🇭",g:"L",rt:64,rk:72,wc:0,wcb:4,fm:5,df:4,ho:0,tier:4},
PAN:{c:"PAN",f:"🇵🇦",g:"L",rt:55,rk:30,wc:0,wcb:6,fm:4,df:4,ho:0,tier:4},
};

const AFF_LINK="https://reffpa.com/L?tag=d_5397279m_97c_&site=5397279&ad=97";
const GS=["A","B","C","D","E","F","G","H","I","J","K","L"];
const gT=g=>Object.values(TM).filter(t=>t.g===g);
const nm=(code,lg)=>TN[code]?.[lg]||code;

// ── SIMULATION ENGINE v2 ──
// Realistic simulation based on FIFA rankings, WC history, form, tiers, and defense
const poi=lam=>{let L=Math.exp(-lam),k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};

// Composite strength heavily weighted by FIFA rating + tier + WC pedigree + form
function getStrength(t){
  // Base: FIFA rating (0-100 scale, already calibrated)
  let s = t.rt;
  // Tier bonus: elite teams get consistency boost, debutants get penalty
  const tierBonus = {1:6, 2:3, 3:0, 4:-4, 5:-10};
  s += tierBonus[t.tier] || 0;
  // WC experience: titles give big boost, deep runs give moderate boost
  s += (t.wc || 0) * 2.0; // titles (ARG:3→6, BRA:5→10, FRA:2→4)
  s += Math.max(0, (5 - (t.wcb||6))) * 1.5; // best result bonus (winner=6, final=4.5, semi=3, QF=1.5)
  // Form: current form 0-10
  s += ((t.fm || 5) - 5) * 1.5; // deviation from avg form
  // Defense: solid defenders make the team harder to beat
  s += ((t.df || 5) - 5) * 0.8;
  // Host bonus: significant home advantage in WC
  s += (t.ho || 0) * 4.0; // USA=2→8pts, MEX/CAN=1→4pts
  return s;
}

// Upset probability: lower-tier teams can still surprise, but rarely
function upsetFactor(stronger, weaker){
  const gap = stronger - weaker;
  if(gap > 30) return 0.05;
  if(gap > 20) return 0.10;
  if(gap > 15) return 0.18;
  if(gap > 10) return 0.25;
  if(gap > 5) return 0.35;
  return 0.42;
}

// Dark horse factor: ~5% chance a tier 3-4 team gets a "magic day" boost in KO
// Simulates historic upsets: South Korea 2002, Costa Rica 2014, Morocco 2022
function darkHorseBoost(team, ko){
  if(!ko) return 0;
  if(team.tier <= 2 || team.tier >= 5) return 0; // Only tier 3-4 can be dark horses
  if(Math.random() > 0.05) return 0; // 5% chance (~1/20)
  return 12 + Math.random() * 6; // +12 to +18 strength boost on that day
}

function simM(a,b,ko=false){
  const sA=getStrength(a)+darkHorseBoost(a,ko), sB=getStrength(b)+darkHorseBoost(b,ko);
  const gap=Math.abs(sA-sB);
  const diff=(sA-sB)/80;

  // Defense impact: good defense reduces opponent's xG significantly
  const defFactorB = 1 - ((b.df||5) - 5) * 0.06; // df=8 → -18% opponent xG
  const defFactorA = 1 - ((a.df||5) - 5) * 0.06;

  // KO matches: tighter, more tactical, lower scoring
  const koFactor = ko ? 0.82 : 1.0;

  // Tier-based xG floor: debutants score much less
  const tierXgMod = t => {
    if(t.tier === 5) return 0.65; // Debutants: heavily reduced attacking output
    if(t.tier === 4) return 0.80; // Weak: below average
    if(t.tier === 1) return 1.10; // Elite: above average
    return 1.0;
  };

  // Base xG: WC average ~1.3 goals per team per match
  let xgA = Math.max(0.15, (1.30 + diff * 2.5) * defFactorB * koFactor * tierXgMod(a));
  let xgB = Math.max(0.15, (1.30 - diff * 2.5) * defFactorA * koFactor * tierXgMod(b));

  // Ensure big quality gaps produce realistic scorelines
  // e.g., Spain vs Cape Verde: Spain xG ~2.5, Cape Verde xG ~0.3
  if(gap > 25) { // Massive gap
    const strong = sA > sB;
    if(strong) { xgA = Math.max(xgA, 1.8); xgB = Math.min(xgB, 0.4); }
    else { xgB = Math.max(xgB, 1.8); xgA = Math.min(xgA, 0.4); }
  }

  let x = poi(xgA), y = poi(xgB);

  // Cap scorelines: max 5 for strong teams, max 2 for debutants/weak in WC
  x = Math.min(x, a.tier <= 2 ? 6 : 4);
  y = Math.min(y, b.tier <= 2 ? 6 : 4);
  // Debutants rarely score more than 1 in WC
  if(a.tier === 5 && x > 1 && Math.random() > 0.3) x = Math.min(x, 1);
  if(b.tier === 5 && y > 1 && Math.random() > 0.3) y = Math.min(y, 1);

  if(ko && x === y){
    // Extra time
    const favA = sA >= sB;
    const etXgA = favA ? 0.40 : 0.25;
    const etXgB = favA ? 0.25 : 0.40;
    x += poi(etXgA); y += poi(etXgB);

    if(x === y){
      // Penalties: experience matters a lot
      const wcExp = ((a.wc||0) - (b.wc||0)) * 0.03 + ((a.wcb||6) < (b.wcb||6) ? 0.05 : -0.05);
      const penChance = Math.min(0.70, Math.max(0.30, (favA ? 0.55 : 0.45) + wcExp));
      const favWins = Math.random() < penChance;
      const penScores = [[5,4],[4,3],[5,3],[6,5],[4,2],[3,2]];
      const ps = penScores[Math.floor(Math.random() * penScores.length)];
      return {g1:x, g2:y, p1:favWins?ps[0]:ps[1], p2:favWins?ps[1]:ps[0], et:true};
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

  // ── BRACKET IMAGE GENERATOR (FIFA-style split bracket) ──
  const generateBracketImage=useCallback(async()=>{
    if(!champ)return;
    // Collect all knockout matches
    let matches=[];
    if(mode==="auto"&&autoAll){ matches=autoAll }
    else if(br){
      // Reconstruct from manual/quick data
      const all=[];
      br.r32.forEach(m=>all.push({id:m.id,t1:m.t1,t2:m.t2,g1:0,g2:0}));
      [[br.r16,"r16"],[br.qf,"qf"],[br.sf,"sf"]].forEach(([arr])=>{
        arr.forEach(([id])=>all.push({id,t1:null,t2:null,g1:0,g2:0}))});
      all.push({id:103,t1:null,t2:null,g1:0,g2:0},{id:104,t1:null,t2:null,g1:0,g2:0});
      matches=all;
    } else return;

    const ML={};
    matches.forEach(m=>{const wn=winner(m.t1,m.t2,m);ML[m.id]={t1:m.t1,t2:m.t2,g1:m.g1??0,g2:m.g2??0,p1:m.p1,p2:m.p2,wn}});

    // Load flag images from Twemoji
    const flagCache={};
    const loadFlag=async(team)=>{
      if(!team||!team.f||flagCache[team.c])return;
      const cp=[...team.f].map(c=>c.codePointAt(0).toString(16)).join("-");
      const url=`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${cp}.svg`;
      try{
        const r=await fetch(url);if(!r.ok)return;
        const svg=await r.text();
        const blob=new Blob([svg],{type:"image/svg+xml"});
        const img=new Image();
        await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=URL.createObjectURL(blob)});
        flagCache[team.c]=img;
      }catch(e){}
    };
    const allTeams=new Set();
    matches.forEach(m=>{if(m.t1)allTeams.add(m.t1);if(m.t2)allTeams.add(m.t2)});
    await Promise.all([...allTeams].map(loadFlag));

    // ── Layout: Split bracket, left half + right half meeting at Final center ──
    // Left side: 8 R32 matches → 4 R16 → 2 QF → 1 SF
    // Right side: 8 R32 matches → 4 R16 → 2 QF → 1 SF
    // Center: Final
    const leftR32=[73,74,75,77,76,78,79,80];
    const rightR32=[83,81,84,82,86,85,88,87];
    const leftR16=[89,90,91,92];const rightR16=[93,94,95,96];
    const leftQF=[97,99];const rightQF=[98,100];
    const leftSF=[101];const rightSF=[102];

    const SCALE=2; // Retina
    const MW=160*SCALE,MH=26*SCALE,MGAP=4*SCALE,RG=30*SCALE;
    const PAD=20*SCALE,TOPP=70*SCALE,BOTP=40*SCALE;
    const matchH=MH*2+MGAP; // height of one match block
    const baseMatches=8; // R32 per side
    const totalMatchH=baseMatches*matchH+(baseMatches-1)*MGAP*3;
    const W=PAD+4*(MW+RG)+MW+RG+4*(MW+RG)+PAD; // 4 left rounds + final + 4 right rounds
    const H=TOPP+totalMatchH+BOTP;

    const canvas=document.createElement("canvas");
    canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext("2d");

    // Background gradient
    const grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"#0b1120");grad.addColorStop(0.5,"#162040");grad.addColorStop(1,"#0b1120");
    ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

    // Subtle grid pattern
    ctx.strokeStyle="rgba(255,255,255,0.02)";ctx.lineWidth=1;
    for(let i=0;i<W;i+=40*SCALE){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke()}
    for(let i=0;i<H;i+=40*SCALE){ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(W,i);ctx.stroke()}

    // Title bar
    const titleH=50*SCALE;
    ctx.fillStyle="rgba(0,0,0,0.4)";ctx.fillRect(0,0,W,titleH);
    ctx.fillStyle="#fbb03b";ctx.font=`800 ${18*SCALE}px Oswald,sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.fillText("FIFA WORLD CUP 2026™",W/2,titleH*0.35);
    ctx.fillStyle="rgba(255,255,255,0.5)";ctx.font=`600 ${8*SCALE}px Oswald,sans-serif`;
    ctx.fillText("USA • MEXICO • CANADA  |  wcupsim.com",W/2,titleH*0.7);

    // Draw flag as circle
    const drawFlag=(x,cy,r,team)=>{
      if(!team)return;
      ctx.save();
      ctx.beginPath();ctx.arc(x+r,cy,r,0,Math.PI*2);ctx.clip();
      if(flagCache[team.c]){
        ctx.drawImage(flagCache[team.c],x,cy-r,r*2,r*2);
      }else{
        ctx.fillStyle="#1e2d4a";ctx.fill();
        ctx.font=`${r*1.3}px sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
        ctx.fillText(team.f||"",x+r,cy);
      }
      ctx.restore();
      // Circle border
      ctx.strokeStyle="rgba(255,255,255,0.3)";ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(x+r,cy,r,0,Math.PI*2);ctx.stroke();
    };

    // Draw a team row
    const drawTeamRow=(x,y,w,team,score,isW,pen,mirror)=>{
      const h=MH;
      // Background
      const rr=4*SCALE;
      ctx.fillStyle=isW?"rgba(0,168,84,0.15)":"rgba(20,30,48,0.8)";
      ctx.beginPath();ctx.roundRect(x,y,w,h,rr);ctx.fill();
      // Left accent for winner
      if(isW){
        ctx.fillStyle="#00a854";
        ctx.beginPath();ctx.roundRect(x,y,3*SCALE,h,[rr,0,0,rr]);ctx.fill();
      }
      // Border
      ctx.strokeStyle=isW?"rgba(0,168,84,0.5)":"rgba(60,80,120,0.4)";ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(x,y,w,h,rr);ctx.stroke();

      if(!team)return;
      const fr=8*SCALE; // flag radius
      const flagX=x+6*SCALE;
      const cy=y+h/2;
      drawFlag(flagX,cy,fr,team);
      // Country code
      ctx.fillStyle=isW?"#ffffff":"rgba(180,195,220,0.9)";
      ctx.font=`${isW?"800":"600"} ${9*SCALE}px Oswald,sans-serif`;
      ctx.textAlign="left";ctx.textBaseline="middle";
      ctx.fillText(team.c||"",flagX+fr*2+5*SCALE,cy);
      // Score box
      const sw=22*SCALE,sh=h-4*SCALE;
      const sx=x+w-sw-3*SCALE,sy=y+2*SCALE;
      ctx.fillStyle=isW?"#00a854":"rgba(40,55,80,0.8)";
      ctx.beginPath();ctx.roundRect(sx,sy,sw,sh,3*SCALE);ctx.fill();
      ctx.fillStyle=isW?"#fff":"rgba(150,170,200,0.8)";
      ctx.font=`800 ${10*SCALE}px Oswald,sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
      const sTxt=pen!=null?`${score}`:`${score}`;
      ctx.fillText(sTxt,sx+sw/2,sy+sh/2);
      if(pen!=null){
        ctx.fillStyle="rgba(251,176,59,0.8)";ctx.font=`600 ${6*SCALE}px Oswald,sans-serif`;
        ctx.fillText(`(${pen})`,sx+sw/2,sy+sh/2+8*SCALE);
      }
    };

    // Draw one match block (2 teams)
    const drawMatch=(x,y,id)=>{
      const m=ML[id];if(!m)return{y1:y,y2:y+MH+MGAP,mid:y+matchH/2};
      const w1=m.wn&&m.t1&&m.wn.c===m.t1.c;
      const w2=m.wn&&m.t2&&m.wn.c===m.t2.c;
      drawTeamRow(x,y,MW,m.t1,m.g1,w1,m.p1);
      drawTeamRow(x,y+MH+MGAP/2,MW,m.t2,m.g2,w2,m.p2);
      return{y1:y+MH/2,y2:y+MH+MGAP/2+MH/2,mid:y+matchH/2};
    };

    // Draw connector lines between rounds
    const drawConn=(x1,y1,x2,y2,mirror=false)=>{
      ctx.strokeStyle="rgba(100,140,200,0.25)";ctx.lineWidth=1.5*SCALE;
      const midX=(x1+x2)/2;
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(midX,y1);ctx.lineTo(midX,y2);ctx.lineTo(x2,y2);ctx.stroke();
      // Small dot at junction
      ctx.fillStyle="rgba(100,140,200,0.4)";
      ctx.beginPath();ctx.arc(midX,y2,2*SCALE,0,Math.PI*2);ctx.fill();
    };

    // Layout helper: compute Y positions for n matches in a column, centered relative to parent
    const layoutCol=(n,totalH,startY)=>{
      const spacing=totalH/n;
      return Array.from({length:n},(_,i)=>startY+i*spacing+spacing/2-matchH/2);
    };

    // ── DRAW LEFT SIDE ──
    const drawSide=(r32ids,r16ids,qfids,sfid,startX,dir)=>{
      const ys={};
      // R32: 8 matches
      const r32Ys=layoutCol(8,totalMatchH,TOPP);
      const r32X=startX;
      r32ids.forEach((id,i)=>{
        const pos=drawMatch(r32X,r32Ys[i],id);
        ys[id]=pos;
      });

      // R16: 4 matches
      const r16X=startX+dir*(MW+RG);
      const r16Ys=layoutCol(4,totalMatchH,TOPP);
      r16ids.forEach((id,i)=>{
        const pos=drawMatch(r16X,r16Ys[i],id);
        ys[id]=pos;
        // Connect from 2 R32 matches
        const p1=ys[r32ids[i*2]],p2=ys[r32ids[i*2+1]];
        if(p1&&p2){
          const fromX=dir>0?r32X+MW:r32X;
          const toX=dir>0?r16X:r16X+MW;
          drawConn(fromX,p1.mid,toX,pos.y1);
          drawConn(fromX,p2.mid,toX,pos.y2);
        }
      });

      // QF: 2 matches
      const qfX=r16X+dir*(MW+RG);
      const qfYs=layoutCol(2,totalMatchH,TOPP);
      qfids.forEach((id,i)=>{
        const pos=drawMatch(qfX,qfYs[i],id);
        ys[id]=pos;
        const p1=ys[r16ids[i*2]],p2=ys[r16ids[i*2+1]];
        if(p1&&p2){
          const fromX=dir>0?r16X+MW:r16X;
          const toX=dir>0?qfX:qfX+MW;
          drawConn(fromX,p1.mid,toX,pos.y1);
          drawConn(fromX,p2.mid,toX,pos.y2);
        }
      });

      // SF: 1 match
      const sfX=qfX+dir*(MW+RG);
      const sfYs=layoutCol(1,totalMatchH,TOPP);
      const sfPos=drawMatch(sfX,sfYs[0],sfid);
      ys[sfid]=sfPos;
      const qp1=ys[qfids[0]],qp2=ys[qfids[1]];
      if(qp1&&qp2){
        const fromX=dir>0?qfX+MW:qfX;
        const toX=dir>0?sfX:sfX+MW;
        drawConn(fromX,qp1.mid,toX,sfPos.y1);
        drawConn(fromX,qp2.mid,toX,sfPos.y2);
      }
      return{sfX,sfPos,ys};
    };

    // Left half
    const leftX=PAD;
    const left=drawSide(leftR32,leftR16,leftQF,101,leftX,1);

    // Right half (mirrored)
    const rightX=W-PAD-MW;
    const right=drawSide(rightR32,rightR16,rightQF,102,rightX,-1);

    // ── FINAL (center) ──
    const finalX=W/2-MW/2;
    const finalY=TOPP+totalMatchH/2-matchH/2;
    // Gold border for final
    ctx.strokeStyle="#fbb03b";ctx.lineWidth=2*SCALE;
    ctx.beginPath();ctx.roundRect(finalX-4*SCALE,finalY-20*SCALE,MW+8*SCALE,matchH+36*SCALE,8*SCALE);ctx.stroke();
    // Final label
    ctx.fillStyle="#fbb03b";ctx.font=`800 ${10*SCALE}px Oswald,sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.fillText("FINAL",W/2,finalY-8*SCALE);
    const fPos=drawMatch(finalX,finalY,104);
    // Connect SF to Final
    drawConn(left.sfX+MW,left.sfPos.mid,finalX,fPos.y1);
    drawConn(right.sfX,right.sfPos.mid,finalX+MW,fPos.y2);

    // ── CHAMPION BANNER ──
    if(champ){
      const banY=finalY+matchH+16*SCALE;
      const banW=180*SCALE,banH=32*SCALE;
      const banX=W/2-banW/2;
      // Gold gradient background
      const grd=ctx.createLinearGradient(banX,banY,banX+banW,banY);
      grd.addColorStop(0,"#fbb03b");grd.addColorStop(0.5,"#ffd700");grd.addColorStop(1,"#fbb03b");
      ctx.fillStyle=grd;
      ctx.beginPath();ctx.roundRect(banX,banY,banW,banH,6*SCALE);ctx.fill();
      // Trophy + champion name
      ctx.fillStyle="#0b1120";ctx.font=`800 ${12*SCALE}px Oswald,sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText(`🏆  ${N(champ).toUpperCase()}  🏆`,W/2,banY+banH/2);
      // Flag below
      const fcy=banY+banH+16*SCALE;
      drawFlag(W/2-14*SCALE,fcy,14*SCALE,champ);
    }

    // Round labels
    const labels=[L.r32,L.r16,L.qf,L.sf];
    const labelY=TOPP-14*SCALE;
    ctx.font=`700 ${7*SCALE}px Oswald,sans-serif`;ctx.textBaseline="bottom";
    labels.forEach((lb,i)=>{
      const lx=PAD+i*(MW+RG)+MW/2;
      const rx=W-PAD-i*(MW+RG)-MW/2;
      ctx.fillStyle="rgba(251,176,59,0.6)";ctx.textAlign="center";
      ctx.fillText(lb.toUpperCase(),lx,labelY);
      ctx.fillText(lb.toUpperCase(),rx,labelY);
    });

    // Watermark
    ctx.fillStyle="rgba(255,255,255,0.15)";ctx.font=`600 ${7*SCALE}px Oswald,sans-serif`;ctx.textAlign="center";ctx.textBaseline="bottom";
    ctx.fillText("wcupsim.com — FIFA World Cup 2026 Simulator",W/2,H-10*SCALE);

    // Download
    const link=document.createElement("a");
    link.download="worldcup2026-bracket.png";
    link.href=canvas.toDataURL("image/png");
    link.click();
  },[champ,mode,autoAll,br,N,L]);

  // Share (text or bracket image)
  const doShare=useCallback(()=>{
    if(!champ)return;
    const text=`${L.champion}: ${champ.f} ${N(champ)}! 🏆⚽\n\nwcupsim.com`;
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
    {/* Nav links */}
    <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
      {[
        ["/groups","Groups"],
        ["/schedule","Schedule"],
        ["/predictions","Predictions"],
        ["/betting","📊 Betting"],
      ].map(([to,label])=>(
        <Link key={to} to={to} style={{fontSize:13,fontWeight:to==="/betting"?800:600,color:to==="/betting"?C.ac:C.bl,textDecoration:"none"}}>{label}</Link>
      ))}
    </div>
    <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
      <Btn onClick={()=>{setLang(null);fullReset()}} color={C.t3}>{L.chLang}</Btn>
      {mode&&<Btn onClick={fullReset} color={C.t2}>{L.chMode}</Btn>}
      {mode&&<Btn onClick={()=>{const m=mode;fullReset();setTimeout(()=>{if(m==="auto")doAuto();else setMode(m)},50)}} color={C.ac}>{L.resim}</Btn>}
    </div>
  </div>

  {/* ── STATS STRIP ── */}
  {!mode&&(
  <div className="fu" style={{display:"flex",justifyContent:"center",gap:32,padding:"16px",background:`linear-gradient(135deg,${C.ac}08,${C.a2}08)`,borderBottom:`1px solid ${C.bd}`}}>
    {[["48",L.teams],["12",L.groups?.replace(/.*?/,"") || "GROUPS"],["104","MATCHES"]].map(([num,label])=>(
      <div key={num} style={{textAlign:"center"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:24,fontWeight:800,color:C.ac}}>{num}</div>
        <div style={{fontSize:10,letterSpacing:2,color:C.t3,fontWeight:600}}>{label}</div>
      </div>
    ))}
  </div>)}

  {/* ── MODE SELECT ── */}
  {!mode&&(
  <div className="fu" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"28px 16px",maxWidth:560,margin:"0 auto"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,letterSpacing:3,color:C.t2}}>{L.chooseMode}</div>
    {[["auto",L.auto,L.autoD,C.ac,"🎯"],["manual",L.manual,L.manualD,C.bl,"⚙️"],["quick",L.quick,L.quickD,C.gn,"🚀"]].map(([m,t,d,col,icon])=>(
      <button key={m} onClick={()=>m==="auto"?doAuto():setMode(m)} style={{width:"100%",padding:"22px 22px 22px 26px",borderRadius:16,
        border:`1px solid ${C.bd}`,borderLeft:`4px solid ${col}`,
        background:`linear-gradient(135deg,${C.cd},${col}06)`,
        cursor:"pointer",textAlign:rtl?"right":"left",transition:"all 0.25s ease",
        boxShadow:"0 2px 12px rgba(0,0,0,0.04)",display:"flex",alignItems:"center",gap:16}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${col}22`}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)"}}>
        <div style={{fontSize:32,width:48,textAlign:"center",flexShrink:0}}>{icon}</div>
        <div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,letterSpacing:2,color:C.tx}}>{t}</div>
          <div style={{fontSize:13,color:C.t2,marginTop:4}}>{d}</div>
        </div>
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
      <button onClick={generateBracketImage} style={{padding:"10px 20px",fontSize:13,fontWeight:700,borderRadius:10,border:`1px solid ${C.gn}`,background:`${C.gn}11`,color:C.gn,cursor:"pointer"}}>📸 Download Bracket</button>
      <button onClick={doShare} style={{padding:"10px 20px",fontSize:13,fontWeight:700,borderRadius:10,border:`1px solid ${C.bl}`,background:`${C.bl}11`,color:C.bl,cursor:"pointer"}}>{L.share}</button>
      <a href={AFF_LINK} target="_blank" rel="noopener noreferrer" style={{padding:"10px 20px",fontSize:13,fontWeight:700,borderRadius:10,border:"none",background:"linear-gradient(135deg,#d4145a,#ff6b35)",color:"#fff",cursor:"pointer",textDecoration:"none"}}>{L.bet} 🎰</a>
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
            return(<div key={i} style={{background:C.cd,borderRadius:big?16:10,padding:big?"12px 18px":"7px 11px",border:big?`2px solid ${C.a2}`:`1px solid ${C.bd}`,minWidth:big?260:220,boxShadow:big?`0 4px 24px ${C.a2}22`:"none"}}>
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

  {/* ── SEO CONTENT ── */}
  <div style={{maxWidth:800,margin:"0 auto",padding:"40px 20px",color:C.t2,fontSize:14,lineHeight:1.8}}>
    <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,color:C.tx,letterSpacing:2,marginBottom:12}}>FIFA WORLD CUP 2026 SIMULATOR</h2>
    <p>Welcome to the most advanced FIFA World Cup 2026 simulator available online. Our simulator uses real FIFA rankings, historical World Cup data, current team form, and defensive ratings to generate realistic tournament outcomes. With 48 teams competing across 12 groups and 104 matches, the 2026 FIFA World Cup in USA, Mexico, and Canada will be the biggest World Cup in history.</p>

    <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:C.tx,marginTop:24,marginBottom:8}}>How Does the Simulator Work?</h3>
    <p>Our simulation engine calculates expected goals (xG) for each team based on multiple factors: FIFA rating, World Cup titles, tournament experience, current form, and defensive strength. Host nations (USA, Mexico, Canada) receive a home advantage boost. The simulator also includes a dark horse factor — approximately 1 in 20 knockout matches features an upset, just like real World Cup history (South Korea 2002, Costa Rica 2014, Morocco 2022).</p>

    <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:C.tx,marginTop:24,marginBottom:8}}>Three Simulation Modes</h3>
    <p><strong>Auto Simulation:</strong> Watch the entire tournament unfold automatically — all 104 matches simulated in seconds with progressive round-by-round reveal from Group Stage through the Final.</p>
    <p><strong>Manual Simulation:</strong> Take full control by setting scores for every match, or simulate individual games. Perfect for testing specific scenarios and "what if" predictions.</p>
    <p><strong>Quick Manual:</strong> Rank teams in each group by drag-and-drop, then pick knockout winners. The fastest way to create your personal World Cup bracket prediction.</p>

    <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:C.tx,marginTop:24,marginBottom:8}}>World Cup 2026 Format</h3>
    <p>The 2026 FIFA World Cup introduces a new expanded format with 48 teams divided into 12 groups of 4. The top 2 teams from each group qualify automatically, along with the 8 best third-placed teams, creating a Round of 32 followed by Round of 16, Quarter-Finals, Semi-Finals, Third Place match, and the Grand Final.</p>

    <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:C.tx,marginTop:24,marginBottom:8}}>Share Your Results</h3>
    <p>After each simulation, download your complete tournament bracket as a professional PNG image — perfect for sharing on social media, WhatsApp groups, and TikTok. Compare predictions with friends and see who gets closest to the real results!</p>

    <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:C.tx,marginTop:24,marginBottom:8}}>Available in 6 Languages</h3>
    <p>Our World Cup simulator is available in French, English, Arabic, Portuguese, Spanish, and Hindi — covering fans across every continent. All team names are translated and the interface adapts with RTL support for Arabic speakers.</p>
  </div>

  {/* ── FOOTER ── */}
  <div style={{textAlign:"center",padding:"14px 12px 32px"}}>
    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:600,letterSpacing:1,color:C.t3}}>
      WORLD CUP 2026 SIMULATOR — WCUPSIM.COM
    </div>
    <div style={{marginTop:6}}>
      <Link to="/privacy" style={{color:C.t3,fontSize:11}}>Privacy Policy</Link>
    </div>
  </div>
  </div>);
}
