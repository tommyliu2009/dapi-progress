const B=[
{id:'gov',n:'鄉政公告',e:'🏛️',x:400,y:150,c:'#e0b04a',p:72,d:'AI 每天整理公所公告，自動改寫成白話、長輩版大字與語音，推播到 LINE。'},
{id:'sub',n:'補助申請',e:'📝',x:600,y:250,c:'#5aa0e0',p:55,d:'鄉民問「我能申請什麼補助？」AI 依身分與產業比對中央與縣府補助，產生申請清單與文件檢核。'},
{id:'farm',n:'酸菜農產',e:'🥬',x:200,y:250,c:'#6fbf4a',p:64,d:'芥菜與酸菜產銷：AI 彙整天氣、行情，提醒農友採收與醃漬時程，協助小農上架電商。'},
{id:'care',n:'長照關懷',e:'🧓',x:400,y:330,c:'#e07a7a',p:41,d:'AI 協助志工排班送餐、整理關懷訪視紀錄，異常狀況立即提醒社工（個資不離開機構）。'},
{id:'tour',n:'觀光導覽',e:'🗺️',x:600,y:410,c:'#b07ae0',p:48,d:'AI 導覽員：依停留時間推薦路線、宗教文化地圖與在地小吃，鄉民打卡集章。'},
{id:'env',n:'環境守護',e:'♻️',x:200,y:410,c:'#4ac0b0',p:37,d:'鄉民拍照回報路燈、垃圾、積水，AI 自動分類、定位並追蹤處理進度。'}];
const S=JSON.parse(localStorage.getItem('dapi')||'{"r":null,"t":{},"v":{}}');const save=()=>localStorage.setItem('dapi',JSON.stringify(S));
if(!S.t||typeof S.t!=='object')S.t={};
if(!S.v||typeof S.v!=='object')S.v={};
if(!Array.isArray(S.log))S.log=[];
const $=id=>document.getElementById(id);
function iso(b){const w=70,h=35,H=60;return `<g class="bld" data-id="${b.id}" tabindex="0" role="button" aria-label="${b.n}">
<polygon points="${b.x},${b.y-H} ${b.x+w},${b.y-H+h} ${b.x},${b.y-H+2*h} ${b.x-w},${b.y-H+h}" fill="${b.c}" stroke="#0b141d" stroke-width="3"/>
<polygon points="${b.x-w},${b.y-H+h} ${b.x},${b.y-H+2*h} ${b.x},${b.y+2*h-10} ${b.x-w},${b.y+h-10}" fill="${b.c}" filter="brightness(.75)" stroke="#0b141d" stroke-width="3" style="filter:brightness(.75)"/>
<polygon points="${b.x+w},${b.y-H+h} ${b.x},${b.y-H+2*h} ${b.x},${b.y+2*h-10} ${b.x+w},${b.y+h-10}" fill="${b.c}" stroke="#0b141d" stroke-width="3" style="filter:brightness(.55)"/>
<text x="${b.x}" y="${b.y-H+h+8}" text-anchor="middle" style="font-size:26px">${b.e}</text>
<text x="${b.x}" y="${b.y+2*h+12}" text-anchor="middle">${b.n}</text></g>`}
function map(){let g='';for(let i=0;i<9;i++)for(let j=0;j<9;j++){const x=400+(i-j)*50,y=40+(i+j)*28;g+=`<polygon points="${x},${y} ${x+50},${y+28} ${x},${y+56} ${x-50},${y+28}" fill="${(i+j)%2?'#8fd16a':'#7cc45a'}" stroke="#5aa83a"/>`}
g+=`<path d="M60 470 Q400 380 760 470" stroke="#e8d9a8" stroke-width="14" fill="none" opacity=".8"/>`;
['🌾','🌾','🥬','🥬','🌸','🌳','🌳'].forEach((e,k)=>g+=`<text x="${80+k*105}" y="${505-(k%2)*30}" style="font-size:26px">${e}</text>`);
$('map').innerHTML=g+B.map(iso).join('');
$('map').querySelectorAll('.bld').forEach(el=>{const f=()=>show(el.dataset.id);el.onclick=f;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}})}
function show(id){const b=B.find(x=>x.id===id);document.querySelectorAll('.bld').forEach(e=>e.classList.toggle('sel',e.dataset.id===id));
const rel={farm:'農務、地方產業',care:'長者數位陪伴',sub:'專業諮詢'};
const extra=rel[id]?`<br><a href="#friend">🤝 大埤之友示範任務：${rel[id]}</a>`:'';
$('panel').innerHTML=`<b>${b.e} ${b.n}</b> <span class="tag">示範資料</span><br>${b.d}${extra}<div class="bar"><i style="width:${b.p}%"></i></div>建置進度 ${b.p}%`;
done('visit_'+id,false);if(B.every(x=>S.t['visit_'+x.id]))done('all');render()}
const T=[{k:'reg',n:'登記成為虛擬鄉民',b:'🪪 新鄉民'},{k:'visit_farm',n:'參觀酸菜農產站',b:'🥬 酸菜之友'},{k:'all',n:'走遍六棟 AI 建築',b:'🧭 探險家'},{k:'vote',n:'在共識牆表態一次',b:'🗳️ 發聲者'},{k:'trip',n:'實地造訪大埤（自行勾選）',b:'🚲 回鄉人',m:1},{k:'friend_basic',n:'登錄大埤之友（一般）',b:'🤝 大埤之友'},{k:'friend_partner',n:'完成一次大埤之友參與任務',b:'🧤 參與夥伴'},{k:'friend_hours',n:'大埤之友示範時數累計 4 小時',b:'⏱️ 時數紀錄'}];
function done(k,r=true){if(!S.t[k]){S.t[k]=Date.now();save()}if(r)render()}
function render(){const r=S.r;$('regbox').innerHTML=r?`<div class="rcard"><div>大埤虛擬鄉民證 <span class="tag">示範</span></div><div class="no">No. ${r.no}</div><div>暱稱：${esc(r.nick)}</div><div>認同村：${esc(r.v)}</div><div class="small" style="color:#4a5a3a">登記日 ${r.d}</div></div><button onclick="if(confirm('確定刪除本機的鄉民證？')){S.r=null;delete S.t.reg;save();render()}" style="margin-top:8px;background:#ccc">刪除</button>`:
`<input id="nick" maxlength="20" placeholder="你的暱稱"><select id="vil" style="width:100%;padding:10px;border-radius:6px">${'三結,北鎮,松竹,南和,聯美,大德,吉田,怡然,嘉興,豐田,北和,西鎮,尚義,興安,豐岡'.split(',').map(v=>`<option>${v}村</option>`).join('')}</select><button style="width:100%;margin-top:6px" onclick="reg()">領取鄉民證</button>`;
$('tasks').innerHTML=T.map(t=>`<li class="${S.t[t.k]?'done':''}"><span>${S.t[t.k]?'✅':'⬜'} ${t.n}</span><span>${S.t[t.k]?t.b:(t.m?`<button onclick="done('trip')">我去過了</button>`:(t.k.startsWith('friend_')?'<a class="minibtn" href="#friend">前往</a>':'🔒'))}</span></li>`).join('');
const n=T.filter(t=>S.t[t.k]).length;$('hud').innerHTML=`<span>🪪 ${r?'No.'+r.no:'訪客'}</span><span>🏅 徽章 ${n}/${T.length}</span><span>⭐ 經驗 ${n*20}</span>`;
$('board').innerHTML=B.map(b=>`<div>${b.e} ${b.n}　${b.p}%</div><div class="bar"><i style="width:${b.p}%"></i></div>`).join('');
const W=['大埤酸菜應該有自己的線上品牌館','長輩需要大字版、語音版的公所公告','每村活動中心應設 AI 服務小幫手','虛擬鄉民可以認養一塊芥菜田'];
$('wall').innerHTML=W.map((w,i)=>`<div class="wl">${w}<br><button onclick="vote(${i},1)">👍 同意${S.v[i]===1?' ✓':''}</button><button onclick="vote(${i},-1)">👎 不同意${S.v[i]===-1?' ✓':''}</button></div>`).join('')}
function vote(i,x){S.v[i]=x;save();done('vote')}
function reg(){const nick=$('nick').value.trim();if(!nick){alert('請輸入暱稱');return}
S.r={nick,v:$('vil').value,no:'DP-'+String(Date.now()).slice(-6),d:new Date().toLocaleDateString('zh-TW')};save();done('reg')}
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
map();render();

