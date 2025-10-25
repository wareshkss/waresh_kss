// Language Management System
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage();
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`lang/${this.currentLang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Arabic if loading fails
            if (this.currentLang !== 'ar') {
                this.currentLang = 'ar';
                await this.loadTranslations();
            }
        }
    }

    applyLanguage() {
        // Update HTML attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update font family
        document.body.style.fontFamily = this.currentLang === 'ar' 
            ? "'Cairo', sans-serif" 
            : "'Inter', 'Roboto', sans-serif";

        // Update all elements with data-key attributes
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.translations[key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = this.translations[key];
                } else if (element.tagName === 'INPUT' && element.type === 'email') {
                    element.placeholder = this.translations[key];
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = this.translations[key];
                } else {
                    element.textContent = this.translations[key];
                }
            }
        });

        // Update language switcher button
        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.innerHTML = `<i class="fas fa-globe"></i> ${this.currentLang === 'ar' ? 'EN' : 'AR'}`;
        }

        // Update page title
        document.title = this.translations.brand_name || 'Al-Khwarizmi Smart Solutions';

        // Reinitialize sliders and carousels for RTL
        this.reinitializeSliders();
    }

    reinitializeSliders() {
        // Reinitialize any sliders or carousels that need RTL support
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Reinitialize any other components that need RTL support
        this.updateSliderDirection();
    }

    updateSliderDirection() {
        // Update slider direction based on language
        const sliders = document.querySelectorAll('.slider, .carousel');
        sliders.forEach(slider => {
            if (this.currentLang === 'ar') {
                slider.setAttribute('data-rtl', 'true');
            } else {
                slider.removeAttribute('data-rtl');
            }
        });
    }

    async switchLanguage() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('language', this.currentLang);
        await this.loadTranslations();
        this.applyLanguage();
        
        // Show notification
        this.showNotification(
            this.currentLang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English'
        );
    }

    setupEventListeners() {
        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
    }

    showNotification(message) {
        const toast = document.getElementById('notificationToast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
    }

    getTranslation(key) {
        return this.translations[key] || key;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;
