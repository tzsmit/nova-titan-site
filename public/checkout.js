// Stripe Checkout Integration for Nova Titan
class NovaCheckout {
  constructor() {
    this.stripe = Stripe('pk_test_51RPkR6P6s5s5Dxw3scSmWcCwZvXUnY3VZQNrTsGQacdyZBmnumdvEZA00AITwKZ7z0oUNMVQ7xiAF5vhqeI40cCP002HXwZh4r');
    this.init();
  }

  init() {
    this.addPaymentButtons();
  }

  addPaymentButtons() {
    const bookButtons = document.querySelectorAll('a[href*="book-now"]');
    
    bookButtons.forEach(button => {
      const payButton = button.cloneNode(true);
      payButton.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Pay Now';
      payButton.classList.add('pay-now-btn');
      payButton.href = '#';
      
      button.parentNode.insertBefore(payButton, button.nextSibling);
      
      payButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handlePayment(this.getServiceFromButton(button));
      });
    });
  }

  getServiceFromButton(button) {
    const serviceCard = button.closest('.card, article, section');
    const serviceTitle = serviceCard?.querySelector('h3, h2')?.textContent?.toLowerCase() || '';
    
    if (serviceTitle.includes('wifi') || serviceTitle.includes('home')) {
      return 'home-wifi-audit';
    } else if (serviceTitle.includes('business network')) {
      return 'business-network-setup';
    } else if (serviceTitle.includes('cloud')) {
      return 'cloud-security-checkup';
    } else if (serviceTitle.includes('installation')) {
      return 'installations';
    } else if (serviceTitle.includes('remote')) {
      return 'remote-support';
    } else if (serviceTitle.includes('website')) {
      return 'website-security';
    } else if (serviceTitle.includes('training')) {
      return 'security-training';
    } else if (serviceTitle.includes('commercial')) {
      return 'commercial-setup';
    } else if (serviceTitle.includes('implementation')) {
      return 'tech-implementation';
    }
    
    return 'home-wifi-audit';
  }

  async handlePayment(serviceId) {
    this.showLoadingModal();
    
    try {
      const customerEmail = this.getCustomerEmail();
      const customerName = this.getCustomerName();
      
      // FIXED: Added https:// and correct endpoint
      const response = await fetch('https://nova-titan-api.vercel.app/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          customerEmail,
          customerName
        })
      });
      
      const session = await response.json();
      
      // IMPROVED: Better error handling
      if (!response.ok) {
        throw new Error(session.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (session.error) {
        throw new Error(session.error);
      }
      
      // Redirect to Stripe Checkout
      window.location.href = session.url;
      
    } catch (error) {
      console.error('Payment Error:', error);
      this.showError(`Payment initialization failed: ${error.message}. Please try again or contact us directly.`);
    } finally {
      this.hideLoadingModal();
    }
  }

  getCustomerEmail() {
    return localStorage.getItem('customer_email') || '';
  }

  getCustomerName() {
    return localStorage.getItem('customer_name') || '';
  }

  showLoadingModal() {
    const modal = document.createElement('div');
    modal.id = 'loading-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    modal.innerHTML = `
      <div class="bg-gray-800 p-8 rounded-lg text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p class="text-white">Preparing secure payment...</p>
      </div>
    `;
    document.body.appendChild(modal);
  }

  hideLoadingModal() {
    const modal = document.getElementById('loading-modal');
    if (modal) modal.remove();
  }

  showError(message) {
    // Improved error display
    const errorModal = document.createElement('div');
    errorModal.id = 'error-modal';
    errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    errorModal.innerHTML = `
      <div class="bg-gray-800 p-8 rounded-lg text-center max-w-md mx-4">
        <div class="text-6xl text-red-400 mb-4">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3 class="text-xl font-bold text-red-400 mb-4">Payment Error</h3>
        <p class="text-white mb-6">${message}</p>
        <div class="space-y-3">
          <button onclick="document.getElementById('error-modal').remove()" 
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
            Try Again
          </button>
          <a href="/contact/" 
             class="block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition">
            Contact Support
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(errorModal);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NovaCheckout();
});