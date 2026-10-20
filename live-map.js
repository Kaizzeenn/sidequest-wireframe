/* SIDEQUEST V13: real street geometry; report data remains a local classroom demo. */
(function(){
'use strict';
const CENTER=[14.56349,120.99465];
const BOUNDS=[[14.552,120.985],[14.574,121.003]];
const PLACES=[
 ['Vito Cruz LRT access',14.56349,120.99465],
 ['Benilde–DLSU corridor',14.56398,120.99517],
 ['Ocampo side streets',14.56094,120.99520],
 ['Arellano–Taft link',14.56817,120.99365],
 ['Rizal Memorial area',14.56096,120.99093]
];
const maps=new Map(),views=new Map();
const escape=s=>safe(String(s??''));
let renderBusy=false,refreshQueued=false;
function inPilot(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=BOUNDS[0][0]&&lat<=BOUNDS[1][0]&&lng>=BOUNDS[0][1]&&lng<=BOUNDS[1][1]}
function reportLocation(r){
 if(r.lat!==null&&r.lng!==null&&r.lat!==''&&r.lng!==''&&inPilot(Number(r.lat),Number(r.lng)))return {point:[Number(r.lat),Number(r.lng)],approximate:false};
 const p=ZONE_LOC[r.zone];return p&&inPilot(p[0],p[1])?{point:p,approximate:true}:null;
}
function filterReports(reports){
 const val=id=>document.getElementById(id)?.value||'';
 const status=val('v11FilterStatus'),period=val('v11FilterDate'),sort=val('v11FilterSort');
 return reports.filter(r=>{
  if(!PUBLIC_STAT.includes(r.status))return false;
  if(state.filters.zone&&r.zone!==state.filters.zone)return false;
  if(state.filters.category&&r.category!==state.filters.category)return false;
  if(state.filters.search&&!`${r.title} ${r.description} ${r.landmark}`.toLowerCase().includes(state.filters.search.toLowerCase()))return false;
  if(state.page==='explore'){
   if(status&&r.status!==status)return false;
   if(sort==='oldest'&&['resolved','duplicate','rejected'].includes(r.status))return false;
   if(period==='week'&&Date.parse(r.updated)<Date.now()-7*86400000)return false;
   if(period==='month'&&Date.parse(r.updated)<Date.now()-30*86400000)return false;
  }
  return true;
 });
}
function visibleReports(){
 const pub=filterReports(state.reports||[]),ids=new Set(pub.map(r=>r.id));
 const pending=(state.mine?.reports||[]).filter(r=>!PUBLIC_STAT.includes(r.status)&&!ids.has(r.id)&&(!state.filters.zone||r.zone===state.filters.zone)&&(!state.filters.category||r.category===state.filters.category));
 return [...pub.map(r=>({r,private:false})),...pending.map(r=>({r,private:true}))];
}
mapHTML=function(id='mainMap',pick=false){
 const options=PLACES.map((p,i)=>`<option value="${i}">${escape(p[0])}</option>`).join('');
 return `<section class="sq-live-map" id="${escape(id)}" data-pick="${pick?'yes':'no'}" aria-label="Taft–Vito Cruz interactive street map">
  <div class="sq-map-toolbar"><label>Find a pilot landmark<select data-sq-map-place><option value="">Choose a place…</option>${options}</select></label><button type="button" data-sq-map-reset>Reset view</button>${pick?'<button type="button" data-sq-map-clear>Clear pin</button>':'<button type="button" data-sq-map-refresh>Refresh reports</button>'}</div>
  <p class="sq-map-boundary-label">Taft–Vito Cruz pilot area · Map movement and pins limited to this proposed coverage</p>
  <div class="sq-map-help"><details><summary>Map not loading?</summary><p>To show street tiles, open this HTML file using VS Code Live Server, or open a hosted copy with an internet connection. If you downloaded the full project ZIP, extract it and run START_SIDEQUEST.bat on Windows (Python 3 required). When opening the HTML file directly, you can still browse the report list and submit using an area and landmark. A pin without visible streets is not enough to confirm the exact location.</p><a href="https://www.openstreetmap.org/#map=16/14.56349/120.99465" target="_blank" rel="noopener">Open OpenStreetMap separately</a></details></div>
  <div class="sq-leaflet-canvas" id="${escape(id)}-canvas" aria-label="${pick?'Tap the map to choose a report location':'Street map with report markers'}"></div>
  <p class="sq-map-message" role="status" aria-live="polite">${pick?'Tap to select a point; drag the pin to adjust. Area and landmark are still required.':'Online street map · Sample report data in this browser. Dotted pins are your private pending reports.'}</p>
 </section>`;
};
function message(entry,text,error=false){const p=entry.host.querySelector('.sq-map-message');p.textContent=text;p.dataset.error=error?'yes':'no'}
function pickChanged(lat,lng){
 if(!inPilot(lat,lng)){notify('Choose a location inside the proposed Taft pilot area.',true);return false}
 state.pick={lat,lng};
 for(const e of maps.values())if(e.pick&&e.host.isConnected)drawPick(e);
 for(const id of ['pinSelected','pinSelectedMobile']){const el=document.getElementById(id);if(el)el.textContent=`Selected coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`}
 return true;
}
function drawPick(entry){
 if(entry.marker)entry.map.removeLayer(entry.marker);entry.marker=null;
 if(state.pick.lat===null||state.pick.lng===null||!inPilot(state.pick.lat,state.pick.lng))return;
 const icon=L.divIcon({className:'sq-picked-pin',html:'',iconSize:[18,18],iconAnchor:[9,9]});
 entry.marker=L.marker([state.pick.lat,state.pick.lng],{icon,draggable:true,keyboard:true,title:'Selected report location; drag to adjust'}).addTo(entry.map);
 entry.marker.on('dragend',()=>{const p=entry.marker.getLatLng();if(!pickChanged(p.lat,p.lng))drawPick(entry)});
 message(entry,`Selected: ${state.pick.lat.toFixed(6)}, ${state.pick.lng.toFixed(6)}. Check the landmark before submitting.`);
}
function drawReports(entry){
 entry.reports.clearLayers();
 for(const item of visibleReports()){
  const r=item.r,loc=reportLocation(r);if(!loc)continue;
  const icon=L.divIcon({className:'sq-report-pin'+(item.private?' sq-private-pin':''),html:`<span class="sq-pin-disc"><span>${escape(CATEGORY_ICONS[r.category]||'•')}</span></span>`,iconSize:[42,48],iconAnchor:[21,43],popupAnchor:[0,-37]});
  const marker=L.marker(loc.point,{icon,keyboard:true,title:`${item.private?'My private report: ':''}${r.title}${loc.approximate?' (area approximate)':''}`});
  const popup=document.createElement('div');popup.className='sq-map-popup';
  popup.innerHTML=`<strong>${escape(r.title)}</strong><p>${escape(r.landmark)}</p><p>${escape(STATUS_LABELS[r.status]||r.status)}</p><small>${item.private?'Private: visible only to you until review.':`${Number(r.confirmations)||0} approved confirmations`}</small><small>${loc.approximate?'Area-level location: no pin was submitted.':'Reporter/sample coordinates; not independently verified.'}</small><button type="button">View report details</button>`;
  popup.querySelector('button').addEventListener('click',()=>openIssue(r.id));
  marker.bindPopup(popup).addTo(entry.reports);
 }
}
function dispose(id,entry){
 try{views.set(id,{center:entry.map.getCenter(),zoom:entry.map.getZoom()});entry.observer?.disconnect();entry.map.remove()}catch(_){}
 maps.delete(id);
}
function lockViewport(map){
 // inside=true chooses the minimum zoom at which the viewport fits INSIDE coverage.
 // This differs from fitBounds, which can expose large areas outside the pilot.
 const size=map.getSize();if(!size.x||!size.y)return;
 const minimum=Math.min(19,Math.max(14,map.getBoundsZoom(BOUNDS,true)));
 map.setMinZoom(minimum);
 if(map.getZoom()<minimum)map.setZoom(minimum,{animate:false});
 map.panInsideBounds(BOUNDS,{animate:false});
}
initMaps=function(){
 // The base app may finish its first asynchronous render before external scripts load.
 // Upgrade those already-rendered maps without replacing form fields or drafts.
 document.querySelectorAll('.restored-map').forEach(host=>{host.outerHTML=mapHTML(host.id,host.dataset.pick==='yes')});
 for(const [id,entry]of maps)if(!entry.host.isConnected||document.getElementById(id)!==entry.host)dispose(id,entry);
 if(!window.L){document.querySelectorAll('.sq-map-message').forEach(p=>{p.textContent='Map library unavailable. Reload the complete extracted project; reporting by area and landmark still works.';p.dataset.error='yes'});return}
 document.querySelectorAll('.sq-live-map').forEach(host=>{
  const id=host.id;let e=maps.get(id);
  if(e){e.map.invalidateSize({pan:false});lockViewport(e.map);if(e.pick)drawPick(e);else drawReports(e);return}
  const canvas=host.querySelector('.sq-leaflet-canvas'),pick=host.dataset.pick==='yes';
  const map=L.map(canvas,{scrollWheelZoom:false,zoomControl:true,maxBounds:BOUNDS,maxBoundsViscosity:1,minZoom:14,maxZoom:19});
  const saved=views.get(id);map.setView(saved?.center||CENTER,saved?.zoom||16);
  lockViewport(map);
  L.rectangle(BOUNDS,{color:'#286148',weight:3,dashArray:'7 5',fill:false,interactive:false}).addTo(map);
  e={map,host,pick,reports:L.layerGroup().addTo(map),marker:null};maps.set(id,e);
  // Visible attribution, normal browser caching, no tile prefetching or offline download.
  // file:// cannot supply a valid HTTP Referer. Do not request tiles in that mode.
  const hosted=['http:','https:'].includes(window.location.protocol);
  if(!hosted){
   message(e,'Street map paused: this page was opened as a local file. Use VS Code Live Server for street tiles, or use START_SIDEQUEST.bat included in the full project ZIP. Reports and manual location entry still work.',true);
   host.querySelector('.sq-map-help details').open=true;
  }
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,noWrap:true,bounds:BOUNDS,referrerPolicy:'strict-origin-when-cross-origin',attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'});
  let errors=0,loaded=0;
  tiles.on('tileerror',()=>{errors++;if(errors>=3&&!loaded){message(e,'Street tiles could not load or the provider blocked access. Open “Map not loading?” above. Reports remain available in the list.',true);host.querySelector('.sq-map-help details').open=true}});
  tiles.on('tileload',()=>{loaded++;if(host.querySelector('.sq-map-message').dataset.error==='yes')message(e,pick?'Tap the map to select a point.':'Online street map · Browser-local sample reports.')});
  if(hosted)tiles.addTo(map);
  host.querySelector('[data-sq-map-place]').addEventListener('change',event=>{if(event.target.value==='')return;const p=PLACES[Number(event.target.value)];if(p)map.setView([p[1],p[2]],18)});
  host.querySelector('[data-sq-map-reset]').addEventListener('click',()=>{map.setView(CENTER,Math.max(16,map.getMinZoom()));lockViewport(map);host.querySelector('select').value=''});
  if(pick){
   map.on('click',event=>pickChanged(event.latlng.lat,event.latlng.lng));drawPick(e);
   host.querySelector('[data-sq-map-clear]').addEventListener('click',()=>{state.pick={lat:null,lng:null};for(const v of maps.values())if(v.pick){drawPick(v);message(v,'No map pin selected. Area and landmark entry are still available.')}for(const key of ['pinSelected','pinSelectedMobile']){const n=document.getElementById(key);if(n)n.textContent='No pin selected'}});
  }else{drawReports(e);host.querySelector('[data-sq-map-refresh]').addEventListener('click',()=>refreshLocal(true))}
  if(window.ResizeObserver){e.observer=new ResizeObserver(()=>{if(host.isConnected){map.invalidateSize({pan:false});lockViewport(map)}});e.observer.observe(canvas)}
  map.on('moveend',()=>views.set(id,{center:map.getCenter(),zoom:map.getZoom()}));
 });
};
// The old illustrated-landmark handler lives inside V11; intercept only that control.
document.addEventListener('click',event=>{
 if(!event.target.closest('#v11JumpLandmark'))return;
 event.preventDefault();event.stopImmediatePropagation();
 const q=document.getElementById('v11LandmarkFind')?.value.trim().toLowerCase();
 const aliases=[['LRT-1 Vito Cruz Station',14.56349,120.99465],['Benilde Taft Campus',14.56399,120.99523],['DLSU Manila',14.56448,120.99385],['Pablo Ocampo Street (Vito Cruz)',14.56094,120.99520],['Rizal Memorial Sports Complex',14.56096,120.99093],['Taft Avenue crossing',14.56361,120.99483],['Ocampo–Taft Junction',14.56093,120.99519],['Arellano–Taft corner',14.56817,120.99365],...PLACES];
 const found=aliases.find(p=>p[0].toLowerCase()===q);
 if(!found){notify('Choose a listed Taft landmark.',true);return}
 const e=maps.get('v11ExploreMap');if(!e){notify('Switch to map view to locate this landmark.');return}
 e.map.setView([found[1],found[2]],18);L.popup().setLatLng([found[1],found[2]]).setContent(escape(found[0])+' — approximate landmark reference').openOn(e.map);
},true);
const originalRender=render;
render=async function(){
 renderBusy=true;
 try{return await originalRender.apply(this,arguments)}finally{renderBusy=false;if(refreshQueued){refreshQueued=false;refreshLocal(false)}}
};
async function refreshLocal(manual=false){
 if(renderBusy){refreshQueued=true;return}
 // Never replace an unsent form or an active modal when another tab changes data.
 if(state.page==='report'||!document.getElementById('overlay')?.classList.contains('hidden')){
  memDB=null;if(manual)notify('Updates are available. Finish your current action first.');return;
 }
 try{
  memDB=null;await refreshBoot();await render();
  if(state.page==='track'&&state.currentReport)await doTrack(state.currentReport.ref);
  if(manual)notify('Map refreshed from this browser’s saved reports.');
 }catch(error){if(manual)notify('Could not refresh reports: '+error.message,true)}
}
window.addEventListener('storage',event=>{if(event.key===DB_KEY)refreshLocal(false)});
window.addEventListener('online',()=>{for(const e of maps.values())e.map.eachLayer(layer=>{if(layer instanceof L.TileLayer)layer.redraw()})});
// Small public testing surface; no report payloads or private identities are exposed here.
window.SIDEQUEST_MAP={inPilot,reportLocation,filterReports,lockViewport,refresh:()=>refreshLocal(true)};
 initMaps();
})();