const A=[
{b:'farm',n:'酸菜阿伯AI',r:'農產小幫手',c:'#6fbf4a',h:'#f2c9a0',hat:'#d9b44a',g:'芥菜收成囉！醃漬時程、天氣提醒交給我。'},
{b:'gov',n:'稻米小農AI',r:'鄉政公告白話員',c:'#e0b04a',h:'#f5d2b0',hat:'#7a5a2a',g:'公所公告我幫你翻成白話、大字版。'},
{b:'sub',n:'補助小幫手AI',r:'補助比對',c:'#5aa0e0',h:'#f1c7a2',hat:'#2a4a7a',g:'告訴我你的身分與產業，我幫你列可申請的補助清單。'},
{b:'care',n:'長照關懷AI',r:'關懷排班',c:'#e07a7a',h:'#f3cfb3',hat:'#fff',g:'送餐排班、訪視紀錄我來整理，有異狀馬上通知社工。'},
{b:'tour',n:'觀光導覽AI',r:'導覽員',c:'#b07ae0',h:'#f0c8a0',hat:'#e05a8a',g:'有半天嗎？我幫你排一條大埤小旅行路線！'},
{b:'env',n:'環境守護AI',r:'環境回報',c:'#4ac0b0',h:'#f2c9a0',hat:'#2a8a3a',g:'看到路燈壞、積水？拍照給我，我幫你分類追蹤。'}];
function av(a,s=1){return `<g transform="scale(${s})" shape-rendering="crispEdges"><rect x="4" y="0" width="16" height="5" fill="${a.hat}" stroke="#0b141d"/><rect x="5" y="5" width="14" height="10" fill="${a.h}" stroke="#0b141d"/><rect x="8" y="8" width="2" height="3" fill="#0b141d"/><rect x="14" y="8" width="2" height="3" fill="#0b141d"/><rect x="10" y="12" width="4" height="1" fill="#c0504a"/><rect x="4" y="15" width="16" height="9" fill="${a.c}" stroke="#0b141d"/><rect x="10" y="17" width="4" height="4" fill="#fff"/><text x="12" y="20.5" text-anchor="middle" style="font-size:3.5px;fill:#0b141d">AI</text></g>`}
function say(i){const a=A[i];$('bubble').innerHTML=`<b>${a.n}</b>（${a.r}）<span class="tag">虛擬</span><br>「${a.g}」`;
const m=$('mapbubble');if(m){const b=B.find(x=>x.id===a.b);m.setAttribute('transform',`translate(${b.x+40},${b.y-95})`);m.querySelector('text').textContent=a.g.length>16?a.g.slice(0,16)+'…':a.g;m.style.display=''}}
function agents(){$('agentlist').innerHTML=A.map((a,i)=>`<button class="agent" onclick="say(${i})"><svg viewBox="-1 -1 26 26" width="56" height="56">${av(a)}</svg><span>${a.n}</span><small>${a.r}</small></button>`).join('');
let g=A.map((a,i)=>{const b=B.find(x=>x.id===a.b);return `<g class="agt" transform="translate(${b.x+48},${b.y+20})" onclick="say(${i})" role="button" aria-label="${a.n}">${av(a,1.6)}</g>`}).join('');
g+=`<g id="mapbubble" style="display:none"><rect x="-10" y="0" width="230" height="30" rx="8" fill="#fff" stroke="#0b141d" stroke-width="2"/><text x="105" y="20" text-anchor="middle" style="font-size:14px;fill:#0b141d"></text></g>`;
$('map').insertAdjacentHTML('beforeend',g)}
agents();

