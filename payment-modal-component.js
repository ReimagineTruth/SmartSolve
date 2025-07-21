// SmartSolve Payment Modal Component
// Usage: Include this file and call openPaymentModal(planName)

class SmartSolvePaymentModal {
  constructor() {
    this.currentPlan = 'standard';
    this.currentBilling = 'monthly';
    this.selectedPaymentMethod = 'pi-wallet';
    this.onPaymentSuccess = null;
    this.onPaymentCancel = null;
    
    this.plans = {
      standard: {
        name: 'Standard Plan',
        badge: 'Standard Plan',
        description: 'Core tools for personal organization',
        monthly: { price: 3, period: '/month', savings: null },
        yearly: { price: 30, period: '/year', savings: 'Save 10 Pi/year' },
        features: [
          'Unlimited tasks & planning',
          'Advanced budget tools',
          'Full meal planner',
          'AI mood assistant',
          'Local services'
        ]
      },
      premium: {
        name: 'Premium Plan',
        badge: 'Premium Plan',
        description: 'Perfect for families and small groups',
        monthly: { price: 6, period: '/month', savings: null },
        yearly: { price: 60, period: '/year', savings: 'Save 20 Pi/year' },
        features: [
          'All Standard features',
          'Family calendar & sharing',
          'Kids mode with rewards',
          'Group chat & file sharing',
          'Full grocery planner',
          'Privacy controls'
        ]
      },
      pro: {
        name: 'Pro Plan',
        badge: 'Pro Plan',
        description: 'Advanced features for businesses',
        monthly: { price: 9, period: '/month', savings: null },
        yearly: { price: 90, period: '/year', savings: 'Save 30 Pi/year' },
        features: [
          'All Premium features',
          'Team collaboration tools',
          'Business tools (Marketing + Income)',
          'TruthWeb & Cloudy integrations',
          'Virtual assistant booking',
          'Advanced analytics'
        ]
      },
      lifetime: {
        name: 'Lifetime Plan',
        badge: '🔓 Lifetime Plan',
        description: 'Pay once, unlock everything forever!',
        monthly: { price: 99, period: ' one-time', savings: null },
        yearly: { price: 99, period: ' one-time', savings: null },
        features: [
          'All Pro Plan features',
          'Lifetime access - No monthly fees',
          'Priority support',
          'Early access to new features',
          'Exclusive lifetime badge',
          'Beta tester for future apps',
          'Free access to future products'
        ]
      }
    };
    
    this.init();
  }

  init() {
    this.createModalHTML();
    this.bindEvents();
  }

