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
      
      if (!response.ok) {
        throw new Error(session.error || `HTTP ${response.status}`);
      }
      
      window.location.href = session.url;
      
    } catch (error) {
      console.error('Payment Error:', error);
      this.showError(`Payment failed: ${error.message}`);
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
    alert(`Error: ${message}\n\nPlease try again or contact us at (806) 370-0624`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NovaCheckout();
});