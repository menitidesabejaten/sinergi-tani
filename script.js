document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. DARK MODE TOGGLE ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const iconTheme = themeToggleBtn.querySelector("i");
    
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            htmlElement.setAttribute("data-theme", "dark");
            iconTheme.classList.replace("fa-moon", "fa-sun");
        }
    } catch (e) { console.warn("localStorage block", e); }
    
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        try {
            if (currentTheme === "dark") {
                htmlElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                iconTheme.classList.replace("fa-sun", "fa-moon");
            } else {
                htmlElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                iconTheme.classList.replace("fa-moon", "fa-sun");
            }
        } catch (e) {
            if (currentTheme === "dark") {
                htmlElement.removeAttribute("data-theme");
                iconTheme.classList.replace("fa-sun", "fa-moon");
            } else {
                htmlElement.setAttribute("data-theme", "dark");
                iconTheme.classList.replace("fa-moon", "fa-sun");
            }
        }
    });

    // --- 2. HAMBURGER MENU & DROPDOWN ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");
    const navRight = document.querySelector(".nav-right");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navRight.classList.toggle("mobile-active");
        const isIconMenu = hamburger.querySelector("i").classList.contains("fa-bars");
        if(isIconMenu){
            hamburger.querySelector("i").classList.replace("fa-bars", "fa-times");
        } else {
            hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
        }
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", function(e) {
            if(window.innerWidth <= 1250) {
                if(e.target.classList.contains("fa-chevron-down") || e.target.parentElement.classList.contains("dropdown")){
                    e.preventDefault();
                    this.classList.toggle("open");
                }
            }
        });
    });

    // --- 3. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "0.5rem 1.5%";
            navbar.style.boxShadow = "var(--shadow-md)";
        } else {
            navbar.style.padding = "0 1.5%";
            navbar.style.boxShadow = "var(--shadow-sm)";
        }
    });

    // --- 4. SCROLL ANIMATION ---
    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- 5. PTM MODAL LOGIC ---
    const ptmModal = document.getElementById('ptm-modal');
    const ptmClose = document.getElementById('ptm-close');
    const ptmCloseMob = document.getElementById('ptm-close-mob');
    const ptmBtns = document.querySelectorAll('.btn-ptm');

    ptmBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('ptm-title').textContent = btn.getAttribute('data-title');
            document.getElementById('ptm-badge-modal').textContent = 'PTM ' + btn.getAttribute('data-ptm');
            document.getElementById('ptm-img').src = btn.getAttribute('data-img');
            document.getElementById('ptm-desc').textContent = btn.getAttribute('data-desc');
            
            ptmModal.classList.add('show');
            if (window.innerWidth > 850) { document.body.style.overflow = 'hidden'; }
        });
    });

    const closePtmModal = () => {
        ptmModal.classList.remove('show');
        if (window.innerWidth > 850) { document.body.style.overflow = 'auto'; }
    };

    ptmClose.addEventListener('click', closePtmModal);
    ptmCloseMob.addEventListener('click', closePtmModal);
    ptmModal.addEventListener('click', (e) => {
        if(e.target === ptmModal) closePtmModal();
    });

    // =========================================
    //  INTERACTIVE OWL MASCOT SYSTEM
    // =========================================
    const OWL_IMAGES = [
        'https://res.cloudinary.com/drxc5e7gf/image/upload/q_auto,f_auto/v1787852921/Desain_tanpa_judul-removebg-preview_rg07lx.png',
        'https://res.cloudinary.com/drxc5e7gf/image/upload/q_auto,f_auto/v1787880579/Gemini_Generated_Image_2id6wx2id6wx2id6-removebg-preview_olwtbr.png',
        'https://res.cloudinary.com/drxc5e7gf/image/upload/q_auto,f_auto/v1787880580/Gemini_Generated_Image_cc0pxrcc0pxrcc0p-removebg-preview_ttafa4.png',
        'https://res.cloudinary.com/drxc5e7gf/image/upload/q_auto,f_auto/v1787880581/Gemini_Generated_Image_iihwgkiihwgkiihw-removebg-preview_idqap9.png',
        'https://res.cloudinary.com/drxc5e7gf/image/upload/q_auto,f_auto/v1787880580/Gemini_Generated_Image_kginynkginynkgin-removebg-preview_iunykg.png'
    ];
    
    const OWL_EFFECTS = [ ' ✨ ', ' ❓ ', ' ❗ ', ' ☁️ ', ' 💨 ', '' ];
    let currentOwlIndex = 0;
    
    const sysContainer = document.getElementById('owl-system');
    const wrap = document.getElementById('owl-wrapper');
    const img = document.getElementById('owl-img');
    const fx = document.getElementById('owl-fx');
    
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    function runOwlCycle() {
        if (isReducedMotion || !sysContainer) return;
        
        img.src = OWL_IMAGES[currentOwlIndex];
        currentOwlIndex = (currentOwlIndex + 1) % OWL_IMAGES.length;
        
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const owlSize = vw < 768 ? 90 : 120;
        
        img.style.width = owlSize + 'px';
        img.style.height = owlSize + 'px';
        
        let side = randInt(0, 3);
        
        let startX, startY, endX, endY, rot;
        let scaleX = 1;
        const marginPadding = rand(20, 150);
        const edgeMargin = 15;
        
        if (side === 0) {
            startX = rand(marginPadding, vw - owlSize - marginPadding); startY = -owlSize - 50; endX = startX; endY = edgeMargin; rot = 180;
        } else if (side === 1) {
            startX = vw + 50; startY = rand(marginPadding, vh - owlSize - marginPadding); endX = vw - owlSize - edgeMargin; endY = startY; rot = -90; scaleX = -1; 
        } else if (side === 2) {
            startX = rand(marginPadding, vw - owlSize - marginPadding); startY = vh + 50; endX = startX; endY = vh - owlSize - edgeMargin; rot = 0;
        } else if (side === 3) {
            startX = -owlSize - 50; startY = rand(marginPadding, vh - owlSize - marginPadding); endX = edgeMargin; endY = startY; rot = 90; scaleX = -1; 
        }
        
        const animDuration = 600; 
        const holdDuration = 3500; 
        const delayBeforeNext = 3500; 
        
        wrap.style.transition = 'none'; 
        wrap.style.transform = `translate(${startX}px, ${startY}px)`; 
        wrap.style.opacity = '0'; 
        wrap.classList.remove('owl-sway');
        img.style.transform = `scaleX(${scaleX}) rotate(${rot}deg)`; 
        fx.className = ''; fx.innerHTML = '';
        
        void wrap.offsetWidth;
        
        wrap.style.transition = `all ${animDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`; 
        wrap.style.transform = `translate(${endX}px, ${endY}px)`; 
        wrap.style.opacity = '1';
        
        const chosenFx = OWL_EFFECTS[randInt(0, OWL_EFFECTS.length - 1)];
        if (chosenFx !== '') { setTimeout(() => { fx.innerHTML = chosenFx; fx.style.top = (side === 2) ? '10%' : '80%'; fx.className = 'owl-fx-pop'; }, animDuration / 2); }
        
        setTimeout(() => { wrap.classList.add('owl-sway'); }, animDuration);
        
        setTimeout(() => {
            wrap.classList.remove('owl-sway'); 
            wrap.style.transition = `all ${animDuration}ms ease-in`; 
            wrap.style.transform = `translate(${startX}px, ${startY}px)`;
            wrap.style.opacity = '0';
            setTimeout(runOwlCycle, animDuration + delayBeforeNext);
        }, animDuration + holdDuration);
    }
    
    setTimeout(runOwlCycle, 2000);
});