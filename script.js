document.addEventListener('DOMContentLoaded', function() { 
    // 通用轮播逻辑
    const slides = document.querySelectorAll('.slide'); 
    let currentSlide = 0; 
 
    function showSlide(n) { 
        slides.forEach(slide => slide.classList.remove('active')); 
        currentSlide = (n + slides.length) % slides.length; 
        slides[currentSlide].classList.add('active'); 
    } 
 
    function nextSlide() { 
        showSlide(currentSlide + 1); 
    } 
 
    let slideInterval = setInterval(nextSlide, 5000); 
 
    const slider = document.querySelector('.slider'); 
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval)); 
    slider.addEventListener('mouseleave', () => { 
        clearInterval(slideInterval); 
        slideInterval = setInterval(nextSlide, 5000); 
    }); 
 
    if (slides.length > 0) { 
        showSlide(0); 
    }

    // 公众号轮播逻辑
    const wechatSlides = document.querySelectorAll('.wechat-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentWechatSlide = 0;

    function showWechatSlide(n) {
        wechatSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentWechatSlide = (n + wechatSlides.length) % wechatSlides.length;
        wechatSlides[currentWechatSlide].classList.add('active');
        dots[currentWechatSlide].classList.add('active');
    }

    function nextWechatSlide() {
        showWechatSlide(currentWechatSlide + 1);
    }

    function prevWechatSlide() {
        showWechatSlide(currentWechatSlide - 1);
    }

    let wechatSlideInterval = setInterval(nextWechatSlide, 5000);

    prevBtn.addEventListener('click', () => {
        clearInterval(wechatSlideInterval);
        prevWechatSlide();
        wechatSlideInterval = setInterval(nextWechatSlide, 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(wechatSlideInterval);
        nextWechatSlide();
        wechatSlideInterval = setInterval(nextWechatSlide, 5000);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(wechatSlideInterval);
            const index = parseInt(dot.getAttribute('data-index'));
            showWechatSlide(index);
            wechatSlideInterval = setInterval(nextWechatSlide, 5000);
        });
    });

    const wechatSlider = document.querySelector('.wechat-slider-container');
    wechatSlider.addEventListener('mouseenter', () => clearInterval(wechatSlideInterval));
    wechatSlider.addEventListener('mouseleave', () => {
        clearInterval(wechatSlideInterval);
        wechatSlideInterval = setInterval(nextWechatSlide, 5000);
    });

    if (wechatSlides.length > 0) {
        showWechatSlide(0);
    }
    
    // 社交图标与模态框逻辑
    const socialIcons = document.querySelectorAll('.social-icon'); 
    const modal = document.getElementById('qr-modal'); 
    const modalImage = document.getElementById('qr-code-image'); 
    const platformName = document.getElementById('platform-name'); 
    const closeModal = document.querySelector('.close-modal'); 
 
    const platformNames = { 
        weixin: '微信', 
        github: 'GitHub', 
        twitter: 'Twitter', 
        envelope: '邮箱', 
        weibo: '微博' 
    }; 
 
    socialIcons.forEach(icon => { 
        icon.addEventListener('click', function(e) { 
            e.preventDefault(); 
            const href = this.getAttribute('href');
            const platform = this.getAttribute('data-platform') || 
                this.querySelector('i').className.match(/fa-([a-z]+)/)[1]; 
            const qrSrc = this.getAttribute('data-qr');
        
            // 处理邮箱/外部链接
            if (platform === 'envelope' || (href && href !== '#')) { 
                if (platform === 'envelope') {
                    window.location.href = `mailto:${href.substring(href.indexOf(':') + 1)}`;
                } else {
                    window.open(href, '_blank');
                }
                return; 
            } 
        
            // 显示二维码模态框
            if (href === '#' && qrSrc) { 
                modalImage.src = qrSrc; 
                platformName.textContent = platformNames[platform] || platform; 
                modal.style.display = 'block'; 
            }
        
            // 点击波纹效果
            this.classList.add('ripple'); 
            setTimeout(() => this.classList.remove('ripple'), 500); 
        }); 
    }); 
 
    // 关闭模态框
    closeModal.addEventListener('click', () => { 
        modal.style.display = 'none'; 
    }); 
 
    window.addEventListener('click', (e) => { 
        if (e.target === modal) { 
            modal.style.display = 'none'; 
        } 
    }); 
 
    // 页面加载淡入效果
    document.body.style.opacity = '0'; 
    document.body.style.transition = 'opacity 0.5s ease-out'; 
 
    window.addEventListener('load', function() { 
        document.body.style.opacity = '1'; 
    }); 
 
    // 元素进入视口动画
    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    }; 
 
    const observer = new IntersectionObserver((entries) => { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.style.opacity = '1'; 
                entry.target.style.transform = 'translateY(0)'; 
            } 
        }); 
    }, observerOptions); 
 
    document.querySelectorAll('.section-title, .blog-post, .wechat-post, .social-icon, .wechat-slider-container').forEach(el => { 
        el.style.opacity = '0'; 
        el.style.transform = 'translateY(20px)'; 
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; 
        observer.observe(el); 
    }); 
});