const P=[{k:'old',n:'70 歲獨居酸菜農',d:['農業','長照','健康關懷','就醫','交通','子女聯繫']},{k:'young',n:'返鄉青年',d:['就業','農業','住','樂']},{k:'fam',n:'雙薪育兒家庭',d:['就學','育','交通','食']},{k:'new',n:'新住民媽媽',d:['就學','就業','育','衣','健康關懷']}];
const N={'就學':['補助小幫手AI','提醒您：孩子的學雜費與助學補助申請期間到了，我可以陪您確認資格（以學校與教育部公告為準）。'],
'就業':['補助小幫手AI','有符合您條件的在地職缺與職訓課程，要不要幫您整理清單？（可洽台灣就業通）'],
'農業':['酸菜阿伯AI','芥菜種植季到了：農業補助與天災救助的公告一出來，我會馬上通知您（以農業部公告為準）。'],
'就醫':['長照關懷AI','明天有門診，需要我幫您預約就醫交通接送嗎？'],
'交通':['觀光導覽AI','今天的公車班次與社區接送時刻已經整理好了。'],
'食':['長照關懷AI','社區據點這週有共餐，要幫您報名嗎？'],
'衣':['環境守護AI','村辦公處有二手衣物交流，需要的話可以登記領取。'],
'住':['補助小幫手AI','住宅修繕與租金補貼的資訊已經整理好（以內政部公告為準）。'],
'行':['觀光導覽AI','出門前提醒：天氣與路況已經幫您確認好了。'],
'育':['補助小幫手AI','育兒津貼與托育資源已經整理好，要我一步一步帶您申請嗎？'],
'樂':['觀光導覽AI','這週末村裡有活動，要幫您加進行事曆嗎？'],
'長照':['長照關懷AI','您可能符合長照2.0服務資格，可以撥 1966 長照專線申請評估，要我幫您準備資料嗎？'],
'健康關懷':['長照關懷AI','早安！今天量血壓了嗎？量好回報數字，我幫您記錄。'],
'子女聯繫':['長照關懷AI','']};
let per=P[0],sel=new Set(P[0].d);
function lineUI(){$('personas').innerHTML=P.map((p,i)=>`<button class="chip ${p===per?'on':''}" onclick="per=P[${i}];sel=new Set(per.d);lineUI()">${p.n}</button>`).join('');
$('needs').innerHTML=Object.keys(N).map(k=>`<button class="chip ${sel.has(k)?'on':''}" onclick="sel.has('${k}')?sel.delete('${k}'):sel.add('${k}');lineUI()">${k}</button>`).join('');
const ok=$('kidok').checked;
$('chat').innerHTML=`<div class="msg sys">👤 ${per.n}（虛擬）· 示範資料</div>`+[...sel].map(k=>{let [a,t]=N[k];if(k==='子女聯繫')t=ok?'您已同意：這週的健康量測摘要會傳給您登記的子女。':'⚠️ 您還沒同意通知子女，所以不會傳送任何訊息。';return `<div class="msg"><b>${a}</b>｜${k}<br>${t}</div>`}).join('');
const D=[['登記鄉民（模擬）',128],['本週健康回報',86],['待追蹤：長照',12],['待追蹤：就醫接送',7],['同意通知子女',41],['農業補助提醒',53]];
$('dash').innerHTML=D.map(([n,v])=>`<div><span>${v}</span>${n}</div>`).join('')}
$('kidok').onchange=lineUI;lineUI();

