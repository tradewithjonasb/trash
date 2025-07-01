// Feature flags for gradual rollout
export const FEATURE_FLAGS = {
    ENABLE_CRYPTO_DEPOSITS: true,
    ENABLE_FIAT_ONRAMP: false, // Coming soon
    ENABLE_VAULT_AUTOROLL: true,
    ENABLE_SOCIAL_LOGIN: false, // Coming soon
    ENABLE_ADVANCED_ANALYTICS: true,
  };
  
  // Get feature flag status
  export function isFeatureEnabled(feature: keyof typeof FEATURE_FLAGS): boolean {
    return FEATURE_FLAGS[feature];
  }