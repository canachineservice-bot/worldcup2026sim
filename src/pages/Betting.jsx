import { useState, useEffect } from 'react'
import Layout from './Layout'
import { useTheme } from '../ThemeContext.jsx'

const AFF_LINK="https://refpa7921972.top/L?tag=d_3955339m_97c_&site=3955339&ad=97";

// The Odds API — free tier (500 requests/month)
const ODDS_API_KEY="e1f5c898403867044fb688cb05e93aeb";
const ODDS_API_URL="https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/?apiKey="+ODDS_API_KEY+"&regions=eu&markets=h2h&oddsFormat=decimal";

// Team name mapping for API matching
const TEAM_NAMES={
  MEX:"Mexico",KOR:"South Korea",RSA:"South Africa",DEN:"Denmark",CAN:"Canada",SUI:"Switzerland",
  QAT:"Qatar",ITA:"Italy",BRA:"Brazil",MAR:"Morocco",SCO:"Scotland",HAI:"Haiti",USA:"United States",
  AUS:"Australia",PAR:"Paraguay",TUR:"Turkey",GER:"Germany",CIV:"Ivory Coast",ECU:"Ecuador",CUR:"Curacao",
  NED:"Netherlands",TUN:"Tunisia",JPN:"Japan",UKR:"Ukraine",BEL:"Belgium",IRN:"Iran",EGY:"Egypt",
  NZL:"New Zealand",ESP:"Spain",URU:"Uruguay",KSA:"Saudi Arabia",CPV:"Cape Verde",FRA:"France",
  SEN:"Senegal",NOR:"Norway",IRQ:"Iraq",ARG:"Argentina",AUT:"Austria",JOR:"Jordan",ALG:"Algeria",
  POR:"Portugal",COL:"Colombia",UZB:"Uzbekistan",COD:"DR Congo",ENG:"England",CRO:"Croatia",
  GHA:"Ghana",PAN:"Panama"
};

