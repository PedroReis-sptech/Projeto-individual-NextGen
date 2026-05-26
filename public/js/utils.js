function toast(msg, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
    container.appendChild(t);
    setTimeout(() => {
        t.remove();
    }, 3200);
}

const Auth = {
    login(user) {
        localStorage.setItem('ng_user', JSON.stringify(user));
    },
    logout() {
        localStorage.removeItem('ng_user');
        window.location.href = 'login.html';
    },
    current() {
        try {
            return JSON.parse(localStorage.getItem('ng_user')) || null;
        }
        catch {
            return null;
        }
    },
    require(tipo) {
        const u = this.current();
        if (!u) {
            window.location.href = 'login.html';
            return null;
        }
        if (tipo && u.tipo !== tipo) {
            window.location.href = u.tipo === 'aluno' ? 'dashboard-aluno.html' : 'dashboard-admin.html';
            return null;
        }
        return u;
    }
};

function markActiveLink() {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-link').forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
    });
}
document.addEventListener('DOMContentLoaded', markActiveLink);

function validateRequired(formEl) {
    let ok = true;
    formEl.querySelectorAll('[required]').forEach(el => {
        el.style.borderColor = '';
        if (!el.value.trim()) {
            el.style.borderColor = '#ee1919';
            ok = false;
        }
    });
    if (!ok) toast('Preencha todos os campos obrigatórios.', 'error');
    return ok;
}

function initAvatarUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;
    input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}