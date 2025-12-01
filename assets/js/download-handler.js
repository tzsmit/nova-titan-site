/**
 * Download Handler with User Notification
 * Handles PDF downloads and displays a toast notification
 */

// Create and inject toast notification styles
const toastStyles = `
  .download-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(8, 145, 178, 0.4);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideInRight 0.4s ease-out, fadeOut 0.4s ease-in 2.6s;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    font-weight: 500;
    max-width: 400px;
  }
  
  .download-toast-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    animation: downloadPulse 1.5s ease-in-out infinite;
  }
  
  .download-toast-message {
    flex: 1;
  }
  
  .download-toast-filename {
    font-size: 12px;
    opacity: 0.9;
    margin-top: 4px;
    font-weight: 400;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(400px);
    }
  }
  
  @keyframes downloadPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 640px) {
    .download-toast {
      left: 20px;
      right: 20px;
      max-width: none;
    }
  }
`;

// Inject styles into document
if (!document.getElementById('download-toast-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'download-toast-styles';
  styleSheet.textContent = toastStyles;
  document.head.appendChild(styleSheet);
}

/**
 * Show download notification toast
 * @param {string} filename - Name of the file being downloaded
 * @param {string} message - Optional custom message
 */
function showDownloadNotification(filename, message = 'Downloading...') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.download-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'download-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  // Download icon SVG
  const iconSVG = `
    <svg class="download-toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  `;
  
  toast.innerHTML = `
    ${iconSVG}
    <div class="download-toast-message">
      <div>${message}</div>
      <div class="download-toast-filename">${filename}</div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}

/**
 * Handle PDF download with notification
 * @param {Event} event - Click event
 * @param {string} pdfUrl - URL of the PDF file
 * @param {string} filename - Name to save the file as
 */
function handlePDFDownload(event, pdfUrl, filename) {
  event.preventDefault();
  
  // Show notification
  showDownloadNotification(filename, 'Downloading Federal Capability Statement...');
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Track download event (if analytics available)
  if (typeof gtag === 'function') {
    gtag('event', 'download', {
      'event_category': 'engagement',
      'event_label': filename,
      'value': 1
    });
  }
  
  // Track with Plausible (if available)
  if (typeof plausible === 'function') {
    plausible('Download', {
      props: {
        file: filename,
        type: 'capability-statement'
      }
    });
  }
}

/**
 * Initialize download handlers for all capability statement links
 */
function initializeDownloadHandlers() {
  const capabilityStatementLinks = document.querySelectorAll('a[href*="nova-titan-systems-federal-capability-statement.pdf"]');
  
  capabilityStatementLinks.forEach(link => {
    // Skip if already initialized
    if (link.dataset.downloadInitialized) return;
    
    link.dataset.downloadInitialized = 'true';
    link.addEventListener('click', (e) => {
      handlePDFDownload(
        e,
        '/assets/docs/nova-titan-systems-federal-capability-statement.pdf',
        'Nova-Titan-Systems-Federal-Capability-Statement.pdf'
      );
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDownloadHandlers);
} else {
  initializeDownloadHandlers();
}

// Re-initialize on dynamic content changes (for SPAs or dynamic loading)
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(() => {
    initializeDownloadHandlers();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
