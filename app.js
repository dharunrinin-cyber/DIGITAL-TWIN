const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const landing = $("#landing");
const app = $("#app");
const toast = $("#toast");
const modal = $("#modal");
const modalContent = $("#modalContent");

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function openModal(title, text, action){
  modalContent.innerHTML=`<h2>${title}</h2><p>${text}</p>${action?`<button class="primary-small" id="modalAction">${action}</button>`:""}`;
  modal.classList.remove("hidden");
  $("#modalAction")?.addEventListener("click",()=>{showToast("Action completed in prototype.");modal.classList.add("hidden")});
}
function startPrototype(){
  landing.classList.add("hidden");
  app.classList.remove("hidden");
  window.scrollTo(0,0);
  showToast("Recovery Digital Twin prototype loaded.");
}
$("#startBtn").addEventListener("click", startPrototype);
$("#demoBtn").addEventListener("click", startPrototype);

$("#prevBtn").addEventListener("click",()=>showToast("Previous track: Predictive Health Companion"));
$("#nextBtn").addEventListener("click",()=>showToast("Next track: AI Rehab Coach"));

function switchView(id){
  $$(".view").forEach(v=>v.classList.remove("active-view"));
  $(`#${id}`).classList.add("active-view");
  $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
  const titles={overview:"Recovery Overview",twin:"Recovery Digital Twin",plan:"Personalized Recovery Plan",monitor:"Live Health Monitoring",travel:"Travel Readiness",doctor:"Doctor Dashboard"};
  $("#pageTitle").textContent=titles[id]||"Recovery Overview";
  window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{switchView(btn.dataset.view);$(".sidebar")?.classList.remove("open")}));
$$("[data-goto]").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.goto)));

$("#menuBtn").addEventListener("click",()=>$(".sidebar").classList.toggle("open"));
$("#bellBtn").addEventListener("click",()=>openModal("No critical alerts","The AI monitoring engine has not detected any abnormal pattern. Your latest vitals remain within the personalized recovery range."));
$("#doctorMessage").addEventListener("click",()=>openModal("Message Doctor","Send a secure message to the care team about pain, medication, travel or rehabilitation.","Send Message"));
$("#videoBtn").addEventListener("click",()=>openModal("Doctor Video Call","This prototype simulates a secure teleconsultation entry point.","Join Call"));

$("#simulateUpdate").addEventListener("click",()=>{
  showToast("AI model updated — plan remains unchanged.");
  const btn=$("#simulateUpdate"); btn.textContent="AI Updated ✓";
  setTimeout(()=>btn.textContent="Run AI Update",1800);
});

$$(".day-tabs button").forEach((b,i)=>b.addEventListener("click",()=>{
  $$(".day-tabs button").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  showToast(`Loaded recovery plan for ${["Day 1","Day 3","Day 7","Day 14"][i]}.`);
}));

$$(".check-btn[data-task]").forEach(btn=>btn.addEventListener("click",()=>{
  const done=btn.classList.toggle("done-check");
  btn.textContent=done?"✓":"○";
  showToast(done?"Task marked complete.":"Task reopened.");
}));

$("#approveBtn").addEventListener("click",()=>openModal("Travel Approved","The doctor dashboard has recorded travel clearance for this prototype patient.","Confirm Clearance"));
$("#updatePlanBtn").addEventListener("click",()=>openModal("Update Recovery Plan","The clinician can modify medicine, activity, hydration and physiotherapy targets. The digital twin will recalculate the trajectory.","Apply Update"));
$("#messageBtn").addEventListener("click",()=>openModal("Message Patient","Send Ahmed a secure recovery instruction or follow-up note.","Send Message"));

$("#closeModal").addEventListener("click",()=>modal.classList.add("hidden"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});

document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.add("hidden")});
