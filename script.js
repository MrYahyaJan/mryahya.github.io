// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Footer year
$('#year') && ($('#year').textContent = new Date().getFullYear());

// Mobile nav
const nav = $('.main-nav');
const hamb = $('.hamb');
if (hamb && nav) {
  hamb.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    hamb.setAttribute('aria-expanded', String(!expanded));
  });
  $$('.main-nav a').forEach(a => a.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    hamb.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scroll for anchors
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Habit tracker with localStorage
const habitForm = $('#habitForm');
const habitMsg = $('#habitMsg');
const saveBtn = $('#saveHabits');
const KEY = 'yyj_habits_' + new Date().toISOString().slice(0,10); // daily key
const PREV_KEY_PREFIX = 'yyj_habits_';

function loadToday(){
  const saved = localStorage.getItem(KEY);
  if (!habitForm) return;
  if (saved){
    const data = JSON.parse(saved);
    habitForm.deepwork.checked = !!data.deepwork;
    habitForm.read.checked = !!data.read;
    habitForm.ship.checked = !!data.ship;
    habitForm.exercise.checked = !!data.exercise;
    habitMsg.textContent = 'Saved for today ✔';
  } else {
    habitMsg.textContent = 'Track today and save.';
  }
}
function saveToday(){
  const data = {
    deepwork: habitForm.deepwork.checked,
    read: habitForm.read.checked,
    ship: habitForm.ship.checked,
    exercise: habitForm.exercise.checked,
    ts: Date.now()
  };
  localStorage.setItem(KEY, JSON.stringify(data));
  habitMsg.textContent = 'Saved for today ✔';
}
saveBtn && saveBtn.addEventListener('click', saveToday);
loadToday();

// Optional: simple reveal animation without IntersectionObserver (fast + lightweight)
document.addEventListener('scroll', () => {
  // could add class reveals here if you want; kept minimal for speed
}, {passive:true});
