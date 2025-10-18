// Interacciones: copia de teléfono, lightbox simple y menú móvil
document.addEventListener('DOMContentLoaded', function(){
  const copyBtn = document.getElementById('copyPhone');
  if(copyBtn){
    copyBtn.addEventListener('click', function(){
      const text = this.textContent.trim();
      if(navigator.clipboard){
        navigator.clipboard.writeText(text).then(()=>{
          const old = this.textContent;
          this.textContent = 'Copiado ✔';
          setTimeout(()=> this.textContent = old, 2000);
        });
      }else{
        // fallback
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); alert('Número copiado'); }catch(e){ alert('Copiar manualmente: '+text); }
        ta.remove();
      }
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.dataset.full || img.src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  closeBtn.addEventListener('click', ()=>{ lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); });
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); } });

  // Fake send
  const fakeSend = document.getElementById('fakeSend');
  if(fakeSend){
    fakeSend.addEventListener('click', ()=>{
      fakeSend.textContent = 'Enviando…';
      setTimeout(()=>{ fakeSend.textContent = 'Enviar mensaje (simulado)'; alert('Mensaje simulado: en un entorno real enviaría el texto al taller.'); }, 900);
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? 'none' : 'flex';
    });
  }
});
