# 💍 Wedding App - Progressive Web App (PWA)

A beautiful, installable wedding app that guests can download on their phones! Works offline and feels like a native app.

## 📱 **INSTALLATION INSTRUCTIONS FOR GUESTS**

### **For Android Phones:**
1. Open the website in **Chrome browser**
2. You'll see an **"Install App"** prompt at the bottom (or in the browser menu)
3. Tap **"Install"** or **"Add to Home Screen"**
4. The app will be installed and appear on your home screen!

### **For iPhone/iPad:**
1. Open the website in **Safari browser**
2. Tap the **Share button** (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right
5. The app icon will appear on your home screen!

### **For Other Browsers:**
- Look for an install icon in the address bar
- Or go to browser menu → **"Install App"** or **"Add to Home Screen"**

## 🎯 **Key Features**

✅ **Installable** - Download to phone like a real app  
✅ **Works Offline** - View content even without internet  
✅ **Fully Responsive** - Optimized for all phone sizes  
✅ **Touch-Friendly** - Large buttons, easy navigation  
✅ **Fast Loading** - Cached for instant access  

## 📁 Project Structure

```
wedding/
├── index.html          # Home page with hero section
├── groom.html          # Groom page with details
├── bride.html          # Bride page with details
├── gallery.html        # Photo gallery with modal viewer
├── videos.html         # YouTube video embeds
├── rsvp.html           # RSVP form (frontend only)
├── photo-share.html    # Photo sharing feature
├── styles.css          # Main stylesheet
├── script.js           # General JavaScript functionality
├── photo-share.js      # Photo sharing functionality
├── pwa-install.js      # PWA installation handler
├── service-worker.js   # Offline support
├── manifest.json       # App manifest for installation
├── assets/             # Image assets and app icons
└── README.md           # This file
```

## 🚀 **Getting Started (For Hosting)**

### **Option 1: Simple Web Server (Recommended)**
1. **Upload all files** to a web hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. **Access via HTTPS** (required for PWA installation)
3. Guests can visit the URL and install the app

### **Option 2: Local Testing**
1. Use a local server (Python, Node.js, etc.)
2. For testing PWA features, use HTTPS (required)
3. Example with Python:
   ```bash
   python3 -m http.server 8000
   ```

### **Option 3: Direct File Opening**
- Can open `index.html` directly, but PWA features won't work
- For full PWA functionality, use a web server with HTTPS

## ✨ **App Features**

### **Core Pages**
- **Home Page**: Hero section with wedding details and quick links
- **Groom/Bride Pages**: Individual pages with photos, wedding details, and map links
- **Gallery**: Photo grid with fullscreen modal viewer
- **Videos**: 2×2 grid of YouTube video embeds
- **RSVP**: Form for guest responses (logs to console, no backend)

### **Photo Sharing Feature**
- **Upload Photos**: Multiple file selection with instant preview
- **Local Storage**: Photos stored in browser localStorage (for demo)
- **Guest Gallery**: View all uploaded photos in a grid
- **Download Options**:
  - Individual photo download
  - Select multiple photos and download as ZIP
  - Select All / Deselect All functionality

## 🎨 **Design Theme**

- **Colors**: Pastel pink, cream, champagne gold, soft white
- **Typography**: Elegant serif for headings, clean sans-serif for content
- **Animations**: Fade-in effects, smooth scrolling, hover effects
- **Responsive**: Optimized for all screen sizes (phones, tablets, desktops)

## 📱 **Mobile Optimizations**

- **Touch-Friendly**: All buttons are at least 44px tall (Apple/Google guidelines)
- **Safe Areas**: Supports notched devices (iPhone X and newer)
- **Viewport Fit**: Full screen on all devices
- **Responsive Breakpoints**: 
  - Mobile: < 480px (single column)
  - Tablet: 480px - 768px (2 columns)
  - Desktop: > 768px (multi-column)

## 📝 **Customization**

### **Update Wedding Details**
Edit the following files to customize:
- `groom.html` - Update groom name and details
- `bride.html` - Update bride name and details
- `index.html` - Update wedding date and location

### **Change App Name**
Edit `manifest.json`:
```json
{
  "name": "Your Wedding App Name",
  "short_name": "Wedding"
}
```

### **Change Colors**
Edit `styles.css` and modify the CSS variables:
```css
:root {
    --pastel-pink: #F5D7DA;
    --cream: #F5E6D3;
    --champagne-gold: #D4AF37;
    --soft-white: #FFFEF9;
}
```

### **Update App Icons**
Replace the icon files in `assets/`:
- `icon-72x72.png` through `icon-512x512.png`
- Use square images (they'll be automatically masked)

### **Update YouTube Videos**
Edit `videos.html` and replace the YouTube embed URLs with your own.

## 🔧 **Technical Details**

### **PWA Requirements**
- **HTTPS**: Required for service worker and installation (except localhost)
- **Manifest**: `manifest.json` defines app metadata
- **Service Worker**: Enables offline functionality
- **Icons**: Multiple sizes for different devices

### **Dependencies**
- **Tailwind CSS**: Loaded via CDN (for utility classes, though custom CSS is primary)
- **JSZip**: Loaded via CDN for ZIP file creation in photo sharing

### **Browser Compatibility**
- **Android**: Chrome, Samsung Internet, Firefox
- **iOS**: Safari 11.3+ (supports "Add to Home Screen")
- **Desktop**: Chrome, Edge, Firefox, Safari

### **Offline Support**
- Service worker caches all pages and assets
- App works offline after first visit
- Photos stored in localStorage persist offline

### **Photo Sharing Storage**
- Photos are stored in browser `localStorage` (limited to ~5-10MB)
- For production, you would need a backend to store photos properly
- Current implementation is for demo purposes only

## 🎯 **Next Steps (Optional Enhancements)**

- Add actual PDF generation for invitations
- Connect RSVP form to a backend
- Add multilingual support (EN/CN/JP)
- Implement QR code login for guests
- Add dark mode toggle
- Connect photo sharing to cloud storage
- Add photo filters/editing
- Add guest book feature
- Push notifications for updates

## 📄 **Deployment**

### **Recommended Hosting Services:**
- **GitHub Pages** (free, HTTPS included)
- **Netlify** (free, easy deployment)
- **Vercel** (free, great for static sites)
- **Firebase Hosting** (free tier available)

### **Important Notes:**
- Must be served over **HTTPS** (except localhost for testing)
- All files must be in the same directory or adjust paths in `manifest.json`
- Service worker must be in the root directory

## 📄 **License**

This is a prototype project. Feel free to customize and use for your wedding!

---

Made with ❤️ for JS ♥ PS Wedding