const INTERESTS=[
{k:'event',n:'活動訊息',d:'示範文案：週末活動的消息只出現在這個畫面，不會寄信，也不會推到 LINE。'},
{k:'vol',n:'志工招募',d:'示範文案：志工需求只供閱讀。沒有報名表，也不收集電話或住址。'},
{k:'farm',n:'農事資訊',d:'示範文案：芥菜與酸菜的季節提醒。不是農業部、農會或公所公告。'},
{k:'elder',n:'長者關懷',d:'示範文案：數位陪伴的時段說明。不會聯絡任何真實長輩或家屬。'},
{k:'ind',n:'地方產業',d:'示範文案：酸菜、芥菜、花生等產業見習介紹。不是徵人啟事。'},
{k:'tour',n:'文化觀光',d:'示範文案：走讀路線草稿。不是鄉公所的觀光行程。'}];
const FT=[
{k:'farmwork',n:'農務',h:2,b:'farm',bn:'酸菜農產',d:'示範任務：假裝幫忙採收與分級。按下後只在這台裝置記下 2 小時，不是真的出勤。'},
{k:'elder',n:'長者數位陪伴',h:1.5,b:'care',bn:'長照關懷',d:'示範任務：對象是虛擬長輩，教他把公告看成大字。不會聯絡真人。按下後記下 1.5 小時。'},
{k:'industry',n:'地方產業',h:2,b:'farm',bn:'酸菜農產',d:'示範任務：練習整理一則酸菜產銷短文。不是農會或工廠的班表。按下後記下 2 小時。'},
{k:'consult',n:'專業諮詢',h:1,b:'sub',bn:'補助申請',d:'示範任務：依虛擬提問列出還要查官方公告的清單。不是法律、醫療或補助核定。按下後記下 1 小時。'}];
let draft=null,editing=false;
function friendSanitize(){
if(!Array.isArray(S.log))S.log=[];
S.log=S.log.filter(x=>x&&typeof x==='object'&&typeof x.k==='string').slice(-30);
if(S.f==null)return;
if(typeof S.f.nick!=='string'||!Array.isArray(S.f.interests)||!Array.isArray(S.f.tracks)){S.f=null;return}
S.f.interests=S.f.interests.filter(k=>INTERESTS.some(i=>i.k===k));
S.f.tracks=S.f.tracks.filter(k=>FT.some(t=>t.k===k));
if(S.f.role!=='partner')S.f.role='general';
if(typeof S.f.no!=='string')S.f.no='DF-LOCAL';
if(typeof S.f.d!=='string')S.f.d='';
}
function friendDraft(){
if(draft)return draft;
if(S.f)draft={nick:S.f.nick,role:S.f.role==='partner'?'partner':'general',interests:new Set(S.f.interests),tracks:new Set(S.f.tracks)};
else draft={nick:(S.r&&S.r.nick)||'',role:'general',interests:new Set(),tracks:new Set()};
return draft;
}
function friendSync(){const n=document.getElementById('fnick');if(n)friendDraft().nick=n.value}
function friendHours(){return Math.round(S.log.reduce((a,x)=>a+(+x.h||0),0)*10)/10}
function fmtH(n){const x=Math.round(n*10)/10;return Number.isInteger(x)?String(x):x.toFixed(1)}
function setLive(msg,asErr){const a=document.getElementById('friendlive');if(a)a.textContent=msg||'';const b=document.getElementById('frienderr');if(b)b.textContent=asErr?(msg||''):''}
function friendValidate(nick,d){
if(!nick)return '請輸入暱稱。';
if(nick.length>20)return '暱稱請在 20 字以內。';
if(/[@＠]/.test(nick)||/[A-Za-z][12]\d{8}/.test(nick)||/\d{8,}/.test(nick)||/身分證|護照|手機|電話|信箱|my\s*number|mynumber/i.test(nick))return '請只留暱稱，不要填電話、電子郵件、身分證字號或 My Number。';
if(!d.interests.size)return '請至少選一項資訊興趣，例如活動或志工。';
if(d.role==='partner'&&!d.tracks.size)return '參與夥伴請至少選一項任務。';
return '';
}
function friendToggle(kind,key){
friendSync();
const set=kind==='i'?friendDraft().interests:friendDraft().tracks;
set.has(key)?set.delete(key):set.add(key);
friendRender(kind==='i'?'fi-'+key:'ft-'+key);
}
function friendRole(role){friendSync();friendDraft().role=role;friendRender(role==='partner'?'role-partner':'role-general')}
function friendEdit(){editing=true;draft=null;friendRender('fnick')}
function friendBecomePartner(){editing=true;friendDraft().role='partner';friendRender('ft-farmwork')}
function friendSave(ev){
ev.preventDefault();
friendSync();
const d=friendDraft();
const nick=d.nick.trim();
const err=friendValidate(nick,d);
if(err){setLive(err,true);const i=document.getElementById('fnick');if(i)i.focus();return}
S.f={nick,role:d.role,interests:INTERESTS.map(x=>x.k).filter(k=>d.interests.has(k)),tracks:d.role==='partner'?FT.map(x=>x.k).filter(k=>d.tracks.has(k)):[],d:(S.f&&S.f.d)||new Date().toLocaleDateString('zh-TW'),no:(S.f&&S.f.no)||('DF-'+String(Date.now()).slice(-6))};
editing=false;draft=null;
done('friend_basic',false);
save();render();friendRender('friendcard');
setLive('已存在這台裝置，沒有傳送到任何地方。');
}
function friendJoin(key){
if(!S.f||S.f.role!=='partner'||!S.f.tracks.includes(key))return;
if(S.log.length>=30){setLive('本機示範紀錄最多 30 筆。可以先清除再勾記。');return}
const task=FT.find(t=>t.k===key);
S.log.push({k:key,h:task.h,at:Date.now()});
done('friend_partner',false);
if(friendHours()>=4)done('friend_hours',false);
save();render();friendRender();
setLive('已在本機記下「'+task.n+'」'+fmtH(task.h)+' 小時。沒有傳送，也不是真成效。');
}
function friendMap(id){show(id);const el=document.getElementById('map');if(el)el.scrollIntoView({behavior:'auto',block:'center'})}
function friendAskClear(){friendRender(null,true);const y=document.getElementById('friend-clear-yes');if(y)y.focus()}
function friendDoClear(){
S.f=null;S.log=[];
['friend_basic','friend_partner','friend_hours'].forEach(k=>delete S.t[k]);
draft=null;editing=false;
save();render();friendRender('fnick');
setLive('已清除這台裝置上的大埤之友示範資料。沒有傳送到任何地方。');
}
function friendRender(focusId,ask){
friendSanitize();
friendSync();
const app=$('friendapp');
if(!app)return;
let html='';
if(!S.f||editing){
const d=friendDraft();
html=`<form id="fform"><label for="fnick"><b>暱稱</b> <span class="small">不必用真名，也不必住在大埤</span></label>
<input id="fnick" maxlength="20" autocomplete="off" placeholder="例如：芥菜友" value="${esc(d.nick)}">
<p id="frienderr" class="err"></p>
<b>一般登錄：想看哪類示範資訊</b>
<div class="chips" role="group" aria-label="資訊興趣">${INTERESTS.map(i=>`<button type="button" class="chip ${d.interests.has(i.k)?'on':''}" id="fi-${i.k}" aria-pressed="${d.interests.has(i.k)}" onclick="friendToggle('i','${i.k}')">${i.n}</button>`).join('')}</div>
<b>參與方式</b>
<div class="chips" role="radiogroup" aria-label="參與方式">
<button type="button" class="chip ${d.role==='general'?'on':''}" id="role-general" role="radio" aria-checked="${d.role==='general'}" onclick="friendRole('general')">一般登錄</button>
<button type="button" class="chip ${d.role==='partner'?'on':''}" id="role-partner" role="radio" aria-checked="${d.role==='partner'}" onclick="friendRole('partner')">參與夥伴</button></div>
${d.role==='partner'?`<b>參與夥伴任務（可複選）</b><div class="chips" role="group" aria-label="任務類型">${FT.map(t=>`<button type="button" class="chip ${d.tracks.has(t.k)?'on':''}" id="ft-${t.k}" aria-pressed="${d.tracks.has(t.k)}" onclick="friendToggle('t','${t.k}')">${t.n}</button>`).join('')}</div><p class="small">選了任務還沒按下「記下一次示範參與」之前，服務時數仍是 0。</p>`:'<p class="small">一般登錄只看活動、志工等示範資訊。想做農務、長者數位陪伴、地方產業或專業諮詢，請改選參與夥伴。</p>'}
<button type="submit" id="friend-submit">${S.f?'更新本機示範資料':'存在這台裝置'}</button>
${S.f?'<button type="button" id="friend-cancel" onclick="editing=false;draft=null;friendRender(\'friendcard\')">取消修改</button>':''}
<p class="small">可以用 Tab 移動，Enter 或空白鍵按下按鈕。資料不會送出。</p></form>`;
}else{
const f=S.f;
const ins=f.interests.map(k=>INTERESTS.find(i=>i.k===k)).filter(Boolean);
const tracks=f.role==='partner'?f.tracks.map(k=>FT.find(t=>t.k===k)).filter(Boolean):[];
html=`<div class="pass" id="friendcard" tabindex="-1"><div>大埤之友示範證 <span class="tag">民間示範</span></div><div class="no">${esc(f.no)}</div><div>${f.role==='partner'?'參與夥伴':'一般登錄'} · ${esc(f.nick)}</div><div class="small">興趣：${ins.map(i=>i.n).join('、')||'—'}</div><div class="small">登錄日 ${esc(f.d)} · 只在這台裝置</div><div class="stamp">非鄉公所 · 非戶籍 · 無投票權 · 非法定居民 · 不承諾福利</div></div>
<div class="friendactions"><button type="button" id="friend-edit" onclick="friendEdit()">修改興趣或角色</button></div>
<h3>依興趣整理的示範資訊 <span class="tag">不會寄出</span></h3>
${ins.map(i=>`<div class="taskcard"><b>${i.n}</b><br>${i.d}</div>`).join('')||'<p class="small">尚未選興趣。</p>'}
${f.role==='partner'?`<h3>參與夥伴任務 <span class="tag">本機勾記</span></h3>${tracks.map(t=>`<div class="taskcard"><b>${t.n}</b> · 示範 ${fmtH(t.h)} 小時<br>${t.d}<div class="friendactions"><button type="button" id="join-${t.k}" onclick="friendJoin('${t.k}')">記下一次示範參與</button><button type="button" id="map-${t.k}" onclick="friendMap('${t.b}')">看地圖上的${t.bn}</button></div></div>`).join('')}`:`<p class="small">目前是一般登錄，只看示範資訊。若要做農務、長者數位陪伴、地方產業或專業諮詢，可改為參與夥伴。</p><button type="button" id="become-partner" onclick="friendBecomePartner()">改為參與夥伴</button>`}`;
}
app.innerHTML=html;
const form=document.getElementById('fform');
if(form)form.onsubmit=friendSave;
const hours=friendHours();
$('friendmetrics').innerHTML=`<div><span>${S.f?1:0}</span>本機登錄（筆）</div><div><span>${S.log.length}</span>本機實際參與（次）</div><div><span>${fmtH(hours)}</span>本機服務時數（小時）</div>`;
$('friendlog').innerHTML=S.log.length?[...S.log].reverse().map(x=>{const t=FT.find(i=>i.k===x.k);const when=new Date(x.at).toLocaleString('zh-TW',{hour12:false});return `<li>${when}　${t?t.n:'任務'}　${fmtH(+x.h||0)} 小時<span class="small">　本機勾記，非實際出勤，未傳送</span></li>`}).join(''):'<li class="small">還沒有參與紀錄。只登錄不會產生時數。</li>';
const can=!!(S.f||S.log.length||S.t.friend_basic||S.t.friend_partner||S.t.friend_hours);
$('friendclear').innerHTML=!can?'<p class="small">目前沒有可清除的大埤之友資料。</p>':(ask?`<p><b>確定清除？</b>只刪這台裝置上的大埤之友登錄、任務勾記與相關徽章。不會傳送，也沒有伺服器資料可刪。虛擬鄉民證、共識牆和地圖參觀徽章會留著。</p><button type="button" id="friend-clear-yes" onclick="friendDoClear()">確定清除</button> <button type="button" id="friend-clear-no" onclick="friendRender('friend-clear')">取消</button>`:`<button type="button" id="friend-clear" onclick="friendAskClear()">清除本機大埤之友示範資料</button><p class="small">清除不會對任何單位送出資料。</p>`);
if(focusId){const el=document.getElementById(focusId);if(el)el.focus()}
}
friendRender();
