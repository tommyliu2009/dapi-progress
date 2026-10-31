const B=[
{id:'gov',n:'鄉政公告',e:'🏛️',x:400,y:150,c:'#e0b04a',p:72,d:'AI 每天整理公所公告，自動改寫成白話、長輩版大字與語音，推播到 LINE。'},
{id:'sub',n:'補助申請',e:'📝',x:600,y:250,c:'#5aa0e0',p:55,d:'鄉民問「我能申請什麼補助？」AI 依身分與產業比對中央與縣府補助，產生申請清單與文件檢核。'},
{id:'farm',n:'酸菜農產',e:'🥬',x:200,y:250,c:'#6fbf4a',p:64,d:'芥菜與酸菜產銷：AI 彙整天氣、行情，提醒農友採收與醃漬時程，協助小農上架電商。'},
{id:'care',n:'長照關懷',e:'🧓',x:400,y:330,c:'#e07a7a',p:41,d:'AI 協助志工排班送餐、整理關懷訪視紀錄，異常狀況立即提醒社工（個資不離開機構）。'},
{id:'tour',n:'觀光導覽',e:'🗺️',x:600,y:410,c:'#b07ae0',p:48,d:'AI 導覽員：依停留時間推薦路線、宗教文化地圖與在地小吃，鄉民打卡集章。'},
{id:'env',n:'環境守護',e:'♻️',x:200,y:410,c:'#4ac0b0',p:37,d:'鄉民拍照回報路燈、垃圾、積水，AI 自動分類、定位並追蹤處理進度。'}];
const S=JSON.parse(localStorage.getItem('dapi')||'{"r":null,"t":{},"v":{}}');const save=()=>localStorage.setItem('dapi',JSON.stringify(S));
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
$('map').querySelectorAll('.bld').forEach(el=>{const f=()=>show(el.dataset.id);el.onclick=f;el.onkeydown=e=>{if(e.key==='Enter')f()}})}
function show(id){const b=B.find(x=>x.id===id);document.querySelectorAll('.bld').forEach(e=>e.classList.toggle('sel',e.dataset.id===id));
$('panel').innerHTML=`<b>${b.e} ${b.n}</b> <span class="tag">示範資料</span><br>${b.d}<div class="bar"><i style="width:${b.p}%"></i></div>建置進度 ${b.p}%`;
done('visit_'+id,false);if(B.every(x=>S.t['visit_'+x.id]))done('all');render()}
const T=[{k:'reg',n:'登記成為虛擬鄉民',b:'🪪 新鄉民'},{k:'visit_farm',n:'參觀酸菜農產站',b:'🥬 酸菜之友'},{k:'all',n:'走遍六棟 AI 建築',b:'🧭 探險家'},{k:'vote',n:'在共識牆表態一次',b:'🗳️ 發聲者'},{k:'trip',n:'實地造訪大埤（自行勾選）',b:'🚲 回鄉人',m:1}];
function done(k,r=true){if(!S.t[k]){S.t[k]=Date.now();save()}if(r)render()}
function render(){const r=S.r;$('regbox').innerHTML=r?`<div class="rcard"><div>大埤虛擬鄉民證 <span class="tag">示範</span></div><div class="no">No. ${r.no}</div><div>暱稱：${esc(r.nick)}</div><div>認同村：${esc(r.v)}</div><div class="small" style="color:#4a5a3a">登記日 ${r.d}</div></div><button onclick="if(confirm('確定刪除本機的鄉民證？')){S.r=null;delete S.t.reg;save();render()}" style="margin-top:8px;background:#ccc">刪除</button>`:
`<input id="nick" maxlength="20" placeholder="你的暱稱"><select id="vil" style="width:100%;padding:10px;border-radius:6px">${'三結,北鎮,松竹,南和,聯美,大德,吉田,怡然,嘉興,豐田,北和,西鎮,尚義,興安,豐岡'.split(',').map(v=>`<option>${v}村</option>`).join('')}</select><button style="width:100%;margin-top:6px" onclick="reg()">領取鄉民證</button>`;
$('tasks').innerHTML=T.map(t=>`<li class="${S.t[t.k]?'done':''}"><span>${S.t[t.k]?'✅':'⬜'} ${t.n}</span><span>${S.t[t.k]?t.b:(t.m?`<button onclick="done('trip')">我去過了</button>`:'🔒')}</span></li>`).join('');
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
