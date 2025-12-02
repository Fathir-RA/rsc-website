document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // ===================================================
    // 1. MOBILE MENU TOGGLE
    // ===================================================
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Cek status expanded
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            
            // Toggle atribut dan class 'active'
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

    // ===================================================
    // 2. SMOOTH SCROLLING & MENU CLOSE (REVISI PERBAIKAN BUG)
    // ===================================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            if (this.hash !== "") {
                e.preventDefault(); 
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const mainHeader = document.querySelector('.main-header');
                
                // --- PERBAIKAN BUG SCROLLING UTAMA ---
                // Kita ambil tinggi header saat ini (sekitar 60px di desktop/mobile)
                // Tambahkan 5px sebagai margin ekstra agar konten tidak menempel ke header.
                const headerHeight = mainHeader.offsetHeight + 5; 
                
                if (targetElement) {
                    
                    // Gunakan scrollIntoView dengan opsi 'start' dan offset top yang dikurangi tinggi header
                    // Catatan: scrollIntoView tidak mendukung offset, jadi kita pakai window.scrollTo
                    window.scrollTo({
                        // Scroll ke posisi elemen dikurangi tinggi header
                        top: targetElement.offsetTop - headerHeight, 
                        behavior: 'smooth'
                    });
                }

                // Tutup menu mobile setelah klik 
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===================================================
    // 3. HERO SECTION SLIDER
    // ===================================================
    const sliderInner = document.querySelector('.hero-slider-inner');
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const allDots = []; // Array baru untuk menyimpan elemen dot
    let currentSlide = 0;
    let slideInterval;

    function initializeSlider() {
        // 1. Buat Dots Navigasi
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = index;
            
            // Simpan dot ke array untuk akses mudah
            allDots.push(dot); 
            
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });

        // 2. Tampilkan slide pertama (sudah otomatis, tidak perlu class active di slide)

        // 3. Atur Timer Otomatis
        startTimer();
    }

    function goToSlide(n) {
        // 1. Hapus kelas 'active' dari dot yang lama
        allDots[currentSlide].classList.remove('active');
        
        // 2. Hitung index slide baru (modulus untuk loop tak terbatas)
        currentSlide = (n + slides.length) % slides.length; 
        
        // 3. Geser Container dengan Transform
        // Setiap slide berjarak 100% dari lebar container
        const offset = currentSlide * 100;
        sliderInner.style.transform = `translateX(-${offset}%)`; // Geser secara horizontal

        // 4. Tambahkan kelas 'active' ke dot yang baru
        allDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    // ... (fungsi prevSlide, startTimer, resetTimer tetap sama) ...

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startTimer() {
        slideInterval = setInterval(nextSlide, 3000); // Ganti setiap 3 detik
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Event Listeners untuk Tombol
    if (slides.length > 1) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        initializeSlider();
    }

});
