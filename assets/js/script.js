document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. SETUP VARIABEL & SELEKTOR
    // =========================================
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.getElementById('navbarNav'); // ID menu mobile

    // =========================================
    // 2. NAVBAR SCROLL EFFECT (Transparan -> Putih)
    // =========================================
    function handleNavbarScroll() {
        // Jika scroll lebih dari 50px ke bawah, tambah class 'scrolled'
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Jalankan fungsi saat di-scroll
    window.addEventListener('scroll', handleNavbarScroll);
    // Jalankan sekali saat loading halaman
    handleNavbarScroll();

    // =========================================
    // 3. ACTIVE MENU HIGHLIGHT (Scrollspy Manual)
    // =========================================
    // Menu navigasi akan menyala (active) sesuai posisi layar
    function highlightMenuOnScroll() {
        let scrollPosition = window.scrollY;
        
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href');
            
            // Cek apakah link mengarah ke ID halaman (#...) 
            if (sectionId.startsWith('#') && sectionId !== '#') {
                const section = document.querySelector(sectionId);
                
                if (section) {
                    // Offset 150px untuk kompensasi tinggi navbar
                    const sectionTop = section.offsetTop - 150; 
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        // Hapus class active dari semua link dulu
                        navLinks.forEach(l => l.classList.remove('active'));
                        // Tambah class active ke link yang sesuai
                        link.classList.add('active');
                    }
                }
            }
        });
    }

    // Jalankan fungsi highlight saat scroll
    window.addEventListener('scroll', highlightMenuOnScroll);

    // =========================================
    // 4. SMOOTH SCROLL & MOBILE MENU AUTO-CLOSE
    // =========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Hanya proses jika link adalah anchor internal (#)
            if (targetId.startsWith('#')) {
                e.preventDefault(); 

                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Hitung posisi scroll dikurangi tinggi Navbar (80px) agar judul tidak ketutup
                    const offsetPosition = targetElement.offsetTop - 80;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // --- KHUSUS MOBILE: Tutup menu setelah diklik ---
                // Cek apakah menu sedang terbuka (memiliki class 'show')
                if (navCollapse && navCollapse.classList.contains('show')) {
                    // Gunakan Bootstrap 5 API untuk menutup menu secara program
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        // Fallback jika instance belum ada
                        new bootstrap.Collapse(navCollapse).hide();
                    }
                }
            }
        });
    });

    // =========================================
    // 5. INISIALISASI AOS (ANIMASI)
    // =========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,      // Durasi animasi (ms)
            once: true,         // Animasi hanya jalan sekali 
            offset: 100,        // Mulai animasi sebelum elemen terlihat penuh
            easing: 'ease-out-cubic' 
        });
    } else {
        console.warn('Library AOS belum terload. Pastikan script CDN ada di HTML.');
    }

});
