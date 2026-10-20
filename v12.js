/* SIDEQUEST V12: progressive game rewards + original urban-inspired avatars.
   Browser-only classroom demo. External street view needs internet. */
(function(){
'use strict';
const $12=s=>document.querySelector(s);
const X12=safe;
const V12_TITLES=[
  {level:1,name:'New Explorer',desc:'Starting your journey'},
  {level:2,name:'Neighborhood Helper',desc:'Leaf profile frame'},
  {level:3,name:'Radar Scout',desc:'Sunrise profile frame'},
  {level:4,name:'Taft Keeper',desc:'Community recognition title'},
  {level:5,name:'Local Legend',desc:'Gold profile frame'},
  {level:6,name:'Rooftop Guardian',desc:'Rooftop profile frame'}
];
const V12_CITY=`<div class="v12-city-mark" aria-hidden="true"><svg viewBox="0 0 520 60" preserveAspectRatio="xMidYMax slice"><path d="M0 53V34h20v-15h27v25h23V13h22v9h15v23h25V7h25v11h13v27h25V17h24v26h34V23h16v21h35V3h28v22h18v20h28V20h28v27h18V9h32v35h15V29h20v24H0Z" fill="#c6d8c9"/><path d="M0 53V46h55v-8h21v8h43v-21h20v21h49v-13h16v13h48v-7h18v7h35V29h19v17h59v-12h16v12h55v-10h18v17H0Z" fill="#91b99c"/></svg></div>`;
const V12_AVATARS=[
 {id:'🌃',name:'Rooftop Watch',note:'The night lookout',coat:'#5c786b',hood:'#a7c7bb'},
 {id:'🧢',name:'Corner Scout',note:'The curious observer',coat:'#b78d6a',hood:'#d4af7b'},
 {id:'🥷',name:'Street Guardian',note:'The quiet helper',coat:'#79769a',hood:'#b7b3d1'}
];
function avatarArt(a){return `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="40" cy="37" r="29" fill="#f5f0e3"/><path d="M7 80c1-22 12-30 33-30s32 9 33 30" fill="${a.coat}"/><rect x="22" y="24" width="36" height="35" rx="17" fill="#dcad8a"/><path d="M22 39q-6-35 18-34 25-1 18 34c-10-12-26-14-36 0" fill="${a.hood}"/><path d="M31 43h4m10 0h4" stroke="#393a33" stroke-width="3" stroke-linecap="round"/><path d="M36 52q4 3 8 0" fill="none" stroke="#815e4c" stroke-width="2" stroke-linecap="round"/><path d="M27 24q13-10 26 0" stroke="#536b60" stroke-width="3" fill="none"/>${a.id==='🧢'?'<path d="M19 24q20-18 41 0l12 3q-25 7-52 0Z" fill="#a8795f"/>':''}${a.id==='🕶️'?'<path d="M24 39h32v9l-8 2-9-5-8 5-7-2Z" fill="#474754"/>':''}<path d="M12 83h56" stroke="#364f42" stroke-width="2"/></svg>`}
function level12(){const xp=Math.max(0,Number(state.user?.xp)||0);return {xp,level:Math.floor(xp/100)+1,bar:xp%100,next:100-(xp%100),nextTitle:V12_TITLES.find(t=>t.level===Math.floor(xp/100)+2)}}
const previousHome12=homePage;
homePage=function(){let html=previousHome12();const p=level12(),name=p.nextTitle?.name||'More milestones ahead';const panel=`<section class="v11-region v12-last-section" aria-label="How rewards work"><div class="v12-sidewalk-grid"><article class="v12-surface"><div class="v12-eyebrow">EXPLORER PROGRESS</div><h3>Your next neighborhood milestone</h3><div class="v12-milestone"><div class="v12-circle">${p.level}</div><div class="v12-progress"><strong>Level ${p.level} · ${name}</strong><span>${p.xp} total XP${state.user?'':' · sign in to keep your progress'}</span><span class="v12-meter"><i style="width:${p.bar}%"></i></span><span>${p.next} XP to your next level · +20 verified report / +10 verified confirmation</span></div></div><div class="v12-reward-list">${V12_TITLES.slice(1,5).map(t=>`<div class="v12-tier ${p.level>=t.level?'unlocked':''}"><strong>Level ${t.level}</strong><small>${X12(t.desc)}</small></div>`).join('')}</div><div class="v11-actions"><button class="v12-cta" data-v12-rewards>See all rewards and badges</button></div></article><article class="v12-surface"><div class="v12-eyebrow">NEIGHBORHOOD STORIES</div><h3>Find your explorer identity</h3><p>Three original street-level looks inspired by neighborhood guardian stories, without using licensed characters.</p><div class="v12-guardians">${V12_AVATARS.map(a=>`<button type="button" class="v12-guardian" data-v12-avatar="${a.id}" aria-label="Try ${X12(a.name)}" aria-pressed="${prefs().avatar===a.id}">${avatarArt(a)}<b>${X12(a.name)}</b><small>${X12(a.note)}</small></button>`).join('')}</div>${V12_CITY}<p class="v12-demo-caption">Your appearance does not affect reporting priority or administrator decisions.</p></article></div></section>`;
const existing=/<section class="v11-region v11-grid" aria-label="Community garden and neighborhood watch">[\s\S]*?<\/section>/;
if(existing.test(html)){const match=html.match(existing);const garden=match?.[0].match(/<article class="v11-sheet">[\s\S]*?<\/article>/)?.[0];html=html.replace(existing,garden?`<section class="v11-region v12-garden-summary" aria-label="Neighborhood garden">${garden}</section>`:'');}
return html.replace(/<\/div>\s*$/,panel+'\n</div>');
};
// Make the original guardian portraits usable in the existing profile styler.
const previousStyle12=v3Customize;
v3Customize=function(){previousStyle12();const holder=$12('.avatar-options');if(!holder)return;const gallery=document.createElement('div');gallery.className='v12-guardians v12-styler-characters';gallery.setAttribute('aria-label','Original neighborhood characters');V12_AVATARS.forEach(a=>{if(holder.querySelector(`[data-v3-avatar="${a.id}"]`))return;const button=document.createElement('button');button.type='button';button.className='v12-guardian'+(prefs().avatar===a.id?' active':'');button.dataset.v3Avatar=a.id;button.setAttribute('aria-label',a.name);button.setAttribute('aria-pressed',String(prefs().avatar===a.id));button.innerHTML=avatarArt(a)+`<b>${X12(a.name)}</b>`;gallery.append(button)});
const info=document.createElement('p');info.className='v12-demo-caption';info.textContent='Original neighborhood characters · cosmetic only.';holder.insertAdjacentElement('afterend',gallery);gallery.insertAdjacentElement('afterend',info);
};
// Rewards remain linked to coordinator verification and are not tied to report volume or priority.
const previousRewards12=profileContent;
profileContent=function(){let html=previousRewards12();if(state.profileTab!=='badges')return html;const {xp,level,bar,next}=level12();const display=V12_TITLES.find(t=>t.level===Math.min(level,6))||V12_TITLES[5];const milestone=`<div class="v12-compact-doc"><strong>What happens when you level up?</strong> Every 100 verified XP increases your level. A celebration announces your new title, and eligible profile frames become available to equip. XP is not cash, an official reward, or a priority service.<div class="v12-milestone"><div class="v12-circle">${level}</div><div class="v12-progress"><strong>${X12(display.name)} · ${xp} XP</strong><span class="v12-meter"><i style="width:${bar}%"></i></span><span>${next} XP until the next level. New report +20; approved confirmation +10. Daily cap 60 XP.</span></div></div><p class="v12-demo-caption">Missed, rejected, duplicate, and unverified submissions earn 0 XP. You do not have to participate in rewards to report.</p></div>`;
return milestone+html;
};
// V13 provides the integrated Leaflet street map in live-map.js.
// Small information panel in tracking: status progression readable even outside admin workflow.
const previousTrack12=trackDetails;
trackDetails=function(r){const html=previousTrack12(r);const plain=`<details class="v12-compact-doc" style="margin-top:15px"><summary><strong>What do these statuses mean?</strong></summary><div class="v12-checkpoint"><i class="v12-dot"></i><span><b>Under review:</b> coordinator checks the information</span></div><div class="v12-checkpoint"><i class="v12-dot"></i><span><b>Verified:</b> concern accepted as a valid case</span></div><div class="v12-checkpoint"><i class="v12-dot"></i><span><b>Referred:</b> proposed handoff recorded; acceptance is separate</span></div><div class="v12-checkpoint"><i class="v12-dot"></i><span><b>In progress:</b> documented action underway</span></div><div class="v12-checkpoint"><i class="v12-dot"></i><span><b>Resolved:</b> recorded resolution, with recheck available to the reporter</span></div></details>`;
return html.replace('<!--unlikely-track-anchor-->',plain).replace(/(<div class="v11-sheet" style="margin:17px 0">)/,plain+'$1');
};
// Use the existing verified report workflow; icon confirmation and animation are visual only.
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.v12Street!==undefined){/* Integrated map replaces the separate viewer. */b.textContent=$12('#v12StreetView')?'Hide real street map':'See real Vito Cruz streets';return}
 if(b.dataset.v12Rewards!==undefined){if(!state.user)return authModal('login');state.profileTab='badges';await go('activity');return}
 if(b.dataset.v12Avatar){if(!state.user)return authModal('login');savePrefs({avatar:b.dataset.v12Avatar});applyPrefs();await render();notify('Explorer appearance updated.');return}
});
})();
