function alerta(mensagem, type = 'sucesso') {
    let caixa = document.getElementById('toastContainer');
    if (!caixa) {
        caixa = document.createElement('div');
        caixa.id = 'toastContainer';
        caixa.className = 'caixa-alertas';
        document.body.appendChild(caixa);
    }
    const t = document.createElement('div');
    t.className = `alerta alerta-${type}`;
    t.innerHTML = `<span>${type === 'sucesso' ? '✓' : '✕'}</span> ${mensagem}`;
    caixa.appendChild(t);
    setTimeout(() => {
        t.remove();
    }, 3200);
}

const storage = {
    login(user) {
        localStorage.setItem('sessaoUser', JSON.stringify(user));
    },
    logout() {
        localStorage.removeItem('sessaoUser');
        window.location.href = 'login.html';
    },
    current() {
        try {
            return JSON.parse(localStorage.getItem('sessaoUser')) || null;
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
    const links = document.querySelectorAll('.link-menu');

    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') === path) {
            links[i].classList.add('ativo');
        }
    }
}
document.addEventListener('DOMContentLoaded', markActiveLink);

function validateRequired(formEl) {
    let ok = true;
    const campos = formEl.querySelectorAll('[required]');

    for (let i = 0; i < campos.length; i++) {
        campos[i].style.borderColor = '';

        if (!campos[i].value.trim()) {
            campos[i].style.borderColor = '#ee1919';
            ok = false;
        }
    }

    if (!ok) alerta('Preencha todos os campos obrigatórios.', 'erro');
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

function toast(mensagem, tipo = 'sucesso') {
    alerta(mensagem, tipo);
}
