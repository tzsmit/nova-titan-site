const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

// Load environment variables
require('dotenv').config();

app.use(cors({
  origin: ['https://novatitan.net', 'https://tzsmit.github.io', 'http://localhost:3000']
}));
app.use(express.json());

// Add a root route to test if server is working
app.get('/', (req, res) => {
  res.json({ 
    message: 'Nova Titan Payment API is running!',
    status: 'healthy',
    endpoints: {
      'POST /create-checkout-session': 'Create Stripe checkout session',
      'POST /webhook': 'Handle Stripe webhooks'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    timestamp: new Date().toISOString()
  });
});

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

// List all available services
app.get('/services', (req, res) => {
  res.json({
    services: Object.keys(services).map(key => ({
      id: key,
      ...services[key],
      price_display: `$${(services[key].price / 100).toFixed(2)}`
    }))
  });
});

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session for:', req.body);
    
    const { serviceId, customerEmail, customerName } = req.body;
    
    // Validate required fields
    if (!serviceId) {
      return res.status(400).json({ error: 'Service ID is required' });
    }
    
    const service = services[serviceId];
    if (!service) {
      return res.status(400).json({ 
        error: 'Invalid service selected',
        available_services: Object.keys(services)
      });
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe not configured' });
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
      success_url: `https://novatitan.net/public/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://novatitan.net/public/cancel.html`,
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

    console.log('Checkout session created:', session.id);
    res.json({ url: session.url, session_id: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: error.message,
      type: error.type || 'api_error'
    });
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

  console.log('Received webhook event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment succeeded for:', session.metadata.service_id);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Amount paid:', session.amount_total);
      
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Handle 404s
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.originalUrl,
    available_endpoints: ['/', '/health', '/services', '/create-checkout-session', '/webhook']
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Nova Titan API server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Stripe configured: ${!!process.env.STRIPE_SECRET_KEY}`);
});