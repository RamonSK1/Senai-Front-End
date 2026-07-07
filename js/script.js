// ============================================================
// LH GAMES — script.js
// Menu mobile (blades) + botão voltar ao topo + destaque de blade ativa
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Toggle do menu mobile
  const navToggle = document.getElementById('navToggle');
  const navInner = document.getElementById('navInner');

  if (navToggle && navInner) {
    navToggle.addEventListener('click', () => {
      navInner.classList.toggle('open');
    });
  }

  // Botão "Voltar ao topo"
  const backBtn = document.getElementById('voltar-topo');

  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('show', window.scrollY > 400);
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Destaca a blade correspondente à seção visível
  const blades = document.querySelectorAll('.blade');
  const sections = Array.from(blades)
    .map(blade => document.getElementById(blade.dataset.blade))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          blades.forEach(blade => blade.classList.remove('active'));
          const activeBlade = document.querySelector(`.blade[data-blade="${entry.target.id}"]`);
          if (activeBlade) activeBlade.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  // Fecha o menu mobile ao clicar em um link
  document.querySelectorAll('.blade a').forEach(link => {
    link.addEventListener('click', () => {
      navInner?.classList.remove('open');
    });
  });

  // ---------- Tela de login / cadastro ----------
  const authCard = document.querySelector('.auth-card');

  function showAuthMode(mode) {
    if (!authCard) return;

    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === mode);
    });

    document.querySelectorAll('.auth-form').forEach(form => {
      form.classList.toggle('active', form.dataset.form === mode);
    });

    authCard.classList.toggle('mode-cadastro', mode === 'cadastro');
  }

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => showAuthMode(tab.dataset.tab));
  });

  // Links "Cadastre-se" / "Fazer login" / itens do rodapé
  document.querySelectorAll('[data-goto]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthMode(link.dataset.goto);
    });
  });

});

// ---------- Funções chamadas via onclick no HTML ----------

function login() {
  const usuario = document.getElementById('usuario-login')?.value.trim();
  const senha = document.getElementById('senha-login')?.value.trim();

  if (!usuario || !senha) {
    alert('Preencha usuário e senha para entrar.');
    return;
  }

  // TODO: integrar com o back-end / API de autenticação
  console.log('Tentativa de login:', { usuario });
  alert(`Bem-vindo, ${usuario}!`);
}

function cadastro() {
  const usuario = document.getElementById('usuario-cadastro')?.value.trim();
  const email = document.getElementById('email-cadastro')?.value.trim();
  const senha = document.getElementById('senha-cadastro')?.value.trim();

  if (!usuario || !email || !senha) {
    alert('Preencha todos os campos para criar sua conta.');
    return;
  }

  if (senha.length < 6) {
    alert('A senha precisa ter no mínimo 6 caracteres.');
    return;
  }

  // TODO: integrar com o back-end / API de cadastro
  console.log('Novo cadastro:', { usuario, email });
  alert(`Conta criada com sucesso, ${usuario}! Agora é só entrar.`);
}

function topo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}