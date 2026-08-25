import type { CookieConsentConfig } from 'vanilla-cookieconsent';

function updateGoogleConsent(categories: string[]) {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        const isAnalyticsGranted = categories.includes('analytics');
        
        (window as any).gtag('consent', 'update', {
            analytics_storage: isAnalyticsGranted ? 'granted' : 'denied',
            // Optional: link ad consent to analytics state if desired
            ad_storage: isAnalyticsGranted ? 'granted' : 'denied',
            ad_user_data: isAnalyticsGranted ? 'granted' : 'denied',
            ad_personalization: isAnalyticsGranted ? 'granted' : 'denied'
        });
    }
}

export const config: CookieConsentConfig = {
    // Triggered on first-load if consent was already given, or right after choice
    onConsent: ({ cookie }) => {
        updateGoogleConsent(cookie.categories);
    },

    // Triggered whenever the user modifies preferences inside the modal
    onChange: ({ cookie }) => {
        updateGoogleConsent(cookie.categories);
    },

    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {}
    },
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "We use cookies",
                    description: "This site uses cookies to provide you with the best possible experience. Cookies allow us to analyse user behaviour in order to constantly improve the website for you.",
                    closeIconLabel: "",
                    acceptAllBtn: "Accept",
                    acceptNecessaryBtn: "Reject cookies",
                    showPreferencesBtn: "",
                    footer: ""
                },
                preferencesModal: {
                //     title: "Preferences Center",
                //     closeIconLabel: "Close modal",
                //     acceptAllBtn: "Accept all",
                //     acceptNecessaryBtn: "Reject all",
                //     savePreferencesBtn: "Save preferences",
                //     serviceCounterLabel: "Service|Services",
                    sections: [
                //         {
                //             title: "Cookie Usage",
                //             description: "This site usess cookies to provide you with the best possible experience. Cookies allow us to analyse user behaviour in order to constantly improve the website for you."
                //         }
                    ]
                }
            }
        }
    }
}
