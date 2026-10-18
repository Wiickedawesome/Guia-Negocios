/**
 * Admin Dashboard — Client-side utilities
 * Toast notifications, modals, and shared UI behaviors.
 */

/* ── Toast Notification System ── */
function createToastContainer() {
  if (document.getElementById('toast-container')) return;
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none';
  document.body.appendChild(container);
}

window.showToast = function(message, type = 'success', duration = 3500) {
  createToastContainer();
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  const icons = {
    success: '<svg class="w-6 h-6 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    error: '<svg class="w-6 h-6 text-red-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    info: '<svg class="w-6 h-6 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    warning: '<svg class="w-6 h-6 text-amber-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>',
    loading: '<svg class="w-6 h-6 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',
  };
  const colors = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-600',
    loading: 'bg-slate-700',
  };

  toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium ${colors[type] || colors.info} transform translate-x-full opacity-0 transition-all duration-300 max-w-sm`;

  // The icon markup is static and safe; the message is caller-supplied (it can
  // carry Firestore- or AI-derived text), so it is inserted as text, never HTML.
  const toastIcon = document.createElement('span');
  toastIcon.className = 'flex-shrink-0 flex items-center justify-center';
  toastIcon.innerHTML = icons[type] || icons.info;
  const toastText = document.createElement('span');
  toastText.className = 'flex-1';
  toastText.textContent = message;
  toast.append(toastIcon, toastText);
  
  container.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
  });
  
  // Auto-dismiss
  if (type !== 'loading') {
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  
  return toast;
};

/* ── Modal System ── */
window.showModal = function(title, content, options = {}) {
  // Remove existing modal
  document.getElementById('admin-modal-overlay')?.remove();
  
  const overlay = document.createElement('div');
  overlay.id = 'admin-modal-overlay';
  overlay.className = 'fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-200';
  
  const maxW = options.wide ? 'max-w-2xl' : 'max-w-lg';
  
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-full ${maxW} mx-4 transform scale-95 transition-transform duration-200" id="admin-modal">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <h3 class="text-lg font-bold text-slate-900">${title}</h3>
        <button id="modal-close-btn" class="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="px-6 py-5">${content}</div>
      ${options.footer ? `<div class="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end gap-3">${options.footer}</div>` : ''}
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0');
    overlay.querySelector('#admin-modal').classList.remove('scale-95');
    overlay.querySelector('#admin-modal').classList.add('scale-100');
  });
  
  // Close handlers
  const close = () => {
    overlay.classList.add('opacity-0');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 200);
  };
  
  overlay.querySelector('#modal-close-btn').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
  });
  
  return { close, overlay };
};

/* ── Confirm Dialog ── */
window.showConfirm = function(title, message) {
  return new Promise((resolve) => {
    const modal = showModal(title, `<p class="text-sm text-slate-600">${message}</p>`, {
      footer: `
        <button id="confirm-cancel" class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
        <button id="confirm-ok" class="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-opacity-90">Confirm</button>
      `
    });
    modal.overlay.querySelector('#confirm-cancel').addEventListener('click', () => { modal.close(); resolve(false); });
    modal.overlay.querySelector('#confirm-ok').addEventListener('click', () => { modal.close(); resolve(true); });
  });
};
