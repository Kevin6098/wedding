// Photo Sharing functionality
const STORAGE_KEY = 'wedding_guest_photos';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const previewContainer = document.getElementById('previewContainer');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
    const guestGallery = document.getElementById('guestGallery');
    const emptyGallery = document.getElementById('emptyGallery');

    // Load existing photos from localStorage
    loadGuestPhotos();

    // Handle file input change
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            handleFileUpload(files);
        });
    }

    // Select All button
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.photo-checkbox');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            
            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
            });
            
            selectAllBtn.textContent = allChecked ? 'Select All' : 'Deselect All';
        });
    }

    // Download Selected button
    if (downloadSelectedBtn) {
        downloadSelectedBtn.addEventListener('click', function() {
            downloadSelectedPhotos();
        });
    }

    // Load and display guest photos
    function loadGuestPhotos() {
        const photos = getStoredPhotos();
        
        if (photos.length === 0) {
            if (emptyGallery) emptyGallery.classList.remove('hidden');
            if (guestGallery) guestGallery.innerHTML = '';
            return;
        }

        if (emptyGallery) emptyGallery.classList.add('hidden');
        if (guestGallery) {
            guestGallery.innerHTML = '';
            photos.forEach((photoData, index) => {
                const photoItem = createPhotoItem(photoData, index);
                guestGallery.appendChild(photoItem);
            });
        }
    }

    // Handle file upload
    function handleFileUpload(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Show preview
                    showPreview(e.target.result, file.name);
                    
                    // Store in localStorage
                    storePhoto(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Clear input
        if (photoInput) photoInput.value = '';
    }

    // Show preview thumbnail
    function showPreview(imageSrc, fileName) {
        if (!previewContainer) return;
        
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = fileName;
        
        previewItem.appendChild(img);
        previewContainer.appendChild(previewItem);
    }

    // Store photo in localStorage
    function storePhoto(imageSrc, fileName) {
        const photos = getStoredPhotos();
        photos.push({
            src: imageSrc,
            name: fileName || `photo_${Date.now()}.jpg`,
            timestamp: Date.now()
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
        
        // Reload gallery
        loadGuestPhotos();
    }

    // Get stored photos from localStorage
    function getStoredPhotos() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading photos from storage:', e);
            return [];
        }
    }

    // Create photo item element
    function createPhotoItem(photoData, index) {
        const item = document.createElement('div');
        item.className = 'guest-photo-item';
        
        const img = document.createElement('img');
        img.src = photoData.src;
        img.alt = photoData.name;
        img.onclick = () => openModal(photoData.src);
        
        const controls = document.createElement('div');
        controls.className = 'photo-controls';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'photo-checkbox';
        checkbox.dataset.index = index;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'photo-download-btn';
        downloadBtn.textContent = 'Download';
        downloadBtn.onclick = (e) => {
            e.stopPropagation();
            downloadSinglePhoto(photoData);
        };
        
        controls.appendChild(checkbox);
        controls.appendChild(downloadBtn);
        
        item.appendChild(img);
        item.appendChild(controls);
        
        return item;
    }

    // Download single photo
    function downloadSinglePhoto(photoData) {
        const link = document.createElement('a');
        link.href = photoData.src;
        link.download = photoData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Download selected photos as ZIP
    async function downloadSelectedPhotos() {
        const checkboxes = document.querySelectorAll('.photo-checkbox:checked');
        
        if (checkboxes.length === 0) {
            alert('Please select at least one photo to download.');
            return;
        }

        try {
            const photos = getStoredPhotos();
            const zip = new JSZip();
            
            // Add selected photos to ZIP
            for (const checkbox of checkboxes) {
                const index = parseInt(checkbox.dataset.index);
                const photoData = photos[index];
                
                if (photoData) {
                    // Convert data URL to blob
                    const response = await fetch(photoData.src);
                    const blob = await response.blob();
                    zip.file(photoData.name, blob);
                }
            }
            
            // Generate ZIP file
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            // Download ZIP
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = `wedding-photos-${Date.now()}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            URL.revokeObjectURL(link.href);
            
            alert(`Downloaded ${checkboxes.length} photo(s) as ZIP file!`);
        } catch (error) {
            console.error('Error creating ZIP:', error);
            alert('Error creating ZIP file. Please try again.');
        }
    }
});


