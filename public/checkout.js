class NovaCheckout {
  constructor() {
    this.stripe = Stripe('pk_test_51RPkR6P6s5s5Dxw3scSmWcCwZvXUnY3VZQNrTsGQacdyZBmnumdvEZA00AITwKZ7z0oUNMVQ7xiAF5vhqeI40cCP002HXwZh4r');
    this.init();
  }

  init() {
    this.addPaymentButtons();
  }

  addPaymentButtons() {
    // Manual button addition for specific services
    this.addServiceButton('#home-audit', 'home-wifi-audit', '$149');
    this.addServiceButton('#smb-network', 'business-network-setup', '$499');
    this.addServiceButton('#cloud-security', 'cloud-security-checkup', '$399');
    this.addServiceButton('#installations', 'installations', '$99');
    this.addServiceButton('#remote-support', 'remote-support', '$75');
    this.addServiceButton('#web-hardening', 'website-security', '$199');
    this.addServiceButton('#training', 'security-training', '$249');
  }

  addServiceButton(cardSelector, serviceId, price) {
    const card = document.querySelector(cardSelector);
    if (!card) return;

    const existingButton = card.querySelector('.btn-grad');
    if (!existingButton) return;

    const payButton = document.createElement('button');
    payButton.className = 'bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg inline-flex items-center justify-center transition w-full';
    payButton.innerHTML = `<i class="fas fa-credit-card mr-2"></i>Pay Now - ${price}`;
    
    payButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.handlePayment(serviceId);
    });

    existingButton.parentNode.insertBefore(payButton, existingButton.nextSibling);
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