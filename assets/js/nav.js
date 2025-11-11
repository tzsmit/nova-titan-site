/**
 * Nova Titan Systems - Navigation Script
 * Handles mobile menu toggle and navigation behavior
 * Loads after GSAP and Particles to prevent conflicts
 */

(function() {
  'use strict';

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyNav();
    initSmoothScroll();
  });

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = !mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    function openMenu() {
      mobileMenu.classList.remove('hidden');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  }

  /**
   * Sticky Navigation Enhancement
   */
  function initStickyNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow on scroll (background color is handled inline)
      if (currentScroll > 50) {
        nav.classList.add('shadow-2xl');
      } else {
        nav.classList.remove('shadow-2xl');
      }
      
      lastScroll = currentScroll;
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed header
          const headerHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Handle active navigation state
   */
  function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      // Remove existing active classes
      link.classList.remove('text-cyan-400', 'font-semibold');
      
      // Add active class if paths match
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  }

  // Update active nav on load
  document.addEventListener('DOMContentLoaded', updateActiveNav);
})();
