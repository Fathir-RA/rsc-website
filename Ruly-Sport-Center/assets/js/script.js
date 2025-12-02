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
    // 2. SMOOTH SCROLLING & MENU CLOSE
    // ===================================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            // Pastikan link memiliki hash (#)
            if (this.hash !== "") {
                e.preventDefault(); // Mencegah lompatan standar
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Hitung posisi scroll dengan mempertimbangkan tinggi header sticky
                    const headerHeight = mainNav.offsetHeight; 
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight, 
                        behavior: 'smooth'
                    });
                }

                // Tutup menu mobile setelah klik (untuk pengalaman pengguna yang lebih baik)
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});