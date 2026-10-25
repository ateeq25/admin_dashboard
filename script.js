const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
if (window.lucide) window.lucide.createIcons();

const toast = $('#toast');
let toastTimeout;
function showToast(message) {
  $('#toastMessage').textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2800);
}

const appSwitch = $('#appSwitch');
const appDropdown = $('#appDropdown');
appSwitch.addEventListener('click', () => {
  const open = appDropdown.classList.contains('hidden');
  appDropdown.classList.toggle('hidden', !open);
  appSwitch.setAttribute('aria-expanded', String(open));
});
$$('[data-app]').forEach(button => button.addEventListener('click', () => {
  appSwitch.querySelector('strong').textContent = button.dataset.app;
  appDropdown.classList.add('hidden');
  appSwitch.setAttribute('aria-expanded', 'false');
  showToast(`${button.dataset.app} app selected`);
}));

const profileButton = $('#profileButton');
const profileMenu = $('#profileMenu');
profileButton.addEventListener('click', () => {
  const open = profileMenu.classList.contains('hidden');
  profileMenu.classList.toggle('hidden', !open);
  profileButton.setAttribute('aria-expanded', String(open));
});
$$('[data-profile-action]').forEach(button => button.addEventListener('click', () => {
  profileMenu.classList.add('hidden');
  profileButton.setAttribute('aria-expanded', 'false');
  showToast(`${button.dataset.profileAction} is a demo action`);
}));

$$('.nav-link').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  $$('.nav-link').forEach(item => item.classList.remove('active'));
  link.classList.add('active');
  $('#currentPage').textContent = link.dataset.page;
  if (link.dataset.page === 'Dashboard') $('#dashboard').scrollIntoView({ behavior: 'smooth' });
  else showToast(`${link.dataset.page} page is a visual demo`);
}));

const searchInput = $('#dashboardSearch');
const searchableItems = $$('[data-searchable]');
const emptySearch = $('#emptySearch');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let matches = 0;
  searchableItems.forEach(item => {
    const found = !query || `${item.dataset.searchable} ${item.textContent}`.toLowerCase().includes(query);
    item.classList.toggle('search-hidden', !found);
    if (found) matches++;
  });
  emptySearch.classList.toggle('hidden', !query || matches > 0);
});

const backdrop = $('#modalBackdrop');
const createButton = $('#createTournament');
const nameInput = $('#tournamentName');
function openModal() { backdrop.classList.remove('hidden'); document.body.style.overflow = 'hidden'; setTimeout(() => nameInput.focus(), 50); }
function closeModal() { backdrop.classList.add('hidden'); document.body.style.overflow = ''; createButton.focus(); }
createButton.addEventListener('click', openModal);
$('#modalClose').addEventListener('click', closeModal);
$('#cancelModal').addEventListener('click', closeModal);
backdrop.addEventListener('click', event => { if (event.target === backdrop) closeModal(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !backdrop.classList.contains('hidden')) closeModal();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.focus(); }
});
$('#tournamentForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  const format = $('#tournamentType').value;
  closeModal();
  event.currentTarget.reset();
  showToast(`“${name}” (${format}) added in demo mode`);
});

$('#viewReports').addEventListener('click', () => showToast('Reports are not connected in this demo.'));
$('#allFixtures').addEventListener('click', () => showToast('All fixtures view is not connected in this demo.'));
$('#calendarLink').addEventListener('click', () => {
  $$('.nav-link').forEach(item => item.classList.toggle('active', item.dataset.page === 'Calendar'));
  $('#currentPage').textContent = 'Calendar';
  showToast('Calendar page is a visual demo');
});
$('#reviewTask').addEventListener('click', () => showToast('Lineup review is not connected in this demo.'));
$('#viewTasks').addEventListener('click', () => showToast('Task list is not connected in this demo.'));
$('#refreshDashboard').addEventListener('click', event => {
  const icon = event.currentTarget.querySelector('svg');
  icon.style.transform = 'rotate(360deg)';
  setTimeout(() => { icon.style.transform = ''; }, 350);
  showToast('Dashboard refreshed');
});

document.addEventListener('click', event => {
  if (!event.target.closest('.app-switch-wrap')) { appDropdown.classList.add('hidden'); appSwitch.setAttribute('aria-expanded', 'false'); }
  if (!event.target.closest('.sidebar-bottom')) { profileMenu.classList.add('hidden'); profileButton.setAttribute('aria-expanded', 'false'); }
});
