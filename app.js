'use strict';
(() => {
const $=(id)=>document.getElementById(id);
const pageNames=['overview','requirements','kinematics','cad','analysis','manufacturing'];
const links=[...document.querySelectorAll('.nav-link')];
const pages=[...document.querySelectorAll('.page')];
const menu=$('menuToggle');
const side=document.querySelector('.sidebar');
function go(name,replace=false){
 if(!pageNames.includes(name)) name='overview';
 pages.forEach(el=>{el.classList.toggle('active',el.id===`page-${name}`);el.hidden=el.id!==`page-${name}`});
 links.forEach(el=>{const active=el.dataset.page===name;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
 side.classList.remove('open'); menu.setAttribute('aria-expanded','false');
 if(location.hash!==`#${name}`){if(replace)history.replaceState(null,'',`#${name}`);else history.pushState(null,'',`#${name}`)}
 window.scrollTo({top:0,behavior:'instant'});
}
links.forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
menu.setAttribute('aria-expanded','false');menu.addEventListener('click',()=>{const opening=!side.classList.contains('open');side.classList.toggle('open',opening);menu.setAttribute('aria-expanded',String(opening))});
window.addEventListener('hashchange',()=>go(location.hash.substring(1),true));
go(location.hash.substring(1),true);
// Click to enlarge original technical illustrations
const box=$('lightbox'),large=$('lightboxImage'),close=$('closeLightbox');let lastFocus=null;
function enlarge(src,alt){if(!src)return;lastFocus=document.activeElement;large.src=src;large.alt=alt||'Figure technique';box.hidden=false;document.body.style.overflow='hidden';close.focus()}
function hide(){box.hidden=true;large.removeAttribute('src');document.body.style.overflow='';lastFocus?.focus?.()}
document.querySelectorAll('img[data-lightbox]').forEach(im=>{im.tabIndex=0;im.setAttribute('role','button');im.setAttribute('aria-label',`${im.alt}. Agrandir la figure`);im.addEventListener('click',()=>enlarge(im.getAttribute('src'),im.alt));im.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();enlarge(im.getAttribute('src'),im.alt)}})});
document.querySelectorAll('.drawing[data-image]').forEach(btn=>btn.addEventListener('click',()=>enlarge(btn.dataset.image,btn.querySelector('img')?.alt)));
close.addEventListener('click',hide);box.addEventListener('click',e=>{if(e.target===box)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!box.hidden)hide()});
// Filter the CATIA drawings without modifying their underlying content
const drawings=[...document.querySelectorAll('#cadGallery .drawing')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;drawings.forEach(x=>{x.hidden=value!=='all'&&x.dataset.kind!==value});document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===button))}));
// Fixed technical facts; tabs only change which source visualization and explanation are displayed.
const results={
 stress:{src:'assets/contraintes_von_mises.webp',alt:'Distribution de contraintes de Von Mises sous 4 000 N',caption:'Champ de contraintes · Charge statique 4 000 N',type:'CHARGE STATIQUE',heading:'Contrainte de Von Mises',description:'Une contrainte nominale de 360 MPa est retenue dans les bielles, après distinction d’un pic de contact interprété comme une singularité numérique. Cette interprétation demande une justification de convergence et des conditions de contact.',load:'4 000 N',value:'360 MPa',factor:'S ≈ 2,44 (calcul)'},
 detail:{src:'assets/detail_contraintes.webp',alt:'Vue rapprochée des contraintes au niveau des biellettes et pivots',caption:'Contraintes locales · Biellettes et axes de pivot',type:'ANALYSE LOCALE',heading:'Zones de concentration',description:'Le modèle indique des zones plus sollicitées au voisinage des pivots. Le comportement réel dépend des ajustements, jeux, frottements et conditions de contact, à vérifier avant une réalisation physique.',load:'4 000 N',value:'Zones de pivot',factor:'Contrôles à poursuivre'},
 displacement:{src:'assets/deplacements_structurels.webp',alt:'Déplacements structurels calculés sur l’assemblage',caption:'Déplacements calculés · Simulation statique',type:'DÉFORMATION CALCULÉE',heading:'Déplacement structurel',description:'Le déplacement maximal annoncé atteint 0,25 mm dans le modèle. La rigidité doit être confrontée à des mesures et aux jeux de liaison sur un prototype.',load:'4 000 N',value:'0,25 mm',factor:'Modèle numérique uniquement'}
};
document.querySelectorAll('[data-analysis]').forEach(b=>b.addEventListener('click',()=>{const r=results[b.dataset.analysis];$('analysisImage').src=r.src;$('analysisImage').alt=r.alt;$('analysisCaption').textContent=r.caption;$('analysisType').textContent=r.type;$('analysisHeading').textContent=r.heading;$('analysisDescription').textContent=r.description;$('analysisLoad').textContent=r.load;$('analysisValue').textContent=r.value;$('analysisFactor').textContent=r.factor;document.querySelectorAll('[data-analysis]').forEach(x=>{const sel=x===b;x.classList.toggle('active',sel);x.setAttribute('aria-selected',String(sel))})}));
// Exact geometric closure of an illustrative planar 4R with nominal link lengths.
// Note: input angle is NOT the anatomical knee flexion or a reproduction of the published angle table.
const NS='http://www.w3.org/2000/svg';
const L={AB:35.5,BC:21.4,DC:45.7,AD:28.3,tilt:5*Math.PI/180};
const input=$('position'),play=$('playMechanism');let running=false,frameId=0,lastFrame=0,direction=1;
const A={x:0,y:0},D={x:L.AD*Math.cos(L.tilt),y:L.AD*Math.sin(L.tilt)};
const world={xmin:-85,xmax:110,ymin:-27,ymax:100};
function xy(p){return {x:(p.x-world.xmin)/(world.xmax-world.xmin)*600,y:(world.ymax-p.y)/(world.ymax-world.ymin)*385}}
function node(tag,attrs,parent){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));parent.appendChild(e);return e}
function link(parent,p,q,color,width,dash){const a=xy(p),b=xy(q);return node('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:color,'stroke-width':width,...(dash?{'stroke-dasharray':dash}:{})},parent)}
function pivot(parent,p,fill){const v=xy(p);node('circle',{cx:v.x,cy:v.y,r:6.3,fill:'#fff',stroke:fill,'stroke-width':2.7},parent)}
function label(parent,p,t,dx=10,dy=-12,cls=''){const v=xy(p),el=node('text',{x:v.x+dx,y:v.y+dy,class:cls},parent);el.textContent=t;return el}
function solve4R(theta){
 const B={x:L.AB*Math.cos(theta),y:L.AB*Math.sin(theta)};
 const dx=D.x-B.x,dy=D.y-B.y,d=Math.hypot(dx,dy);
 if(d<1e-9||d>L.BC+L.DC||d<Math.abs(L.DC-L.BC))return {B,valid:false};
 const a=(L.BC**2-L.DC**2+d**2)/(2*d),h=Math.sqrt(Math.max(0,L.BC**2-a**2));
 const M={x:B.x+(a/d)*dx,y:B.y+(a/d)*dy};
 const P={x:M.x+(-dy/d)*h,y:M.y+(dx/d)*h};
 const Q={x:M.x-(-dy/d)*h,y:M.y-(dx/d)*h};
 // Explicitly choose the upper assembly branch; may differ from the optimization's chosen branch.
 const C=P.y>Q.y?P:Q;
 const r={x:B.x-A.x,y:B.y-A.y},s={x:C.x-D.x,y:C.y-D.y};
 const cross=(p,q)=>p.x*q.y-p.y*q.x,den=cross(r,s);
 let I=null;if(Math.abs(den)>1e-8){const t=cross({x:D.x-A.x,y:D.y-A.y},s)/den;I={x:A.x+t*r.x,y:A.y+t*r.y}}
 return {B,C,I,valid:true,error:Math.abs(Math.hypot(C.x-B.x,C.y-B.y)-L.BC)+Math.abs(Math.hypot(C.x-D.x,C.y-D.y)-L.DC)};
}
function draw(percent){
 const g=$('mechanismLayer'),lb=$('labelsLayer'),grid=$('gridLayer');g.replaceChildren();lb.replaceChildren();grid.replaceChildren();
 for(let x=-75;x<110;x+=25){link(grid,{x,y:world.ymin},{x,y:world.ymax},'#e6eef1',1)}
 for(let y=-25;y<100;y+=25){link(grid,{x:world.xmin,y},{x:world.xmax,y},'#e6eef1',1)}
 const theta=(55+percent*.9)*Math.PI/180,ans=solve4R(theta);
 $('positionLabel').textContent=percent+' %';$('angleValue').textContent=(55+percent*.9).toFixed(1).replace('.',',')+'°';
 if(!ans.valid){$('closureValue').textContent='Impossible';$('cirX').textContent='—';$('cirY').textContent='—';return}
 const {B,C,I}=ans;
 link(g,A,D,'#294857',8);link(g,A,B,'#468caf',7);link(g,B,C,'#54a3b8',7);link(g,D,C,'#468caf',7);
 if(I){link(g,A,I,'#8badbc',1.5,'6 5');link(g,D,I,'#8badbc',1.5,'6 5');if(I.x>=world.xmin&&I.x<=world.xmax&&I.y>=world.ymin&&I.y<=world.ymax){const o=xy(I);node('circle',{cx:o.x,cy:o.y,r:7,fill:'#fff',stroke:'#268c80','stroke-width':3},g);label(lb,I,'CIR',11,-12,'small')} }
 [[A,'A'],[B,'B'],[C,'C'],[D,'D']].forEach(([p,n])=>{pivot(g,p,'#2c7189');label(lb,p,n)});
 label(lb,{x:-77,y:92},'Représentation géométrique · dimensions nominales',0,0,'small');
 $('closureValue').textContent=ans.error<1e-7?'Vérifiée':'À vérifier';
 $('cirX').textContent=I?I.x.toFixed(1).replace('.',',')+' mm':'À l’infini';
 $('cirY').textContent=I?I.y.toFixed(1).replace('.',',')+' mm':'À l’infini';
}
function stop(){running=false;cancelAnimationFrame(frameId);play.textContent='▶ Animer le mécanisme'}
function tick(time){if(!running)return;if(!lastFrame)lastFrame=time;const dt=Math.min(100,time-lastFrame);lastFrame=time;let pos=Number(input.value)+direction*dt*.025;if(pos>=100){pos=100;direction=-1}if(pos<=0){pos=0;direction=1}input.value=String(pos);draw(Math.round(pos));frameId=requestAnimationFrame(tick)}
input.addEventListener('input',()=>{stop();draw(Number(input.value))});
play.addEventListener('click',()=>{if(running){stop();return}running=true;lastFrame=0;play.textContent='❚❚ Arrêter';frameId=requestAnimationFrame(tick)});
$('resetMechanism').addEventListener('click',()=>{stop();input.value=0;direction=1;draw(0)});
draw(0);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});