// ── TEAM DATA (mirrored from Simulator) ──
const TM={
MEX:{c:"MEX",f:"🇲🇽",g:"A",rt:82,rk:15,wc:3,fm:6,df:6,ho:1,xg:1.4,gpm:1.5,cs:30,rcf:"WDWLD",pos:52},KOR:{c:"KOR",f:"🇰🇷",g:"A",rt:76,rk:23,wc:2,fm:5,df:5,ho:0,xg:1.1,gpm:1.2,cs:25,rcf:"WLDWL",pos:49},RSA:{c:"RSA",f:"🇿🇦",g:"A",rt:65,rk:59,wc:1,fm:4,df:4,ho:0,xg:0.8,gpm:0.9,cs:20,rcf:"LDWDL",pos:44},DEN:{c:"DEN",f:"🇩🇰",g:"A",rt:78,rk:19,wc:2,fm:6,df:7,ho:0,xg:1.3,gpm:1.4,cs:38,rcf:"WWDLD",pos:54},
CAN:{c:"CAN",f:"🇨🇦",g:"B",rt:72,rk:40,wc:0,fm:5,df:5,ho:1,xg:1.0,gpm:1.1,cs:22,rcf:"WDLDW",pos:47},SUI:{c:"SUI",f:"🇨🇭",g:"B",rt:80,rk:16,wc:2,fm:6,df:7,ho:0,xg:1.3,gpm:1.3,cs:35,rcf:"DWWDW",pos:53},QAT:{c:"QAT",f:"🇶🇦",g:"B",rt:62,rk:45,wc:0,fm:3,df:4,ho:0,xg:0.7,gpm:0.7,cs:18,rcf:"LLDLL",pos:42},ITA:{c:"ITA",f:"🇮🇹",g:"B",rt:83,rk:9,wc:8,fm:7,df:8,ho:0,xg:1.5,gpm:1.6,cs:42,rcf:"WWWDL",pos:55},
BRA:{c:"BRA",f:"🇧🇷",g:"C",rt:87,rk:5,wc:10,fm:6,df:5,ho:0,xg:1.8,gpm:1.9,cs:28,rcf:"WDWLW",pos:58},MAR:{c:"MAR",f:"🇲🇦",g:"C",rt:79,rk:14,wc:4,fm:7,df:8,ho:0,xg:1.3,gpm:1.4,cs:45,rcf:"WWWDW",pos:51},SCO:{c:"SCO",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",g:"C",rt:70,rk:36,wc:1,fm:5,df:5,ho:0,xg:1.0,gpm:1.0,cs:22,rcf:"DLWLD",pos:46},HAI:{c:"HAI",f:"🇭🇹",g:"C",rt:52,rk:88,wc:0,fm:3,df:3,ho:0,xg:0.5,gpm:0.6,cs:10,rcf:"LLDLD",pos:38},
USA:{c:"USA",f:"🇺🇸",g:"D",rt:81,rk:11,wc:2,fm:7,df:6,ho:2,xg:1.5,gpm:1.6,cs:32,rcf:"WWWDW",pos:54},AUS:{c:"AUS",f:"🇦🇺",g:"D",rt:73,rk:25,wc:1,fm:5,df:5,ho:0,xg:1.0,gpm:1.1,cs:24,rcf:"WDLWL",pos:48},PAR:{c:"PAR",f:"🇵🇾",g:"D",rt:70,rk:43,wc:1,fm:4,df:5,ho:0,xg:0.9,gpm:1.0,cs:26,rcf:"DLDWL",pos:45},TUR:{c:"TUR",f:"🇹🇷",g:"D",rt:77,rk:26,wc:3,fm:6,df:5,ho:0,xg:1.3,gpm:1.4,cs:28,rcf:"WWDLW",pos:52},
GER:{c:"GER",f:"🇩🇪",g:"E",rt:84,rk:8,wc:9,fm:7,df:6,ho:0,xg:1.7,gpm:1.8,cs:30,rcf:"WWDWL",pos:57},CIV:{c:"CIV",f:"🇨🇮",g:"E",rt:72,rk:38,wc:1,fm:6,df:4,ho:0,xg:1.1,gpm:1.2,cs:20,rcf:"WWDLD",pos:47},ECU:{c:"ECU",f:"🇪🇨",g:"E",rt:71,rk:33,wc:1,fm:5,df:5,ho:0,xg:1.0,gpm:1.1,cs:24,rcf:"DWLDW",pos:46},CUR:{c:"CUR",f:"🇨🇼",g:"E",rt:48,rk:83,wc:0,fm:3,df:3,ho:0,xg:0.4,gpm:0.5,cs:8,rcf:"LLLLD",pos:35},
NED:{c:"NED",f:"🇳🇱",g:"F",rt:83,rk:7,wc:6,fm:7,df:7,ho:0,xg:1.6,gpm:1.7,cs:36,rcf:"WWWDW",pos:57},TUN:{c:"TUN",f:"🇹🇳",g:"F",rt:68,rk:39,wc:1,fm:5,df:6,ho:0,xg:0.9,gpm:1.0,cs:30,rcf:"DWDLL",pos:45},JPN:{c:"JPN",f:"🇯🇵",g:"F",rt:80,rk:13,wc:3,fm:8,df:6,ho:0,xg:1.5,gpm:1.6,cs:32,rcf:"WWWWL",pos:55},UKR:{c:"UKR",f:"🇺🇦",g:"F",rt:75,rk:22,wc:2,fm:5,df:5,ho:0,xg:1.1,gpm:1.2,cs:24,rcf:"WDLDW",pos:50},
BEL:{c:"BEL",f:"🇧🇪",g:"G",rt:80,rk:6,wc:3,fm:5,df:6,ho:0,xg:1.4,gpm:1.5,cs:30,rcf:"DLDWW",pos:55},IRN:{c:"IRN",f:"🇮🇷",g:"G",rt:72,rk:21,wc:1,fm:5,df:6,ho:0,xg:0.9,gpm:1.0,cs:32,rcf:"WDDLW",pos:44},EGY:{c:"EGY",f:"🇪🇬",g:"G",rt:70,rk:31,wc:1,fm:5,df:5,ho:0,xg:1.0,gpm:1.1,cs:26,rcf:"DWWDL",pos:47},NZL:{c:"NZL",f:"🇳🇿",g:"G",rt:55,rk:95,wc:0,fm:4,df:4,ho:0,xg:0.6,gpm:0.7,cs:14,rcf:"LLDWL",pos:40},
ESP:{c:"ESP",f:"🇪🇸",g:"H",rt:90,rk:1,wc:9,fm:9,df:8,ho:0,xg:2.1,gpm:2.2,cs:48,rcf:"WWWWW",pos:65},URU:{c:"URU",f:"🇺🇾",g:"H",rt:80,rk:10,wc:6,fm:6,df:7,ho:0,xg:1.3,gpm:1.4,cs:34,rcf:"WWDLW",pos:50},KSA:{c:"KSA",f:"🇸🇦",g:"H",rt:67,rk:56,wc:1,fm:4,df:4,ho:0,xg:0.8,gpm:0.9,cs:18,rcf:"WLDLL",pos:43},CPV:{c:"CPV",f:"🇨🇻",g:"H",rt:55,rk:62,wc:0,fm:4,df:4,ho:0,xg:0.6,gpm:0.7,cs:16,rcf:"DWLLD",pos:42},
FRA:{c:"FRA",f:"🇫🇷",g:"I",rt:88,rk:3,wc:9,fm:7,df:7,ho:0,xg:1.9,gpm:2.0,cs:40,rcf:"WWDWW",pos:58},SEN:{c:"SEN",f:"🇸🇳",g:"I",rt:75,rk:20,wc:2,fm:6,df:5,ho:0,xg:1.1,gpm:1.2,cs:26,rcf:"WDWDL",pos:48},NOR:{c:"NOR",f:"🇳🇴",g:"I",rt:74,rk:17,wc:1,fm:7,df:5,ho:0,xg:1.4,gpm:1.5,cs:24,rcf:"WWWDL",pos:52},IRQ:{c:"IRQ",f:"🇮🇶",g:"I",rt:63,rk:55,wc:0,fm:4,df:4,ho:0,xg:0.7,gpm:0.8,cs:16,rcf:"DLDLW",pos:42},
ARG:{c:"ARG",f:"🇦🇷",g:"J",rt:89,rk:2,wc:10,fm:8,df:7,ho:0,xg:2.0,gpm:2.1,cs:42,rcf:"WWWWD",pos:60},AUT:{c:"AUT",f:"🇦🇹",g:"J",rt:76,rk:24,wc:2,fm:6,df:6,ho:0,xg:1.2,gpm:1.3,cs:28,rcf:"WDWLD",pos:52},JOR:{c:"JOR",f:"🇯🇴",g:"J",rt:64,rk:68,wc:0,fm:5,df:5,ho:0,xg:0.7,gpm:0.8,cs:18,rcf:"DWLWD",pos:43},ALG:{c:"ALG",f:"🇩🇿",g:"J",rt:68,rk:37,wc:1,fm:5,df:5,ho:0,xg:0.9,gpm:1.0,cs:22,rcf:"WDLDL",pos:46},
POR:{c:"POR",f:"🇵🇹",g:"K",rt:86,rk:4,wc:5,fm:7,df:7,ho:0,xg:1.8,gpm:1.9,cs:38,rcf:"WWWDW",pos:58},COL:{c:"COL",f:"🇨🇴",g:"K",rt:81,rk:12,wc:2,fm:7,df:6,ho:0,xg:1.4,gpm:1.5,cs:30,rcf:"WWDWL",pos:54},UZB:{c:"UZB",f:"🇺🇿",g:"K",rt:66,rk:53,wc:0,fm:5,df:5,ho:0,xg:0.8,gpm:0.9,cs:20,rcf:"DWDLW",pos:44},COD:{c:"COD",f:"🇨🇩",g:"K",rt:60,rk:49,wc:0,fm:4,df:4,ho:0,xg:0.7,gpm:0.8,cs:14,rcf:"LLDWW",pos:42},
ENG:{c:"ENG",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:"L",rt:85,rk:4,wc:6,fm:7,df:7,ho:0,xg:1.7,gpm:1.8,cs:36,rcf:"WDWWW",pos:57},CRO:{c:"CRO",f:"🇭🇷",g:"L",rt:79,rk:18,wc:5,fm:6,df:7,ho:0,xg:1.2,gpm:1.3,cs:34,rcf:"DWWDW",pos:54},GHA:{c:"GHA",f:"🇬🇭",g:"L",rt:66,rk:44,wc:2,fm:5,df:4,ho:0,xg:0.9,gpm:1.0,cs:18,rcf:"WLDLD",pos:45},PAN:{c:"PAN",f:"🇵🇦",g:"L",rt:58,rk:72,wc:0,fm:4,df:4,ho:0,xg:0.6,gpm:0.7,cs:14,rcf:"LLDWL",pos:40},
};

const GS=["A","B","C","D","E","F","G","H","I","J","K","L"];
const gT=g=>Object.values(TM).filter(t=>t.g===g);

function getStrength(t){
  return t.rt*0.50+(t.wc||0)*1.5+(t.fm||5)*2.0+(t.df||5)*1.0+(t.ho||0)*3.0;
}

function calcOdds(a,b){
  const sA=getStrength(a),sB=getStrength(b);
  const pA=sA/(sA+sB),pB=sB/(sA+sB),pD=0.22;
  const adjA=Math.max(0.05,pA-pD/2),adjB=Math.max(0.05,pB-pD/2);
  const m=1.08;
  return{o1:(m/adjA).toFixed(2),oX:(m/pD).toFixed(2),o2:(m/adjB).toFixed(2)};
}

function getH2H(a,b){
  const seed=(a.c.charCodeAt(0)*31+a.c.charCodeAt(1)*17+b.c.charCodeAt(0)*13+b.c.charCodeAt(1)*7)%100;
  const total=3+seed%6;
  const aWins=Math.round(total*(a.rt/(a.rt+b.rt)));
  const bWins=Math.round(total*(b.rt/(a.rt+b.rt)));
  const draws=Math.max(0,total-aWins-bWins);
  return{total,aWins,draws,bWins};
}

function calcBTTS(a,b){
  const attackA=a.xg||1.0,attackB=b.xg||1.0;
  const defA=1-((a.df||5)/10)*0.6,defB=1-((b.df||5)/10)*0.6;
  return Math.min(75,Math.max(25,Math.round((attackA*defB+attackB*defA)*25)));
}

function calcOU(a,b){
  const totalXg=(a.xg||1.0)+(b.xg||1.0);
  const over=Math.min(80,Math.max(20,Math.round(totalXg*28)));
  return{over,under:100-over};
}

const formColor=(ch)=>ch==="W"?"#00a854":ch==="D"?"#fbb03b":"#d4145a";

// Colors now come from theme context via props

// ── MATCH CARD ──
function MatchCard({a,b,liveOdds,C}){
  const fallback=calcOdds(a,b);
  const odds=liveOdds||fallback;
  const isLive=!!liveOdds;
  const h2h=getH2H(a,b);
  const btts=calcBTTS(a,b);
  const ou=calcOU(a,b);

  return(
    <div style={{background:C.cd,borderRadius:16,padding:16,border:`1px solid ${C.bd}`,boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
      {/* Teams header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:28}}>{a.f}</span>
          <div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700}}>{a.c}</div>
            <div style={{fontSize:10,color:C.t3}}>FIFA #{a.rk}</div>
          </div>
        </div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:800,color:C.t3,letterSpacing:2}}>VS</div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexDirection:"row-reverse"}}>
          <span style={{fontSize:28}}>{b.f}</span>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700}}>{b.c}</div>
            <div style={{fontSize:10,color:C.t3}}>FIFA #{b.rk}</div>
          </div>
        </div>
      </div>

      {/* Odds */}
      <div style={{marginBottom:4,textAlign:"center"}}>
        {isLive?<span style={{fontSize:9,fontWeight:800,color:"#fff",background:C.gn,padding:"2px 8px",borderRadius:4,letterSpacing:1}}>LIVE ODDS</span>
        :<span style={{fontSize:9,fontWeight:600,color:C.t3,letterSpacing:1}}>ESTIMATED ODDS</span>}
      </div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {[["1",odds.o1,C.bl],["X",odds.oX,"#555"],["2",odds.o2,C.ac]].map(([label,val,col])=>(
          <div key={label} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRadius:10,border:`1px solid ${isLive?C.gn:C.bd}`,background:isLive?`${C.gn}10`:C.b2}}>
            <div style={{fontSize:10,color:C.t3,fontWeight:600}}>{label}</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:800,color:col}}>{val}</div>
          </div>
        ))}
      </div>

      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
        {[
          ["xG / 90",a.xg,b.xg],
          ["Goals/Match",a.gpm,b.gpm],
          ["Clean Sheet %",a.cs+"%",b.cs+"%"],
          ["Possession",a.pos+"%",b.pos+"%"],
        ].map(([label,vA,vB])=>(
          <div key={label} style={{background:C.b2,borderRadius:8,padding:"8px 10px",border:`1px solid ${C.bd}`}}>
            <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1,marginBottom:4}}>{label}</div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:700}}>
              <span style={{color:parseFloat(vA)>=parseFloat(vB)?C.gn:C.t2}}>{vA}</span>
              <span style={{color:parseFloat(vB)>=parseFloat(vA)?C.gn:C.t2}}>{vB}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"8px 10px",background:C.b2,borderRadius:8}}>
        <div>
          <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1,marginBottom:4}}>FORM {a.c}</div>
          <div style={{display:"flex",gap:3}}>
            {(a.rcf||"DDDDD").split("").map((ch,i)=>(
              <span key={i} style={{width:20,height:20,borderRadius:4,display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:800,background:formColor(ch)}}>{ch}</span>
            ))}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1,marginBottom:4}}>FORM {b.c}</div>
          <div style={{display:"flex",gap:3}}>
            {(b.rcf||"DDDDD").split("").map((ch,i)=>(
              <span key={i} style={{width:20,height:20,borderRadius:4,display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:800,background:formColor(ch)}}>{ch}</span>
            ))}
          </div>
        </div>
      </div>

      {/* H2H */}
      <div style={{background:C.b2,borderRadius:8,padding:"8px 10px",marginBottom:12,border:`1px solid ${C.bd}`}}>
        <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1,marginBottom:4}}>HEAD TO HEAD — {h2h.total} MATCHES</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:700,marginBottom:4}}>
          <span style={{color:C.bl}}>{a.f} {h2h.aWins}W</span>
          <span style={{color:C.t3}}>{h2h.draws}D</span>
          <span style={{color:C.ac}}>{h2h.bWins}W {b.f}</span>
        </div>
        <div style={{height:8,borderRadius:4,overflow:"hidden",display:"flex"}}>
          <div style={{width:`${(h2h.aWins/h2h.total)*100}%`,background:C.bl,transition:"width .3s"}}/>
          <div style={{width:`${(h2h.draws/h2h.total)*100}%`,background:C.bd}}/>
          <div style={{width:`${(h2h.bWins/h2h.total)*100}%`,background:C.ac,transition:"width .3s"}}/>
        </div>
      </div>

      {/* BTTS & O/U */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
        <div style={{background:C.b2,borderRadius:8,padding:"8px 10px",border:`1px solid ${C.bd}`}}>
          <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1}}>BTTS</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:800,color:btts>50?C.gn:C.ac}}>YES {btts}%</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:800,color:btts<=50?C.gn:C.t3}}>NO {100-btts}%</span>
          </div>
          <div style={{height:6,borderRadius:3,overflow:"hidden",display:"flex",marginTop:4}}>
            <div style={{width:`${btts}%`,background:C.gn}}/>
            <div style={{width:`${100-btts}%`,background:C.bd}}/>
          </div>
        </div>
        <div style={{background:C.b2,borderRadius:8,padding:"8px 10px",border:`1px solid ${C.bd}`}}>
          <div style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:1}}>OVER / UNDER 2.5</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:800,color:C.bl}}>O {ou.over}%</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:800,color:C.t3}}>U {ou.under}%</span>
          </div>
          <div style={{height:6,borderRadius:3,overflow:"hidden",display:"flex",marginTop:4}}>
            <div style={{width:`${ou.over}%`,background:C.bl}}/>
            <div style={{width:`${ou.under}%`,background:C.bd}}/>
          </div>
        </div>
      </div>

      {/* Affiliate CTA */}
      <a href={AFF_LINK} target="_blank" rel="noopener noreferrer"
        style={{display:"block",width:"100%",padding:"12px",fontSize:14,fontWeight:800,fontFamily:"'Oswald',sans-serif",
          letterSpacing:2,borderRadius:10,border:"none",cursor:"pointer",color:"#fff",textAlign:"center",textDecoration:"none",
          background:"linear-gradient(135deg,#d4145a,#ff6b35)",boxShadow:"0 4px 16px rgba(212,20,90,0.25)",transition:"transform .15s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        🎰 BET ON THIS MATCH →
      </a>
    </div>
  );
}

