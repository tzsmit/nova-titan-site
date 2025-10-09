class NovaCheckout {
  constructor() {
    this.stripe = Stripe('pk_test_51RPkR6P6s5s5Dxw3scSmWcCwZvXUnY3VZQNrTsGQacdyZBmnumdvEZA00AITwKZ7z0oUNMVQ7xiAF5vhqeI40cCP002HXwZh4r');
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.addPaymentButtons());
    } else {
      this.addPaymentButtons();
    }
  }

  addPaymentButtons() {
    console.log('Adding payment buttons...');
    
    // Method 1: Look for existing "Book Now" buttons
    const bookButtons = document.querySelectorAll('a[href*="book-now"]');
    console.log('Found book buttons:', bookButtons.length);
    
    bookButtons.forEach((button, index) => {
      console.log(`Processing button ${index}:`, button);
      
      // Create payment button
      const payButton = this.createPayButton(button);
      
      // Insert after the book button
      if (button.parentNode) {
        button.parentNode.insertBefore(payButton, button.nextSibling);
        console.log('Added pay button after book button');
      }
    });

    // Method 2: Add to specific service cards by ID
    this.addServiceButton('#home-audit', 'home-wifi-audit', '$149');
    this.addServiceButton('#smb-network', 'business-network-setup', '$499');
    this.addServiceButton('#cloud-security', 'cloud-security-checkup', '$399');
    this.addServiceButton('#installations', 'installations', '$99');
    this.addServiceButton('#remote-support', 'remote-support', '$75');
    this.addServiceButton('#web-hardening', 'website-security', '$199');
    this.addServiceButton('#training', 'security-training', '$249');

    // Method 3: Add to cards with specific class names
    this.addToCards();
  }

  createPayButton(originalButton) {
    const payButton = document.createElement('a');
    payButton.href = '#';
    payButton.className = 'bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-all mt-2';
    payButton.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Pay Now';
    
    payButton.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = this.getServiceFromButton(originalButton);
      console.log('Pay button clicked, service:', serviceId);
      this.handlePayment(serviceId);
    });

    return payButton;
  }

  addServiceButton(cardSelector, serviceId, price) {
    const card = document.querySelector(cardSelector);
    if (!card) {
      console.log(`Card not found: ${cardSelector}`);
      return;
    }

    // Check if button already exists
    if (card.querySelector('.pay-now-btn')) {
      console.log(`Pay button already exists in ${cardSelector}`);
      return;
    }

    const existingButton = card.querySelector('.btn-grad, a[href*="book-now"]');
    if (!existingButton) {
      console.log(`No existing button found in ${cardSelector}`);
      return;
    }

    const payButton = document.createElement('button');
    payButton.className = 'pay-now-btn bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg inline-flex items-center justify-center transition w-full mt-3';
    payButton.innerHTML = `<i class="fas fa-credit-card mr-2"></i>Pay Now - ${price}`;
    
    payButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Service button clicked:', serviceId);
      this.handlePayment(serviceId);
    });

    // Insert after existing button
    if (existingButton.parentNode) {
      existingButton.parentNode.insertBefore(payButton, existingButton.nextSibling);
      console.log(`Added pay button to ${cardSelector}`);
    }
  }

  addToCards() {
    // Look for service cards
    const serviceCards = document.querySelectorAll('.card, .service-card, article');
    console.log('Found service cards:', serviceCards.length);

    serviceCards.forEach((card, index) => {
      // Skip if already has pay button
      if (card.querySelector('.pay-now-btn')) return;

      const bookButton = card.querySelector('a[href*="book-now"]');
      if (bookButton && !card.querySelector('.pay-now-btn')) {
        const payButton = this.createPayButton(bookButton);
        payButton.classList.add('mt-3', 'w-full', 'justify-center');
        
        if (bookButton.parentNode) {
          bookButton.parentNode.insertBefore(payButton, bookButton.nextSibling);
          console.log(`Added pay button to card ${index}`);
        }
      }
    });
  }

  getServiceFromButton(button) {
    // Try to find service from card context
    const serviceCard = button.closest('.card, .service-card, article, section');
    if (!serviceCard) return 'home-wifi-audit';

    // Check for ID first
    const cardId = serviceCard.id;
    if (cardId) {
      console.log('Found card ID:', cardId);
      switch(cardId) {
        case 'home-audit': return 'home-wifi-audit';
        case 'smb-network': return 'business-network-setup';
        case 'cloud-security': return 'cloud-security-checkup';
        case 'installations': return 'installations';
        case 'remote-support': return 'remote-support';
        case 'web-hardening': return 'website-security';
        case 'training': return 'security-training';
      }
    }

    // Fallback to text content matching
    const serviceTitle = serviceCard.querySelector('h3, h2, h1')?.textContent?.toLowerCase() || '';
    console.log('Service title:', serviceTitle);
    
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
    
    return 'home-wifi-audit'; // Default
  }

  async handlePayment(serviceId) {
    console.log('Handling payment for service:', serviceId);
    this.showLoadingModal();
    
    try {
      const customerEmail = this.getCustomerEmail();
      const customerName = this.getCustomerName();
      
      console.log('Making API request to create checkout session...');
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
      
      console.log('API response status:', response.status);
      const session = await response.json();
      console.log('API response:', session);
      
      if (!response.ok) {
        throw new Error(session.error || `HTTP ${response.status}`);
      }
      
      console.log('Redirecting to Stripe checkout...');
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
    // Remove existing modal
    this.hideLoadingModal();
    
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

// Initialize immediately
console.log('Initializing NovaCheckout...');
new NovaCheckout();
