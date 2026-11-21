
document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNavLink();
  renderAccountNavLink();
});

function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[data-page]').forEach((link) => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });
}

function renderAccountNavLink() {
  const slot = document.getElementById('account-nav-slot');
  if (!slot) return;
  const session = getSession();
  if (!session) {
    slot.innerHTML = '<a href="login.html" data-page="login.html">Login</a>';
    return;
  }
  const dashboardPage = session.role === 'client' ? 'dashboard-client.html' : 'dashboard-fundi.html';
  slot.innerHTML = `<a href="${dashboardPage}">Dashboard</a> <a href="#" id="logout-link">Logout</a>`;
  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}
