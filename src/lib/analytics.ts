// Privacy-focused analytics (no cookies, no tracking)
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  // Only track in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics Event:', eventName, properties);
    return;
  }

  // Send to your analytics endpoint (Plausible, Umami, etc.)
  // Example: plausible('event', { props: { eventName, ...properties } });
  
  console.log('Track:', eventName, properties);
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('Page View:', url);
    return;
  }

  // Send page view to analytics
  console.log('Page View:', url);
};