// Actual tabulated kinematic values; the polyline is a visualization of discrete points,
// not a dynamic multibody solver and not a validated clinical knee-flexion trajectory.
const observations=[
 {a:0,x:-28.4,y:42.1},{a:11,x:-22.7,y:53.8},{a:22,x:-14.3,y:58.6},
 {a:33,x:-5.8,y:67.2},{a:44,x:3.6,y:74.8},{a:55,x:12.9,y:81.5},
 {a:88,x:38.5,y:92.4},{a:110,x:48.2,y:95.7}
];
const cirInput=$('cirStudyPosition'),chart=$('cirDataChart');
if(cirInput&&chart){
 const chNS='http://www.w3.org/2000/svg';
 const sx=(a)=>66+a/110*600,sy=(v)=>273-(v+40)/150*224;
 const svgEl=(tag,attr,parent)=>{const e=document.createElementNS(chNS,tag);for(const [k,v]of Object.entries(attr))e.setAttribute(k,v);parent.appendChild(e);return e;};
 const txt=(x,y,value,color='#758b96',anchor='middle')=>{const e=svgEl('text',{x,y,fill:color,'font-size':'12','text-anchor':anchor,'font-family':'Arial,sans-serif'},chart);e.textContent=value;return e};
 for(const val of [-40,0,40,80,110]){svgEl('line',{x1:66,y1:sy(val),x2:666,y2:sy(val),stroke:'#e5edef','stroke-width':'1'},chart);txt(55,sy(val)+4,val+'',' #758b96'.trim(),'end');}
 for(const val of [0,22,44,66,88,110]){svgEl('line',{x1:sx(val),y1:30,x2:sx(val),y2:273,stroke:'#eff3f5','stroke-width':'1'},chart);txt(sx(val),293,val+'°');}
 svgEl('line',{x1:66,y1:sy(0),x2:666,y2:sy(0),stroke:'#adc6ca','stroke-width':'1.7','stroke-dasharray':'5 4'},chart);
 txt(65,18,'Coordonnées CIR (mm)','#496879','start');txt(665,317,'Angle d’entrée','#496879','end');
 for(const [series,color]of [['x','#39789b'],['y','#238677']]){
   const coords=observations.map(o=>`${sx(o.a)},${sy(o[series])}`).join(' ');
   svgEl('polyline',{points:coords,fill:'none',stroke:color,'stroke-width':'3','stroke-linejoin':'round','stroke-linecap':'round'},chart);
   for(const v of observations){const pt=svgEl('circle',{cx:sx(v.a),cy:sy(v[series]),r:5,fill:'#fff',stroke:color,'stroke-width':'2'},chart);pt.setAttribute('aria-label',`${v.a} degrés: ${series} ${v[series]} millimètres`)}
 }
 const marker=svgEl('line',{x1:66,y1:28,x2:66,y2:273,stroke:'#b89a6d','stroke-width':'2','stroke-dasharray':'4 4'},chart);
 const loc=Intl.NumberFormat('fr-FR',{minimumFractionDigits:1,maximumFractionDigits:1});
 function selectObs(){const i=Number(cirInput.value),v=observations[i];$('cirStudyAngle').textContent=v.a+'°';$('cirStudyX').textContent=loc.format(v.x)+' mm';$('cirStudyY').textContent=loc.format(v.y)+' mm';$('cirStudyStatus').textContent=v.x<0?'Position postérieure':'Position antérieure';marker.setAttribute('x1',sx(v.a));marker.setAttribute('x2',sx(v.a));document.querySelectorAll('[data-cir-row]').forEach((row,k)=>row.classList.toggle('cir-selected',k===i));}
 cirInput.addEventListener('input',selectObs);selectObs();
}

})();
