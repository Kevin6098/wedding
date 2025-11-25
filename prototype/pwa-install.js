// PWA Install and Service Worker Registration
let deferredPrompt;
let installPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Install Prompt Handling
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show install prompt UI
  showInstallPrompt();
});

// Show install prompt
function showInstallPrompt() {
  installPrompt = document.getElementById('installPrompt');
  if (installPrompt && !localStorage.getItem('installPromptDismissed')) {
    installPrompt.classList.remove('hidden');
  }
}

// Install button click
const installBtn = document.getElementById('installBtn');
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      // Fallback for iOS
      showIOSInstructions();
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt
    deferredPrompt = null;
    hideInstallPrompt();
  });
}

// Dismiss install prompt
const dismissInstall = document.getElementById('dismissInstall');
if (dismissInstall) {
  dismissInstall.addEventListener('click', () => {
    localStorage.setItem('installPromptDismissed', 'true');
    hideInstallPrompt();
  });
}

function hideInstallPrompt() {
  installPrompt = document.getElementById('installPrompt');
  if (installPrompt) {
    installPrompt.classList.add('hidden');
  }
}

// Check if app is already installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  hideInstallPrompt();
  deferredPrompt = null;
});

// iOS Install Instructions
function showIOSInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  
  if (isIOS && !isStandalone) {
    alert('To install this app on your iPhone/iPad:\n\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right');
  } else if (!isStandalone) {
    // Android or other
    alert('To install this app:\n\n1. Look for the install icon in your browser\n2. Or go to browser menu > Install App\n3. Or wait for the install prompt to appear');
  }
}

// Show install prompt after a delay (if not dismissed)
setTimeout(() => {
  if (!localStorage.getItem('installPromptDismissed') && !window.matchMedia('(display-mode: standalone)').matches) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      // For iOS, show instructions after delay
      setTimeout(showIOSInstructions, 3000);
    }
  }
}, 5000);

