(function(){
  'use strict';

  // Year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if(window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // Hero parallax
    var heroBg = document.querySelector('.hero-bg');
    if(heroBg && window.scrollY < window.innerHeight){
      heroBg.style.transform = 'translate3d(0,'+(window.scrollY*0.25)+'px,0) scale(1.05)';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('navLinks');
  toggle && toggle.addEventListener('click', function(){
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav && nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el, i){
    el.style.transitionDelay = (Math.min(i,6)*60)+'ms';
    io.observe(el);
  });

  // Animated counters
  var counted = false;
  function runCounters(){
    if(counted) return;
    var rect = document.querySelector('.hero-stats').getBoundingClientRect();
    if(rect.top > window.innerHeight) return;
    counted = true;
    document.querySelectorAll('[data-count]').forEach(function(el){
      var target = parseInt(el.getAttribute('data-count'),10);
      var dur = 1400, start = performance.now();
      function step(now){
        var p = Math.min(1,(now-start)/dur);
        var ease = 1 - Math.pow(1-p, 3);
        el.textContent = Math.floor(target*ease).toLocaleString();
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  window.addEventListener('scroll', runCounters, {passive:true});
  runCounters();

  // Cursor glow
  var glow = document.getElementById('cursorGlow');
  if(glow && matchMedia('(hover:hover)').matches){
    var x=0,y=0,tx=0,ty=0;
    document.addEventListener('mousemove', function(e){tx=e.clientX;ty=e.clientY;});
    (function tick(){
      x += (tx-x)*0.15; y += (ty-y)*0.15;
      glow.style.left = x+'px'; glow.style.top = y+'px';
      requestAnimationFrame(tick);
    })();
  }

  // Lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  document.querySelectorAll('.tile').forEach(function(t){
    t.addEventListener('click', function(e){
      e.preventDefault();
      lbImg.src = t.getAttribute('data-src');
      lb.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
  function closeLB(){lb.classList.remove('open');document.body.style.overflow=''}
  lbClose && lbClose.addEventListener('click', closeLB);
  lb && lb.addEventListener('click', function(e){if(e.target===lb) closeLB()});
  document.addEventListener('keydown', function(e){if(e.key==='Escape') closeLB()});

  // Contact form (no backend — just confirm)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    note.hidden = false;
    form.reset();
    setTimeout(function(){note.hidden=true}, 5000);
  });
})();
