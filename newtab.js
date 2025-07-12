document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('webapp-frame');
    const loading = document.getElementById('loading');
    
    // Show iframe and hide loading when the webapp loads
    iframe.addEventListener('load', function() {
        loading.style.display = 'none';
        iframe.style.display = 'block';
        
        // Inject script to handle Google sign-in links
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Create a script to intercept Google sign-in clicks
            const script = iframeDoc.createElement('script');
            script.textContent = `
                // Function to handle clicks on Google sign-in elements
                function handleGoogleSignIn(event) {
                    const target = event.target;
                    const link = target.closest('a, button');
                    
                    if (link && (
                        link.href && (
                            link.href.includes('accounts.google.com') ||
                            link.href.includes('oauth/google') ||
                            link.href.includes('auth/google') ||
                            link.href.includes('signin/google') ||
                            link.href.includes('login/google')
                        ) ||
                        link.textContent.toLowerCase().includes('google') ||
                        link.className.toLowerCase().includes('google') ||
                        link.getAttribute('data-provider') === 'google'
                    )) {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        // Get the URL to open
                        let url = link.href;
                        if (!url || url === window.location.href) {
                            // If no href, try to construct the URL or use the current page
                            url = window.location.origin + '/auth/google';
                        }
                        
                        // Send message to parent window to open in new tab
                        window.parent.postMessage({
                            type: 'OPEN_GOOGLE_AUTH',
                            url: url
                        }, '*');
                        
                        return false;
                    }
                }
                
                // Add click listeners to the document
                document.addEventListener('click', handleGoogleSignIn, true);
                
                // Also watch for dynamically added elements
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) { // Element node
                                // Check if the added node or its children contain Google sign-in
                                const googleElements = node.querySelectorAll ? 
                                    node.querySelectorAll('a[href*="google"], button[data-provider="google"], *[class*="google"]') : [];
                                googleElements.forEach(function(el) {
                                    el.addEventListener('click', handleGoogleSignIn, true);
                                });
                            }
                        });
                    });
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            `;
            
            iframeDoc.head.appendChild(script);
        } catch (e) {
            // Cross-origin restrictions prevent direct access
            // In this case, we'll handle it differently
            console.log('Cannot directly inject script due to cross-origin restrictions');
        }
    });
    
    // Listen for messages from the iframe
    window.addEventListener('message', function(event) {
        // Verify origin for security
        if (event.origin !== 'https://sundays-pm.vercel.app') {
            return;
        }
        
        if (event.data.type === 'OPEN_GOOGLE_AUTH') {
            // Open Google auth in a new tab
            const newTab = window.open(event.data.url, '_blank');
            if (newTab) {
                newTab.focus();
            }
        }
    });
    
    // Handle iframe load errors
    iframe.addEventListener('error', function() {
        loading.innerHTML = `
            <div class="error">
                <h2>Unable to load Sundays PM</h2>
                <p>Please check your internet connection</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    });
    
    // Monitor iframe for navigation to Google auth URLs
    let lastUrl = iframe.src;
    setInterval(function() {
        try {
            const currentUrl = iframe.contentWindow.location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                
                // Check if navigating to Google auth
                if (currentUrl.includes('accounts.google.com') || 
                    currentUrl.includes('oauth/google') ||
                    currentUrl.includes('auth/google')) {
                    
                    // Open in new tab and navigate iframe back
                    window.open(currentUrl, '_blank');
                    iframe.src = 'https://sundays-pm.vercel.app/';
                }
            }
        } catch (e) {
            // Cross-origin restrictions prevent access to iframe URL
            // This is expected and normal
        }
    }, 1000);
    
    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+R or F5 to refresh the iframe
        if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
            e.preventDefault();
            iframe.src = iframe.src;
        }
    });
});
