document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('start-overlay');
  const loveText = document.getElementById('love-text');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicStatus = document.getElementById('music-status');
  const backgroundMusic = document.getElementById('background-music');
  const surpriseBtn = document.getElementById('surprise-btn');
  const hiddenMessage = document.getElementById('hidden-message');
  const fireworksContainer = document.getElementById('fireworks');
  const heartsContainer = document.querySelector('.floating-hearts');
  const starsContainer = document.querySelector('.floating-stars');

  const colors = ['#ff69b4', '#ffd700', '#ff1493', '#ffb347', '#ff6347', '#ff7f50', '#ffb6c1'];

  /* --- Typewriter --- */
  const text = "Te Amo mucho mi reina💕";
  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      loveText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 120);
    } else {
      loveText.classList.add('typewriter');
    }
  }

  /* --- Overlay --- */
  overlay.addEventListener('click', function () {
    overlay.classList.add('hidden');
    setTimeout(typeWriter, 300);

    backgroundMusic.play().then(() => {
      musicIcon.textContent = '🔊';
      musicStatus.textContent = 'Pausar música';
    }).catch(() => {
      musicIcon.textContent = '🎵';
      musicStatus.textContent = 'Reproducir música';
    });
  });

  /* --- Partículas flotantes --- */
  function createFloatingParticles() {
    for (let i = 0; i < 30; i++) {
      const h = document.createElement('div');
      h.className = 'particle-heart';
      h.textContent = '💖';
      h.style.left = Math.random() * 100 + '%';
      h.style.top = 100 + Math.random() * 20 + 'vh';
      h.style.fontSize = (24 + Math.random() * 16) + 'px';
      h.style.animation = `rise ${6 + Math.random() * 6}s linear ${Math.random() * 5}s infinite`;
      heartsContainer.appendChild(h);
    }
    for (let i = 0; i < 15; i++) {
      const s = document.createElement('div');
      s.className = 'particle-star';
      s.textContent = '⭐';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.fontSize = (18 + Math.random() * 8) + 'px';
      s.style.animation = `rise ${8 + Math.random() * 8}s linear ${Math.random() * 6}s infinite`;
      starsContainer.appendChild(s);
    }
  }
  createFloatingParticles();

  /* --- Música --- */
  musicBtn.addEventListener('click', async function () {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        musicIcon.textContent = '🔊';
        musicStatus.textContent = 'Pausar música';
      } catch (err) {
        alert('El navegador bloqueó la reproducción automática. Presiona sobre la pantalla para permitir audio.');
      }
    } else {
      backgroundMusic.pause();
      musicIcon.textContent = '🎵';
      musicStatus.textContent = 'Reproducir música';
    }
  });

  /* --- Fuegos artificiales --- */
  function createFireworks(count = 3) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const centerX = 10 + Math.random() * 80;
        const centerY = 10 + Math.random() * 60;
        const sparks = 18 + Math.floor(Math.random() * 12);
        for (let s = 0; s < sparks; s++) {
          const spark = document.createElement('div');
          spark.className = 'spark';
          spark.style.left = centerX + '%';
          spark.style.top = centerY + '%';
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 180;
          const dx = Math.cos(angle) * dist + 'px';
          const dy = Math.sin(angle) * dist + 'px';
          spark.style.setProperty('--dx', dx);
          spark.style.setProperty('--dy', dy);
          spark.style.setProperty('--dur', (1 + Math.random() * 1.2) + 's');
          spark.style.background = colors[Math.floor(Math.random() * colors.length)];
          fireworksContainer.appendChild(spark);
          setTimeout(() => { spark.remove(); }, 2000);
        }
      }, i * 300);
    }
  }

  /* --- Auto efectos al cargar página --- */
  window.addEventListener('load', () => {
    createFireworks(6);
    setTimeout(() => createFireworks(5), 2000);
    setTimeout(() => createFireworks(4), 4000);

    for (let i = 0; i < 10; i++) {
      const mh = document.createElement('div');
      mh.className = 'mini-heart';
      mh.textContent = '💖';
      mh.style.left = (20 + Math.random() * 60) + '%';
      mh.style.top = (40 + Math.random() * 30) + '%';
      mh.style.animationDuration = (1 + Math.random() * 0.8) + 's';
      document.body.appendChild(mh);
      setTimeout(() => { mh.remove(); }, 1600);
    }
  });

  /* --- Botón sorpresa --- */
  surpriseBtn.addEventListener('click', function () {
    hiddenMessage.classList.add('show');
    hiddenMessage.setAttribute('aria-hidden', 'false');
    createFireworks(4);
    surpriseBtn.style.display = 'none';
    setTimeout(() => createFireworks(3), 1800);
    setTimeout(() => createFireworks(2), 3600);
  });

  hiddenMessage.addEventListener('click', function (e) {
    if (e.target === hiddenMessage) {
      hiddenMessage.classList.remove('show');
      hiddenMessage.setAttribute('aria-hidden', 'true');
      surpriseBtn.style.display = 'inline-block';
    }

  });
});


