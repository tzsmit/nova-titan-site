// Stripe Checkout Integration for Nova Titan Systems
// Fixed version to prevent duplicate buttons

const API_BASE_URL = 'https://nova-titan-api.vercel.app';

// Service configurations with prices and Stripe price IDs
const serviceConfig = {
    'home-wifi-audit': {
        name: 'Home Wi-Fi Security Audit',
        price: 149,
        priceId: 'price_home_wifi_audit'
    },
    'business-network': {
        name: 'Business Network Security Setup',
        price: 499,
        priceId: 'price_business_network'
    },
    'cloud-security': {
        name: 'Cloud Security Assessment',
        price: 399,
        priceId: 'price_cloud_security'
    },
    'penetration-testing': {
        name: 'Penetration Testing',
        price: 799,
        priceId: 'price_penetration_testing'
    },
    'security-training': {
        name: 'Cybersecurity Training Workshop',
        price: 299,
        priceId: 'price_security_training'
    },
    'incident-response': {
        name: '24/7 Incident Response',
        price: 1299,
        priceId: 'price_incident_response'
    }
};

// Track processed elements to prevent duplicates
const processedElements = new Set();

function createPaymentButton(serviceKey, config, targetElement) {
    // Create unique identifier for this element
    const elementId = targetElement.id || targetElement.className || Math.random().toString(36);
    const uniqueKey = `${serviceKey}-${elementId}`;
    
    // Skip if already processed
    if (processedElements.has(uniqueKey)) {
        console.log(`Skipping duplicate button for ${serviceKey} on element:`, targetElement);
        return;
    }
    
    // Mark as processed
    processedElements.add(uniqueKey);
    
    console.log(`Creating payment button for ${serviceKey}:`, config);
    
    // Create the payment button
    const payButton = document.createElement('button');
    payButton.className = 'stripe-pay-button';
    payButton.innerHTML = `Pay Now - $${config.price}`;
    payButton.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin: 10px 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        width: 100%;
        max-width: 200px;
    `;
    
    // Add hover effects
    payButton.addEventListener('mouseenter', () => {
        payButton.style.transform = 'translateY(-2px)';
        payButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    payButton.addEventListener('mouseleave', () => {
        payButton.style.transform = 'translateY(0)';
        payButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
    
    // Add click handler
    payButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(`Payment button clicked for ${serviceKey}`);
        
        // Disable button and show loading
        payButton.disabled = true;
        payButton.innerHTML = 'Processing...';
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: config.priceId,
                    serviceName: config.name,
                    amount: config.price * 100 // Convert to cents
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const session = await response.json();
            console.log('Checkout session created:', session);
            
            // Redirect to Stripe Checkout
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error('No checkout URL received');
            }
            
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment setup failed. Please try again or contact support.');
            
            // Re-enable button
            payButton.disabled = false;
            payButton.innerHTML = `Pay Now - $${config.price}`;
        }
    });
    
    // Insert the button after the target element
    targetElement.insertAdjacentElement('afterend', payButton);
    console.log(`Payment button inserted for ${serviceKey}`);
}

function initializeStripeButtons() {
    console.log('Initializing Stripe payment buttons...');
    console.log('Service configurations:', serviceConfig);
    
    // Clear processed elements set on each initialization
    processedElements.clear();
    
    // Method 1: Look for service cards with data attributes or IDs
    Object.keys(serviceConfig).forEach(serviceKey => {
        const config = serviceConfig[serviceKey];
        
        // Try to find elements by ID first
        let targetElements = document.querySelectorAll(`#${serviceKey}, [data-service="${serviceKey}"]`);
        
        if (targetElements.length === 0) {
            // Fallback: look for elements containing service name in text
            const allElements = document.querySelectorAll('div, section, article');
            targetElements = Array.from(allElements).filter(el => {
                const text = el.textContent.toLowerCase();
                const serviceName = config.name.toLowerCase();
                return text.includes(serviceName) || text.includes(serviceKey.replace('-', ' '));
            });
        }
        
        console.log(`Found ${targetElements.length} elements for ${serviceKey}:`, targetElements);
        
        targetElements.forEach(element => {
            createPaymentButton(serviceKey, config, element);
        });
    });
    
    // Method 2: Generic fallback for any remaining "Book Now" buttons without payment buttons
    const bookNowButtons = document.querySelectorAll('button, a, .btn');
    console.log(`Found ${bookNowButtons.length} potential booking buttons`);
    
    bookNowButtons.forEach((button, index) => {
        const buttonText = button.textContent.toLowerCase().trim();
        
        // Only process "Book Now" or similar buttons that don't already have payment buttons nearby
        if (buttonText.includes('book') || buttonText.includes('get started') || buttonText.includes('order')) {
            
            // Check if there's already a payment button nearby
            const hasPaymentButton = button.parentElement?.querySelector('.stripe-pay-button') || 
                                   button.nextElementSibling?.classList.contains('stripe-pay-button');
            
            if (!hasPaymentButton) {
                // Try to determine which service this button belongs to
                let matchedService = null;
                const parentText = button.closest('div, section, article')?.textContent.toLowerCase() || '';
                
                for (const [serviceKey, config] of Object.entries(serviceConfig)) {
                    if (parentText.includes(config.name.toLowerCase()) || 
                        parentText.includes(serviceKey.replace('-', ' '))) {
                        matchedService = { key: serviceKey, config };
                        break;
                    }
                }
                
                // If no specific service matched, use a default or skip
                if (matchedService) {
                    console.log(`Generic button ${index} matched to ${matchedService.key}`);
                    createPaymentButton(matchedService.key, matchedService.config, button);
                } else {
                    console.log(`Generic button ${index} could not be matched to a service, skipping`);
                }
            }
        }
    });
    
    console.log('Stripe button initialization complete');
    console.log(`Total processed elements: ${processedElements.size}`);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStripeButtons);
} else {
    initializeStripeButtons();
}

// Also initialize on window load as backup
window.addEventListener('load', () => {
    // Only run if no buttons were created yet
    if (processedElements.size === 0) {
        console.log('Backup initialization running...');
        initializeStripeButtons();
    }
});

console.log('Stripe checkout script loaded successfully');