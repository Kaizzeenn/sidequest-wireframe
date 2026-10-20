const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const {parseHTML}=require('linkedom');
const {document}=parseHTML('<html><body><main id="main"></main><div id="overlay" class="hidden"></div><p id="pinSelected"></p><p id="pinSelectedMobile"></p></body></html>');
const created=[];
class Layer {constructor(p,opts={}){this.point=p;this.options=opts;this.events={};this.items=[]}addTo(target){target.items.push(this);return this}on(n,f){this.events[n]=f;return this}bindPopup(p){this.popup=p;return this}clearLayers(){this.items=[]}getLatLng(){return {lat:this.point[0],lng:this.point[1]}}}
class Tile extends Layer{redraw(){this.redrawn=true}}
class MapView extends Layer {constructor(node,opts){super();this.node=node;this.opts=opts;created.push(this)}setView(point,zoom){this.center=Array.isArray(point)?{lat:point[0],lng:point[1]}:point;this.zoom=zoom;return this}getSize(){return {x:900,y:390}}getBoundsZoom(){return 17}setMinZoom(z){this.minZoom=z}getMinZoom(){return this.minZoom}setZoom(z){this.zoom=z}panInsideBounds(b){this.lockedBounds=b}getCenter(){return this.center}getZoom(){return this.zoom}invalidateSize(){this.resized=true}remove(){this.removed=true}removeLayer(x){this.items=this.items.filter(i=>i!==x)}eachLayer(f){this.items.forEach(f)}}
const events={},notes=[];
const ctx={document,console,Date,Map,Set,Number,window:null,location:{protocol:'http:'},ResizeObserver:class{observe(){}disconnect(){}},
 L:{map:(...a)=>new MapView(...a),tileLayer:(...a)=>new Tile(...a),layerGroup:()=>new Layer(),rectangle:(...a)=>new Layer(...a),divIcon:o=>o,marker:(...a)=>new Layer(...a),TileLayer:Tile,popup:()=>({setLatLng(){return this},setContent(){return this},openOn(){}})},
 state:{page:'home',reports:[],mine:null,filters:{zone:'',category:'',search:''},pick:{lat:null,lng:null}},
 safe:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'),
 PUBLIC_STAT:['verified','referred','in_progress','resolved','reopened'],ZONE_LOC:{Area:[14.56349,120.99465]},CATEGORY_ICONS:{Access:'A'},STATUS_LABELS:{verified:'Verified',submitted:'Submitted'},
 render:async()=>{},refreshBoot:async()=>{},doTrack:async()=>{},openIssue:id=>notes.push(id),notify:(...n)=>notes.push(n),memDB:{},DB_KEY:'demo',mapHTML:null,initMaps:null,
 addEventListener:(n,f)=>{events[n]=f}
};ctx.window=ctx;
vm.createContext(ctx);vm.runInContext(fs.readFileSync('live-map.js','utf8'),ctx);
let passes=0;function check(name,f){f();passes++;console.log('PASS',name)}
const pub={id:1,title:'A <script>bad()</script>',status:'verified',lat:14.56349,lng:120.99465,zone:'Area',category:'Access',landmark:'Vito Cruz',updated:new Date().toISOString(),confirmations:2};
const privateCase={...pub,id:2,title:'Private report',status:'submitted'};
check('coordinate validation rejects NaN and out-of-pilot points',()=>{assert(ctx.SIDEQUEST_MAP.inPilot(14.56349,120.99465));assert(!ctx.SIDEQUEST_MAP.inPilot(NaN,120.99));assert(!ctx.SIDEQUEST_MAP.inPilot(15,121))});
check('missing coordinates use explicitly approximate area location',()=>{assert.equal(ctx.SIDEQUEST_MAP.reportLocation({...pub,lat:null,lng:null}).approximate,true);assert.equal(ctx.SIDEQUEST_MAP.reportLocation({...pub,zone:'Unknown',lat:null,lng:null}),null)});
ctx.state.reports=[pub,privateCase];document.getElementById('main').innerHTML='<div id="homeMap" class="restored-map" data-pick="no"></div>';ctx.initMaps();
check('initial legacy map upgrades when external scripts arrive',()=>assert(document.querySelector('#homeMap.sq-live-map')));
check('panning uses a hard boundary lock',()=>assert.equal(created.at(-1).opts.maxBoundsViscosity,1));
check('minimum zoom keeps a wide viewport inside coverage',()=>{assert.equal(created.at(-1).minZoom,17);assert.equal(created.at(-1).zoom,17);assert(created.at(-1).lockedBounds)});
check('coverage rectangle is visible',()=>assert(created.at(-1).items.some(x=>x.options.dashArray==='7 5')));
check('public map excludes unreviewed report payloads',()=>{assert.equal(created.at(-1).items.find(x=>x.constructor===Layer&&x.point===undefined).items.length,1)});
check('popup escapes untrusted report titles and opens matching record',()=>{const marker=created.at(-1).items.find(x=>x.constructor===Layer&&x.point===undefined).items[0];assert(!marker.popup.querySelector('script'));marker.popup.querySelector('button').click();assert.equal(notes.at(-1),1)});
ctx.state.mine={reports:[privateCase]};ctx.initMaps();
check('signed-in reporter sees own pending report only',()=>{const markers=created.at(-1).items.find(x=>x.constructor===Layer&&x.point===undefined).items;assert.equal(markers.length,2);assert(markers[1].options.icon.className.includes('sq-private-pin'))});
ctx.state.mine=null;ctx.initMaps();check('sign-out removes private pending markers',()=>assert.equal(created.at(-1).items.find(x=>x.constructor===Layer&&x.point===undefined).items.length,1));
ctx.state.filters.category='Other';ctx.initMaps();check('category filter removes nonmatching markers',()=>assert.equal(created.at(-1).items.find(x=>x.constructor===Layer&&x.point===undefined).items.length,0));ctx.state.filters.category='';
const old=created.at(-1);document.getElementById('main').innerHTML=ctx.mapHTML('reportMap',true)+ctx.mapHTML('reportMapMobile',true);ctx.initMaps();
check('rerender disposes detached Leaflet instances',()=>assert.equal(old.removed,true));
let picks=created.slice(-2);picks[0].events.click({latlng:{lat:14.564,lng:120.995}});
check('click selection synchronizes desktop and mobile coordinates',()=>{assert.equal(ctx.state.pick.lat,14.564);assert(picks.every(p=>p.items.some(x=>x.options.draggable)));assert(document.getElementById('pinSelected').textContent.includes('14.564000'))});
const m=picks[0].items.find(x=>x.options.draggable);m.point=[14.566,120.996];m.events.dragend();
check('dragging updates persisted form location',()=>assert.equal(ctx.state.pick.lat,14.566));
document.querySelector('[data-sq-map-clear]').click();check('clear removes selected coordinates on both layouts',()=>{assert.equal(ctx.state.pick.lat,null);assert(picks.every(p=>!p.items.some(x=>x.options.draggable)))});
ctx.state.page='explore';const sel=document.createElement('input');sel.id='v11FilterStatus';sel.value='resolved';document.body.append(sel);check('status filter uses displayed Explore status',()=>assert.equal(ctx.SIDEQUEST_MAP.filterReports([pub]).length,0));
ctx.state.page='home';ctx.location.protocol='file:';
document.getElementById('main').innerHTML=ctx.mapHTML('fileMap');ctx.initMaps();
check('file URLs never request OSM tiles',()=>assert(!created.at(-1).items.some(x=>x instanceof Tile)));
check('file URLs display launcher instructions',()=>assert(document.querySelector('.sq-map-message').textContent.includes('START_SIDEQUEST.bat')));
ctx.location.protocol='http:';document.getElementById('main').innerHTML=ctx.mapHTML('httpMap');ctx.initMaps();
const tile=created.at(-1).items.find(x=>x instanceof Tile);
check('tile requests do not wrap or extend beyond coverage',()=>{assert.equal(tile.options.noWrap,true);assert(tile.options.bounds)});
check('HTTP tile requests retain normal origin referrer policy',()=>assert.equal(tile.options.referrerPolicy,'strict-origin-when-cross-origin'));
tile.events.tileerror();tile.events.tileerror();tile.events.tileerror();
check('repeated tile errors show help without automatic request loops',()=>{assert(document.querySelector('.sq-map-message').textContent.includes('blocked'));assert.equal(document.querySelector('.sq-map-help details').open,true)});
document.getElementById('main').innerHTML=ctx.mapHTML('reportMap',true)+ctx.mapHTML('reportMapMobile',true);ctx.initMaps();
ctx.state.page='report';ctx.memDB={stale:true};
(async()=>{await ctx.SIDEQUEST_MAP.refresh();check('cross-tab/manual refresh preserves unsent report form',()=>{assert.equal(document.querySelectorAll('.sq-live-map').length,2);assert.equal(ctx.memDB,null)});console.log(`${passes} map behavior checks passed (DOM + Leaflet test double; not browser rendering).`)})();
