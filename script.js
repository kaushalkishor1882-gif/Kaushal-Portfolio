// ===== CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== ACTIVE NAV =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-item').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== 3D CARD TILT =====
document.querySelectorAll('.glass-card, .project-card, .skill-category, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== WATER RIPPLE ON BUTTONS =====
document.querySelectorAll('.btn, .project-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.2);
      border-radius:50%;
      transform:scale(0);
      animation:rippleAnim 0.7s ease-out forwards;
      pointer-events:none;
      z-index:10;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== STAGGER ENTRANCE for cards =====
document.querySelectorAll('.project-card, .skill-category, .achievement-card, .info-card').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.1}s`;
  el.classList.add('reveal');
});

// Re-observe newly marked reveals
document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));

// ===== TYPING EFFECT for hero (if exists) =====
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const words = ['Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'CS Student @ KIIT'];
  let wi = 0, ci = 0, deleting = false;
  
  function type() {
    const word = words[wi];
    typingEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
    
    if (!deleting && ci > word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

// ===== COUNTER ANIMATION =====
document.querySelectorAll('.stat-num').forEach(el => {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }
  }, 30);
});
