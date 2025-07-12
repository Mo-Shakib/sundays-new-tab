# Sundays PM New Tab Extension

A Chrome extension that replaces your new tab page with the Sundays PM web application, providing seamless access to your productivity tools every time you open a new tab.

## 🌟 Features

- **Instant Access**: Opens Sundays PM webapp automatically in every new tab

## 📦 Installation

### Install from Chrome Web Store
*Coming soon...*

### Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone <repository-url>
   cd sundays-new-tab
   ```

2. **Enable Developer Mode in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the project folder containing `manifest.json`
   - The extension will be installed and active immediately

4. **Verify Installation**
   - Open a new tab to see Sundays PM webapp
   - The extension icon should appear in your Chrome toolbar

## 🛠️ Development

### Project Structure
```
sundays-new-tab/
├── manifest.json       # Extension configuration
├── newtab.html         # New tab page HTML
├── newtab.js          # Main functionality and event handling
├── styles.css         # Styling for the new tab page
├── icon.png           # Extension icon
├── LICENSE           # License file
└── README.md         # This file
```

### Key Technologies
- **Manifest V3**: Uses the latest Chrome extension manifest version
- **iframe Integration**: Embeds the Sundays PM webapp securely
- **PostMessage API**: Handles cross-origin communication for authentication
- **Mutation Observer**: Monitors dynamic content changes in the webapp

### Configuration

The extension is configured in `manifest.json`:
- **Permissions**: `tabs` for new tab override
- **Host Permissions**: Access to Sundays PM and Google authentication domains
- **Chrome URL Override**: Replaces the default new tab page

### Authentication Handling

The extension includes sophisticated Google authentication handling:
- Detects Google sign-in attempts within the iframe
- Automatically opens authentication flows in new tabs
- Monitors navigation to authentication URLs
- Prevents authentication loops and security issues

## 🔧 Customization

### Changing the Target Webapp
To point to a different webapp, update the iframe source in `newtab.html`:
```html
<iframe 
    id="webapp-frame"
    src="https://your-webapp-url.com/"
    frameborder="0"
    allowfullscreen>
</iframe>
```

And update the host permissions in `manifest.json`:
```json
"host_permissions": [
    "https://your-webapp-url.com/*"
]
```

### Styling
Modify `styles.css` to customize the appearance:
- Loading spinner design
- Error message styling
- Container layout and sizing

## 🚀 Building for Production

1. **Verify all files are included**
2. **Test thoroughly in Chrome**
3. **Create a ZIP file for Chrome Web Store submission**:
   ```bash
   zip -r sundays-new-tab-extension.zip . -x "*.git*" "*.DS_Store*" "node_modules/*"
   ```

## 🐛 Troubleshooting

### Common Issues

**Extension not loading webapp:**
- Check if the Sundays PM domain is accessible
- Verify internet connection
- Try refreshing with `Ctrl+R`

**Google authentication not working:**
- The extension automatically opens auth in new tabs
- Ensure pop-ups are not blocked for the extension
- Check that Google auth permissions are granted

**Performance issues:**
- The iframe loads a full webapp, so performance depends on the target site
- Clear browser cache if experiencing slowdowns

### Debug Mode
To debug the extension:
1. Right-click on the new tab page and select "Inspect"
2. Check the Console tab for any error messages
3. Monitor Network tab for failed requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:
- Check the [troubleshooting section](#-troubleshooting)
- Open an issue on the repository
- Contact the development team

## 🔄 Updates

The extension automatically loads the latest version of the Sundays PM webapp. No manual updates required for the webapp content.

For extension updates:
- Automatic updates via Chrome Web Store (when published)
- Manual updates by replacing files in developer mode

---

**Made with ❤️ for productivity enthusiasts**