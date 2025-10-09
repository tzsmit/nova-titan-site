// Stripe Checkout Integration for Nova Titan
class NovaCheckout {
  constructor() {
    this.stripe = Stripe('pk_test_51RPkR6P6s5s5Dxw3scSmWcCwZvXUnY3VZQNrTsGQacdyZBmnumdvEZA00AITwKZ7z0oUNMVQ7xiAF5vhqeI40cCP002HXwZh4r'); // Replace with your key
    this.init();
  }

  init() {
    // Add payment buttons to service cards
    this.addPaymentButtons();
  }

  addPaymentButtons() {
    // Find all "Book Now" buttons and add payment functionality
    const bookButtons = document.querySelectorAll('a[href*="book-now"]');
    
    bookButtons.forEach(button => {
      // Create new payment button
      const payButton = button.cloneNode(true);
      payButton.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Pay Now';
      payButton.classList.add('pay-now-btn');
      payButton.href = '#';
      
      // Insert payment button next to book button
      button.parentNode.insertBefore(payButton, button.nextSibling);
      
      // Add event listener
      payButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handlePayment(this.getServiceFromButton(button));
      });
    });
  }

  getServiceFromButton(button) {
    // Determine service based on button context
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
    
    return 'home-wifi-audit'; // Default service
  }

  async handlePayment(serviceId) {
    // Show loading state
    this.showLoadingModal();
    
    try {
      // Get customer info (optional - can be collected in Stripe Checkout)
      const customerEmail = this.getCustomerEmail();
      const customerName = this.getCustomerName();
      
      // Create checkout session
      const response = await fetch('https://your-server.vercel.app/create-checkout-session', {
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
      
      if (session.error) {
        throw new Error(session.error);
      }
      
      // Redirect to Stripe Checkout
      window.location.href = session.url;
      
    } catch (error) {
      console.error('Error:', error);
      this.showError('Payment initialization failed. Please try again or contact us directly.');
    } finally {
      this.hideLoadingModal();
    }
  }

  getCustomerEmail() {
    // Try to get email from contact form or user input
    return localStorage.getItem('customer_email') || '';
  }

  getCustomerName() {
    // Try to get name from contact form or user input  
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
    alert(message); // Replace with better error modal
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NovaCheckout();
});
