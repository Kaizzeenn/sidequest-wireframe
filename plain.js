/* Plain edition uses the original SIDEQUEST accounts, records, and workflows. */
(function(){
'use strict';
document.body.classList.add('plain-ui');
Object.assign(CATEGORY_ICONS,{'Accessibility & Mobility':'A','Cleanliness & Sanitation':'C','Public Infrastructure':'I','Public Transport Access':'T','Other Public-Space Concern':'+'});
const shortNames=['Access','Cleanliness','Infrastructure','Transport'];
homePage=function(){
 const featured=(state.reports||[]).filter(r=>PUBLIC_STAT.includes(r.status));
 const first=featured[0],xp=state.user?.xp||0;
 return `<div class="page"><section class="plain-home"><div class="plain-intro"><h1>Explore your<br>neighborhood</h1><p>Report public-space concerns around Taft–Vito Cruz and follow what happens next.</p><button class="btn" data-go="report">Report an issue</button><button class="btn btn-white" data-go="explore">Explore the area map</button><p class="small muted">Check existing concerns before creating a new report.</p></div><div>${mapHTML('homeMap')}${mapLegend()}</div><section class="plain-issue"><h2>Reported concern</h2>${first?`<h3>${safe(first.title)}</h3>${status(first.status)}<p class="small muted">${safe(first.landmark)}</p><p class="small">${safe(first.description)}</p><button class="btn btn-white" data-issue="${first.id}">View details</button><button class="btn btn-white" data-confirm="${first.id}">I experienced this too</button>`:'<p>No reviewed public concerns yet. New reports appear after review.</p>'}</section></section><h2 class="plain-section-title">Issue categories</h2><section class="plain-categories" aria-label="Browse by issue category">${DEMO_CATS.slice(0,4).map((category,i)=>`<button type="button" data-plain-category="${i}"><span class="plain-category-index">${['A','C','I','T'][i]}</span>${shortNames[i]}</button>`).join('')}</section><h2 class="plain-section-title">Your participation</h2><section class="plain-summary"><div><h3>XP after coordinator verification</h3><p class="small muted">Verified new report: +20 XP. Approved confirmation: +10 XP. Recognition does not determine report priority.</p></div><div>${state.user?`<strong>${fmt(xp)} XP · Level ${Math.floor(xp/100)+1}</strong><button class="btn btn-white btn-small" data-go="activity" style="margin-top:10px">My Activity</button>`:'<button class="btn btn-white" data-plain-login>Log in / Create account</button>'}</div></section>${featured.length?`<section aria-label="Recent reviewed concerns"><h2 class="plain-section-title">Recent concerns</h2><div class="plain-example-list">${featured.slice(0,3).map(r=>`<button data-issue="${r.id}"><strong>${safe(r.title)}</strong><small>${safe(r.landmark)}</small><small>${safe(STATUS_LABELS[r.status])} · ${r.confirmations||0} approved confirmations</small></button>`).join('')}</div></section>`:''}</div>`;
};
document.addEventListener('click',async event=>{
 const category=event.target.closest('[data-plain-category]');
 if(category){state.filters.category=DEMO_CATS[Number(category.dataset.plainCategory)]||'';state.filters.zone='';state.filters.search='';await go('explore');return}
 if(event.target.closest('[data-plain-login]')){welcomeMode('login');welcomeShown(true)}
});
// Update a first render that may have completed before the plain module loaded.
if(state.boot&&state.page==='home')render().catch(err=>notify(err.message,true));
})();
