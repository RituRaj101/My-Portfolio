/*
  ============================================================
  Rituraj Kumar — Portfolio JavaScript
  ============================================================
  File    : script.js
  Purpose : All interactive behaviour for the portfolio.

  Sections:
    1. Navbar — scroll effect + active link highlight
    2. Mobile Menu — open / close toggle
    3. Scroll-to-top button — show / hide
    4. Contact form — submit feedback simulation

  Note: Scroll-triggered fade-in animation has been removed.
        Only simple CSS hover transitions are used for interactivity.
  ============================================================
*/


/* ============================================================
   1. NAVBAR — Scroll Effect & Active Link Highlight
============================================================ */

const SECTION_IDS = [
  'home', 'about', 'skills', 'tools',
  'projects', 'experience', 'education', 'contact'
];

function onScroll() {
  const scrollY   = window.scrollY;
  const navbar    = document.getElementById('navbar');
  const scrollBtn = document.getElementById('scrollTopBtn');

  // Toggle navbar dark background after scrolling 20px
  navbar.classList.toggle('scrolled', scrollY > 20);

  // Show scroll-to-top button after scrolling 400px
  scrollBtn.classList.toggle('visible', scrollY > 400);

  // Highlight correct nav link
  highlightActiveNavLink(scrollY);
}

function highlightActiveNavLink(scrollY) {
  let currentSection = 'home';

  SECTION_IDS.forEach(function(id) {
    const section = document.getElementById(id);
    if (section && scrollY >= section.offsetTop - 140) {
      currentSection = id;
    }
  });

  document.querySelectorAll('.nav-link').forEach(function(link) {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === '#' + currentSection);
  });
}

window.addEventListener('scroll', onScroll);


/* ============================================================
   2. MOBILE MENU — Open / Close Toggle
============================================================ */

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}


/* ============================================================
   3. CONTACT FORM — Submit Feedback
============================================================ */

// function handleSubmit(btn) {
//   const name  = document.getElementById('senderName').value.trim();
//   const email = document.getElementById('senderEmail').value.trim();
//   const msg   = document.getElementById('senderMsg').value.trim();

//   // Basic validation — all fields required
//   if (!name || !email || !msg) {
//     btn.textContent = '⚠ Please fill all fields';
//     btn.style.background = '#f59e0b';
//     setTimeout(function() {
//       btn.textContent = 'Send Message →';
//       btn.style.background = '';
//     }, 2500);
//     return;
//   }

//   // Loading state
//   btn.textContent = 'Sending...';
//   btn.style.opacity = '0.65';
//   btn.disabled = true;

//   // Simulate network delay (1.2 seconds)
//   setTimeout(function() {
//     btn.textContent = '✓ Message Sent!';
//     btn.style.background = '#34d399';
//     btn.style.opacity = '1';
//     btn.disabled = false;

//     // Clear form fields
//     document.getElementById('senderName').value  = '';
//     document.getElementById('senderEmail').value = '';
//     document.getElementById('senderMsg').value   = '';

//     // Reset button after 3 seconds
//     setTimeout(function() {
//       btn.textContent = 'Send Message →';
//       btn.style.background = '';
//     }, 3000);

//   }, 1200);
// }


function handleSubmit(btn) {
  const name  = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const msg   = document.getElementById('senderMsg').value.trim();

  // Basic validation — all fields required
  if (!name || !email || !msg) {
    btn.textContent = '⚠ Please fill all fields';
    btn.style.background = '#f59e0b';
    setTimeout(function () {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 2500);
    return;
  }

  // Loading state
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.65';
  btn.disabled = true;

  // EmailJS send
  emailjs.send(
    'service_bde8alj',       // ✅ Your Service ID (already set)
    'template_kqjjiz4',      // 🔁 Replace with your Template ID
    {
      from_name:  name,
      from_email: email,
      message:    msg,
    }
  )
  .then(function () {
    // Success
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#34d399';
    btn.style.opacity = '1';
    btn.disabled = false;

    document.getElementById('senderName').value  = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('senderMsg').value   = '';

    setTimeout(function () {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  })
  .catch(function (error) {
    // Error
    console.error('EmailJS error:', error);
    btn.textContent = '✗ Failed. Try Again';
    btn.style.background = '#ef4444';
    btn.style.opacity = '1';
    btn.disabled = false;

    setTimeout(function () {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  });
}