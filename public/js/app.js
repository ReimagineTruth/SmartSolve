// SmartSolve MVP Frontend Application
class SmartSolveApp {
  constructor() {
    this.apiBase = '/api';
    this.currentUser = null;
    this.token = localStorage.getItem('smartsolve_token');
    this.socket = null;
    
    this.init();
  }

  async init() {
    // Check authentication status
    if (this.token) {
      try {
        const response = await this.apiCall('GET', '/auth/me');
        if (response.success) {
          this.currentUser = response.user;
          this.setupAuthenticatedUI();
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        this.logout();
      }
    }

    this.setupEventListeners();
    this.setupNavigation();
  }

  setupEventListeners() {
    // Pi Sign-in buttons
    document.querySelectorAll('.pi-signin, [href="signin.html"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSignInModal();
      });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
    }

    // FAQ toggles
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => this.toggleFAQ(question));
    });

    // Footer toggles (mobile)
    document.querySelectorAll('.footer-links h3').forEach(header => {
      header.addEventListener('click', () => this.toggleFooterSection(header));
    });
  }

  setupNavigation() {
    // Handle navigation for SPA-like experience
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        this.navigateTo(link.href);
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      this.loadPage(window.location.pathname);
    });
  }

  async navigateTo(url) {
    const path = new URL(url).pathname;
    window.history.pushState({}, '', path);
    await this.loadPage(path);
  }

  async loadPage(path) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Update main content
        const mainContent = doc.querySelector('main') || doc.querySelector('#main-content');
        if (mainContent) {
          document.querySelector('main') || document.querySelector('#main-content').innerHTML = mainContent.innerHTML;
        }

        // Update title
        const title = doc.querySelector('title');
        if (title) {
          document.title = title.textContent;
        }

        // Re-initialize page-specific functionality
        this.setupPageSpecificFeatures();
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

  setupPageSpecificFeatures() {
    // Workspace page features
    if (window.location.pathname.includes('workspace')) {
      this.setupWorkspaceFeatures();
    }

    // Settings page features
    if (window.location.pathname.includes('settings')) {
      this.setupSettingsFeatures();
    }
  }

  setupWorkspaceFeatures() {
    if (!this.currentUser) return;

    // Task management
    this.setupTaskFeatures();
    
    // Budget management
    this.setupBudgetFeatures();
    
    // Meal planning
    this.setupMealFeatures();
    
    // Wellness tracking
    this.setupWellnessFeatures();
  }

  setupTaskFeatures() {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));
    }

    // Load existing tasks
    this.loadTasks();
  }

  async loadTasks() {
    try {
      const response = await this.apiCall('GET', '/tasks');
      if (response.success) {
        this.renderTasks(response.tasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }

  async handleTaskSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      priority: formData.get('priority'),
      dueDate: formData.get('dueDate'),
      estimatedTime: parseInt(formData.get('estimatedTime')) || 0
    };

    try {
      const response = await this.apiCall('POST', '/tasks', taskData);
      if (response.success) {
        e.target.reset();
        this.loadTasks();
        this.showNotification('Task created successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      this.showNotification('Failed to create task', 'error');
    }
  }

  renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;

    taskList.innerHTML = tasks.map(task => `
      <div class="task-item ${task.status}" data-task-id="${task._id}">
        <div class="task-header">
          <h3>${task.title}</h3>
          <span class="priority ${task.priority}">${task.priority}</span>
        </div>
        <p>${task.description || ''}</p>
        <div class="task-meta">
          <span class="category">${task.category}</span>
          ${task.dueDate ? `<span class="due-date">${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
        </div>
        <div class="task-actions">
          <button onclick="app.completeTask('${task._id}')" class="btn btn-small">Complete</button>
          <button onclick="app.editTask('${task._id}')" class="btn btn-small secondary">Edit</button>
        </div>
      </div>
    `).join('');
  }

  async completeTask(taskId) {
    try {
      const response = await this.apiCall('POST', `/tasks/${taskId}/complete`);
      if (response.success) {
        this.loadTasks();
        this.showNotification('Task completed!', 'success');
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
      this.showNotification('Failed to complete task', 'error');
    }
  }

  setupBudgetFeatures() {
    const budgetForm = document.getElementById('budget-form');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => this.handleBudgetSubmit(e));
    }

    this.loadBudgets();
  }

  async loadBudgets() {
    try {
      const response = await this.apiCall('GET', '/budget');
      if (response.success) {
        this.renderBudgets(response.budgets);
      }
    } catch (error) {
      console.error('Failed to load budgets:', error);
    }
  }

  async handleBudgetSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const budgetData = {
      name: formData.get('name'),
      type: formData.get('type'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      totalBudget: parseFloat(formData.get('totalBudget')),
      categories: JSON.parse(formData.get('categories') || '[]')
    };

    try {
      const response = await this.apiCall('POST', '/budget', budgetData);
      if (response.success) {
        e.target.reset();
        this.loadBudgets();
        this.showNotification('Budget created successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to create budget:', error);
      this.showNotification('Failed to create budget', 'error');
    }
  }

  renderBudgets(budgets) {
    const budgetList = document.getElementById('budget-list');
    if (!budgetList) return;

    budgetList.innerHTML = budgets.map(budget => `
      <div class="budget-item" data-budget-id="${budget._id}">
        <div class="budget-header">
          <h3>${budget.name}</h3>
          <span class="budget-type">${budget.type}</span>
        </div>
        <div class="budget-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(budget.spent / budget.totalBudget) * 100}%"></div>
          </div>
          <span class="budget-amount">${budget.spent} / ${budget.totalBudget} Pi</span>
        </div>
        <div class="budget-actions">
          <button onclick="app.addExpense('${budget._id}')" class="btn btn-small">Add Expense</button>
          <button onclick="app.viewBudget('${budget._id}')" class="btn btn-small secondary">View Details</button>
        </div>
      </div>
    `).join('');
  }

  setupMealFeatures() {
    this.loadMealSuggestions();
  }

  async loadMealSuggestions() {
    try {
      const response = await this.apiCall('GET', '/meals/suggestions');
      if (response.success) {
        this.renderMealSuggestions(response.meals);
      }
    } catch (error) {
      console.error('Failed to load meal suggestions:', error);
    }
  }

  renderMealSuggestions(meals) {
    const mealList = document.getElementById('meal-suggestions');
    if (!mealList) return;

    mealList.innerHTML = meals.map(meal => `
      <div class="meal-item">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
        <div class="meal-meta">
          <span class="prep-time">${meal.prepTime} min prep</span>
          <span class="cook-time">${meal.cookTime} min cook</span>
          <span class="servings">${meal.servings} servings</span>
        </div>
        <div class="meal-tags">
          ${meal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  setupWellnessFeatures() {
    this.loadWellnessQuote();
  }

  async loadWellnessQuote() {
    try {
      const response = await this.apiCall('GET', '/wellness/quote');
      if (response.success) {
        this.renderWellnessQuote(response.quote);
      }
    } catch (error) {
      console.error('Failed to load wellness quote:', error);
    }
  }

  renderWellnessQuote(quote) {
    const quoteElement = document.getElementById('wellness-quote');
    if (quoteElement) {
      quoteElement.innerHTML = `
        <blockquote>${quote}</blockquote>
        <button onclick="app.trackMood()" class="btn">Track My Mood</button>
      `;
    }
  }

  async trackMood() {
    const mood = prompt('How are you feeling today? (excellent/good/neutral/bad/terrible)');
    if (mood) {
      try {
        const response = await this.apiCall('POST', '/wellness/mood', { mood });
        if (response.success) {
          this.showNotification('Mood tracked successfully!', 'success');
        }
      } catch (error) {
        console.error('Failed to track mood:', error);
        this.showNotification('Failed to track mood', 'error');
      }
    }
  }

  setupSettingsFeatures() {
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
    }

    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const response = await this.apiCall('GET', '/users/profile');
      if (response.success) {
        this.renderUserProfile(response.user);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }

  async handleProfileUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profileData = {
      displayName: formData.get('displayName'),
      email: formData.get('email'),
      preferences: {
        theme: formData.get('theme'),
        timezone: formData.get('timezone'),
        language: formData.get('language')
      }
    };

    try {
      const response = await this.apiCall('PUT', '/users/profile', profileData);
      if (response.success) {
        this.currentUser = response.user;
        this.showNotification('Profile updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      this.showNotification('Failed to update profile', 'error');
    }
  }

  renderUserProfile(user) {
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.querySelector('[name="displayName"]').value = user.displayName || '';
      profileForm.querySelector('[name="email"]').value = user.email || '';
      profileForm.querySelector('[name="theme"]').value = user.preferences?.theme || 'auto';
      profileForm.querySelector('[name="timezone"]').value = user.preferences?.timezone || 'UTC';
      profileForm.querySelector('[name="language"]').value = user.preferences?.language || 'en';
    }

    // Update profile display
    const profileDisplay = document.getElementById('profile-display');
    if (profileDisplay) {
      profileDisplay.innerHTML = `
        <div class="profile-info">
          <h2>${user.displayName}</h2>
          <p>${user.email}</p>
          <p>Plan: ${user.plan}</p>
          <p>Pi Balance: ${user.piBalance}</p>
        </div>
        <div class="profile-stats">
          <h3>Your Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">${user.stats.tasksCompleted}</span>
              <span class="stat-label">Tasks Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${user.stats.totalSavings}</span>
              <span class="stat-label">Pi Saved</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${user.stats.mealsPlanned}</span>
              <span class="stat-label">Meals Planned</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${user.stats.wellnessDays}</span>
              <span class="stat-label">Wellness Days</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  showSignInModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Sign in with Pi</h2>
        <form id="pi-signin-form">
          <div class="form-group">
            <label for="pi-username">Pi Username</label>
            <input type="text" id="pi-username" name="piUsername" required>
          </div>
          <div class="form-group">
            <label for="pi-user-id">Pi User ID</label>
            <input type="text" id="pi-user-id" name="piUserId" required>
          </div>
          <button type="submit" class="btn">Sign In</button>
        </form>
        <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    const form = modal.querySelector('#pi-signin-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const signinData = {
        piUsername: formData.get('piUsername'),
        piUserId: formData.get('piUserId')
      };

      try {
        const response = await this.apiCall('POST', '/auth/pi-signin', signinData);
        if (response.success) {
          this.token = response.token;
          this.currentUser = response.user;
          localStorage.setItem('smartsolve_token', this.token);
          modal.remove();
          this.setupAuthenticatedUI();
          this.showNotification('Welcome to SmartSolve!', 'success');
        }
      } catch (error) {
        console.error('Sign in failed:', error);
        this.showNotification('Sign in failed', 'error');
      }
    });
  }

  setupAuthenticatedUI() {
    // Update navigation
    const nav = document.querySelector('.app-bar nav');
    if (nav) {
      nav.innerHTML = `
        <a href="workspace.html">Workspace</a>
        <a href="settings.html">Settings</a>
        <button onclick="app.logout()" class="pi-signin">Sign Out</button>
      `;
    }

    // Update user info in header
    const userInfo = document.querySelector('.user-info');
    if (userInfo && this.currentUser) {
      userInfo.innerHTML = `
        <span>Welcome, ${this.currentUser.displayName}</span>
        <span class="pi-balance">${this.currentUser.piBalance} Pi</span>
      `;
    }
  }

  logout() {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('smartsolve_token');
    
    // Reset navigation
    const nav = document.querySelector('.app-bar nav');
    if (nav) {
      nav.innerHTML = `
        <a href="features.html">Features</a>
        <a href="pricing.html">Plans</a>
        <a href="signin.html" class="pi-signin">Sign in with Pi</a>
      `;
    }

    // Redirect to home
    window.location.href = '/';
  }

  async apiCall(method, endpoint, data = null) {
    const url = `${this.apiBase}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API call failed');
    }

    return result;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  }

  toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    answer.classList.toggle('active');
    question.classList.toggle('active');
  }

  toggleFooterSection(header) {
    const ul = header.nextElementSibling;
    const isActive = ul.classList.contains('active');
    
    ul.classList.toggle('active');
    header.classList.toggle('active');
    header.setAttribute('aria-expanded', !isActive);
  }

  // Initialize dark mode from localStorage
  initDarkMode() {
    if (localStorage.getItem('dark-mode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SmartSolveApp();
  window.app.initDarkMode();
});

// Dynamic copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear(); 