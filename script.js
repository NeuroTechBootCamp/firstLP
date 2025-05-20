// DOM要素が全て読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // FAQのアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // 他のすべての回答を閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.faq-toggle').classList.remove('active');
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });
            
            // クリックした項目の回答を開閉
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // アイコンを変更
            if (answer.classList.contains('active')) {
                toggle.querySelector('i').className = 'fas fa-times';
            } else {
                toggle.querySelector('i').className = 'fas fa-plus';
            }
        });
    });

    // お問い合わせフォームの送信処理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームのバリデーション
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const inquiry = document.getElementById('inquiry').value;
            const privacy = document.getElementById('privacy').checked;
            
            if (!name || !email || !inquiry || !privacy) {
                alert('必須項目をすべて入力してください。');
                return;
            }
            
            // 実際の送信処理はここで行う（今回はモックなので省略）
            
            // 送信成功メッセージ
            alert('お問い合わせありがとうございます。担当者より連絡させていただきます。');
            contactForm.reset();
        });
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // テスティモニアルスライダー
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentIndex = 0;

    // 初期表示
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
    }

    // 次のテスティモニアルを表示
    function showNextTestimonial() {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }

    // 前のテスティモニアルを表示
    function showPrevTestimonial() {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }

    // ボタンイベントリスナー
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevTestimonial);
    }

    // 自動スライド（5秒ごと）
    const autoSlideInterval = setInterval(showNextTestimonial, 5000);

    // スライダーにマウスが乗ったら自動スライドを停止
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
    }

    // 固定ヘッダーのスクロール時のクラス切り替え
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ページ読み込み時のアニメーション
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    // 最初の実行
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 問題アイテムのホバーエフェクト（モバイルタッチ対応）
    const problemItems = document.querySelectorAll('.problem-item');
    
    problemItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            problemItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            problemItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
});