export default function Betting(){
  const {C}=useTheme();
  const [selectedGroup,setSelectedGroup]=useState("ALL");
  const [liveOdds,setLiveOdds]=useState({});
  const [oddsStatus,setOddsStatus]=useState("loading"); // loading, live, fallback

  // Fetch live odds from The Odds API
  useEffect(()=>{
    fetch(ODDS_API_URL)
      .then(r=>{if(!r.ok)throw new Error("API error");return r.json()})
      .then(data=>{
        const oddsMap={};
        data.forEach(event=>{
          const home=event.home_team;
          const away=event.away_team;
          // Find matching team codes
          const homeCode=Object.entries(TEAM_NAMES).find(([,name])=>
            home.toLowerCase().includes(name.toLowerCase())||name.toLowerCase().includes(home.toLowerCase())
          )?.[0];
          const awayCode=Object.entries(TEAM_NAMES).find(([,name])=>
            away.toLowerCase().includes(name.toLowerCase())||name.toLowerCase().includes(away.toLowerCase())
          )?.[0];
          if(homeCode&&awayCode&&event.bookmakers?.length){
            const bm=event.bookmakers[0];
            const market=bm.markets?.find(m=>m.key==="h2h");
            if(market?.outcomes){
              const o1=market.outcomes.find(o=>o.name===home)?.price;
              const oX=market.outcomes.find(o=>o.name==="Draw")?.price;
              const o2=market.outcomes.find(o=>o.name===away)?.price;
              if(o1&&o2){
                const key=homeCode+"_"+awayCode;
                const key2=awayCode+"_"+homeCode;
                oddsMap[key]={o1:o1.toFixed(2),oX:oX?oX.toFixed(2):"4.00",o2:o2.toFixed(2)};
                oddsMap[key2]={o1:o2.toFixed(2),oX:oX?oX.toFixed(2):"4.00",o2:o1.toFixed(2)};
              }
            }
          }
        });
        setLiveOdds(oddsMap);
        setOddsStatus(Object.keys(oddsMap).length>0?"live":"fallback");
      })
      .catch(()=>setOddsStatus("fallback"));
  },[]);

  const groups=selectedGroup==="ALL"?GS:[selectedGroup];
  const matches=[];
  groups.forEach(g=>{
    const ts=gT(g);
    for(let i=0;i<ts.length;i++)
      for(let j=i+1;j<ts.length;j++)
        matches.push({a:ts[i],b:ts[j],g});
  });

  return(
    <Layout title="📊 BETTING STATS & ODDS">
      <div style={{textAlign:"center",marginBottom:24}}>
        <p style={{color:"#555577",fontSize:15,maxWidth:600,margin:"8px auto 12px"}}>
          Advanced statistics, odds, head-to-head records, and betting insights for every World Cup 2026 match.
        </p>
        {oddsStatus==="live"&&<div style={{fontSize:11,fontWeight:700,color:C.gn,marginBottom:8}}>🟢 LIVE ODDS FROM BOOKMAKERS</div>}
        {oddsStatus==="fallback"&&<div style={{fontSize:11,color:C.t3,marginBottom:8}}>Estimated odds (live odds available closer to tournament)</div>}
        {oddsStatus==="loading"&&<div style={{fontSize:11,color:C.t3,marginBottom:8}}>Loading odds...</div>}

        {/* Group filter */}
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6}}>
          <button onClick={()=>setSelectedGroup("ALL")}
            style={{padding:"8px 16px",borderRadius:8,border:`2px solid ${selectedGroup==="ALL"?C.ac:C.bd}`,
              background:selectedGroup==="ALL"?`${C.ac}15`:C.cd,color:selectedGroup==="ALL"?C.ac:C.t2,
              fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>
            ALL
          </button>
          {GS.map(g=>(
            <button key={g} onClick={()=>setSelectedGroup(g)}
              style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${selectedGroup===g?C.ac:C.bd}`,
                background:selectedGroup===g?`${C.ac}15`:C.cd,color:selectedGroup===g?C.ac:C.t2,
                fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Match count */}
      <div style={{textAlign:"center",marginBottom:16,fontFamily:"'Oswald',sans-serif",fontSize:14,letterSpacing:2,color:C.t3}}>
        {matches.length} MATCHES
      </div>

      {/* Match cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:16}}>
        {matches.map((m,i)=>(
          <div key={i}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,color:C.a2,fontWeight:700,marginBottom:4,textAlign:"center"}}>
              GROUP {m.g}
            </div>
            <MatchCard a={m.a} b={m.b} liveOdds={liveOdds[m.a.c+"_"+m.b.c]} C={C}/>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{textAlign:"center",marginTop:32,padding:"24px",background:C.cd,borderRadius:16,border:`2px solid ${C.ac}22`}}>
        <div style={{fontSize:18,fontWeight:800,fontFamily:"'Oswald',sans-serif",letterSpacing:2,color:C.tx}}>READY TO BET?</div>
        <p style={{color:C.t2,fontSize:14,margin:"8px 0 16px"}}>Get the best odds on all World Cup 2026 matches</p>
        <a href={AFF_LINK} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block",padding:"14px 40px",fontSize:16,fontWeight:800,fontFamily:"'Oswald',sans-serif",
            letterSpacing:3,borderRadius:50,border:"none",cursor:"pointer",color:"#fff",textDecoration:"none",
            background:"linear-gradient(135deg,#d4145a,#ff6b35)",boxShadow:"0 4px 20px rgba(212,20,90,0.3)"}}>
          🎰 START BETTING NOW →
        </a>
      </div>
    </Layout>
  );
}
