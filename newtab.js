document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('webapp-frame');
    const loading = document.getElementById('loading');
    
    // Show iframe and hide loading when the webapp loads
    iframe.addEventListener('load', function() {
        loading.style.display = 'none';
        iframe.style.display = 'block';
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
    
    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+R or F5 to refresh the iframe
        if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
            e.preventDefault();
            iframe.src = iframe.src;
        }
    });
});