  createModalHTML() {
    const modalHTML = `
      <div id="smartSolvePaymentModal" class="modal-overlay" style="display: none;">
        <div class="payment-modal">
          <button class="close-btn" onclick="paymentModal.close()">&times;</button>
          
          <!-- Modal Content -->
          <div id="modalContent">
            <div class="modal-header">
              <div class="plan-badge" id="planBadge">Standard Plan</div>
              <h2 id="planTitle">Choose Your Plan</h2>
              <p id="planDescription">Select your preferred billing cycle</p>
            </div>

            <!-- Billing Toggle -->
            <div class="billing-toggle">
              <div class="billing-option active" data-billing="monthly">
                Monthly
              </div>
              <div class="billing-option" data-billing="yearly">
                Yearly
                <div class="savings-badge">Save 20%</div>
              </div>
            </div>

            <!-- Price Display -->
            <div class="price-display">
              <div class="price-amount" id="priceAmount">3</div>
              <div class="price-currency">Pi</div>
              <div class="price-period" id="pricePeriod">/month</div>
              <div class="savings-badge" id="savingsBadge" style="display: none;">Save 10 Pi/year</div>
            </div>

            <!-- Features List -->
            <ul class="features-list" id="featuresList">
              <li><i class="fas fa-check"></i> Unlimited tasks & planning</li>
              <li><i class="fas fa-check"></i> Advanced budget tools</li>
              <li><i class="fas fa-check"></i> Full meal planner</li>
              <li><i class="fas fa-check"></i> AI mood assistant</li>
              <li><i class="fas fa-check"></i> Local services</li>
            </ul>

            <!-- Payment Methods -->
            <div class="payment-methods">
              <h3>Payment Method</h3>
              <div class="payment-method selected" data-method="pi-wallet">
                <i class="fas fa-wallet"></i>
                <div class="method-info">
                  <h4>Pi Wallet</h4>
                  <p>Pay securely with your Pi balance</p>
                </div>
              </div>
              <div class="payment-method" data-method="pi-app">
                <i class="fas fa-mobile-alt"></i>
                <div class="method-info">
                  <h4>Pi App</h4>
                  <p>Use Pi Network mobile app</p>
                </div>
              </div>
            </div>

            <!-- Security Notice -->
            <div class="security-notice">
              <i class="fas fa-shield-alt"></i>
              Your payment is secured with Pi Network's blockchain technology
            </div>

            <!-- Modal Actions -->
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="paymentModal.close()">Cancel</button>
              <button class="btn btn-primary" id="payButton" onclick="paymentModal.processPayment()">
                <i class="fas fa-lock"></i> Pay Securely
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div class="loading" id="loadingState">
            <i class="fas fa-spinner"></i>
            <p>Processing payment...</p>
          </div>

          <!-- Success State -->
          <div class="success-message" id="successState">
            <i class="fas fa-check-circle"></i>
            <h3>Payment Successful!</h3>
            <p>Welcome to SmartSolve! Your subscription is now active.</p>
            <button class="btn btn-primary" onclick="paymentModal.close()">Continue to Dashboard</button>
          </div>
        </div>
      </div>
    `;

    // Add modal to body if it doesn't exist
    if (!document.getElementById('smartSolvePaymentModal')) {
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  }

  bindEvents() {
    // Billing toggle
    document.addEventListener('click', (e) => {
      if (e.target.closest('.billing-option')) {
        const billing = e.target.closest('.billing-option').dataset.billing;
        this.switchBilling(billing);
      }
    });

    // Payment method selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.payment-method')) {
        const method = e.target.closest('.payment-method').dataset.method;
        this.selectPaymentMethod(method);
      }
    });

    // Close modal when clicking outside
    document.getElementById('smartSolvePaymentModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open(plan = 'standard') {
    this.currentPlan = plan;
    this.updateModalContent();
    document.getElementById('smartSolvePaymentModal').style.display = 'flex';
  }

  close() {
    document.getElementById('smartSolvePaymentModal').style.display = 'none';
    // Reset to initial state
    document.getElementById('modalContent').style.display = 'block';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'none';
    
    if (this.onPaymentCancel) {
      this.onPaymentCancel();
    }
  }

  isOpen() {
    return document.getElementById('smartSolvePaymentModal').style.display === 'flex';
  }

  switchBilling(billing) {
    this.currentBilling = billing;
    
    // Update toggle buttons
    document.querySelectorAll('.billing-option').forEach(option => {
      option.classList.remove('active');
    });
    event.target.closest('.billing-option').classList.add('active');
    
    this.updatePriceDisplay();
  }

  selectPaymentMethod(method) {
    this.selectedPaymentMethod = method;
    
    // Update payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
      method.classList.remove('selected');
    });
    event.target.closest('.payment-method').classList.add('selected');
  }

  updateModalContent() {
    const plan = this.plans[this.currentPlan];
    
    // Update header
    document.getElementById('planBadge').textContent = plan.badge;
    document.getElementById('planTitle').textContent = plan.name;
    document.getElementById('planDescription').textContent = plan.description;
    
    // Update features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    plan.features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
      featuresList.appendChild(li);
    });
    
    // Update price
    this.updatePriceDisplay();
    
    // Update button styling for lifetime plan
    const payButton = document.getElementById('payButton');
    if (this.currentPlan === 'lifetime') {
      payButton.className = 'btn btn-lifetime';
      payButton.innerHTML = '<i class="fas fa-crown"></i> Get Lifetime Access';
    } else {
      payButton.className = 'btn btn-primary';
      payButton.innerHTML = '<i class="fas fa-lock"></i> Pay Securely';
    }
  }

  updatePriceDisplay() {
    const plan = this.plans[this.currentPlan];
    const billing = plan[this.currentBilling];
    
    document.getElementById('priceAmount').textContent = billing.price;
    document.getElementById('pricePeriod').textContent = billing.period;
    
    const savingsBadge = document.getElementById('savingsBadge');
    if (billing.savings) {
      savingsBadge.textContent = billing.savings;
      savingsBadge.style.display = 'inline-block';
    } else {
      savingsBadge.style.display = 'none';
    }
  }

  processPayment() {
    // Show loading state
    document.getElementById('modalContent').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';
    
    // Simulate payment processing
    setTimeout(() => {
      document.getElementById('loadingState').style.display = 'none';
      document.getElementById('successState').style.display = 'block';
      
      // Log payment details
      const paymentDetails = {
        plan: this.currentPlan,
        billing: this.currentBilling,
        paymentMethod: this.selectedPaymentMethod,
        amount: this.plans[this.currentPlan][this.currentBilling].price + ' Pi'
      };
      
      console.log('Payment processed:', paymentDetails);
      
      // Call success callback if provided
      if (this.onPaymentSuccess) {
        this.onPaymentSuccess(paymentDetails);
      }
    }, 2000);
  }

  // Set callbacks
  onSuccess(callback) {
    this.onPaymentSuccess = callback;
  }

  onCancel(callback) {
    this.onPaymentCancel = callback;
  }
}

// Initialize payment modal
const paymentModal = new SmartSolvePaymentModal();

// Global function for easy access
function openPaymentModal(plan) {
  paymentModal.open(plan);
}

// Example usage:
// paymentModal.onSuccess((details) => {
//   console.log('Payment successful:', details);
//   // Redirect to dashboard or update UI
// });

// paymentModal.onCancel(() => {
//   console.log('Payment cancelled');
//   // Handle cancellation
// }); 