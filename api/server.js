const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['https://novatitan.net', 'https://tzsmit.github.io']
}));
app.use(express.json());

// Service configurations
const services = {
  'home-wifi-audit': {
    name: 'Home Wi-Fi Security Audit',
    price: 14900, // $149.00 in cents
    description: 'Comprehensive home network security assessment'
  },
  'business-network-setup': {
    name: 'Small Business Network Setup', 
    price: 49900, // $499.00 in cents
    description: 'Enterprise-grade network setup for small businesses'
  },
  'cloud-security-checkup': {
    name: 'Cloud Security Checkup',
    price: 39900, // $399.00 in cents  
    description: 'OCI-certified cloud security assessment'
  },
  'installations': {
    name: 'Installations & Hardware Setup',
    price: 9900, // $99.00 starting price
    description: 'Professional device and network installation'
  },
  'remote-support': {
    name: 'Remote Tech Support Session',
    price: 7500, // $75.00
    description: 'Secure remote troubleshooting session'
  },
  'website-security': {
    name: 'Website Security Scan & Hardening',
    price: 19900, // $199.00
    description: 'Comprehensive website security assessment'
  },
  'security-training': {
    name: 'Cybersecurity Awareness Training',
    price: 24900, // $249.00
    description: 'Live security training for small teams'
  },
  'commercial-setup': {
    name: 'Commercial Business Setup',
    price: 299900, // $2,999.00 starting price
    description: 'Complete technology infrastructure for businesses'
  },
  'tech-implementation': {
    name: 'Technology Implementation & Integration',
    price: 149900, // $1,499.00 starting price  
    description: 'System integration and deployment services'
  }
};

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { serviceId, customerEmail, customerName } = req.body;
    
    const service = services[serviceId];
    if (!service) {
      return res.status(400).json({ error: 'Invalid service selected' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: service.name,
            description: service.description,
            images: ['https://novatitan.net/favicon-32x32.png']
          },
          unit_amount: service.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://novatitan.net/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://novatitan.net/cancel.html`,
      metadata: {
        service_id: serviceId,
        customer_name: customerName || '',
        business_name: 'Nova Titan Systems'
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle completed payments
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment succeeded for:', session.metadata.service_id);
      
      // Here you can:
      // - Send confirmation email to customer
      // - Notify your team
      // - Create calendar booking
      // - Update CRM system
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});