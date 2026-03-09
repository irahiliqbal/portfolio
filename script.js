// ── Scroll reveal
const io = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
  { threshold: 0.06 }
);
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ── Nav shrink on scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () =>
  nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true }
);

// ── Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  // Prevent scrolling when menu is open
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) toggleMenu();
  });
});


// ── Custom Interactive Cursor
const cursorDot = document.getElementById('cursorDot');

// Only initialize custom cursor on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    // Request animation frame for performance
    requestAnimationFrame(() => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });
  });

  // Track hoverable elements (links, buttons, custom classes)
  const hoverables = document.querySelectorAll('a, button, .hover-target');
  
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
  });
} else {
  // Hide custom cursor completely on touch devices
  if(cursorDot) cursorDot.style.display = 'none';
  // Restore default cursor
  document.body.style.cursor = 'auto';
  document.querySelectorAll('a, button, .hover-target').forEach(el => {
      el.style.cursor = 'pointer';
  });
}

// ── Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ── Mouse Spotlight Effect
const hero = document.querySelector('.hero');
const spotlight = document.getElementById('spotlight');
if (hero && spotlight) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.setProperty('--mouse-x', `${x}px`);
        spotlight.style.setProperty('--mouse-y', `${y}px`);
    });
}

// ── Developer Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll('.type-line');
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex >= lines.length) return;
        
        const line = lines[lineIndex];
        const text = line.getAttribute('data-text');
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 30 + 30); // varied speed for realism
            } else {
                lineIndex++;
                setTimeout(typeLine, 200); // pause between lines
            }
        }
        typeChar();
    }
    
    // Slight delay so the slide-up reveal happens first
    setTimeout(typeLine, 800);
});
