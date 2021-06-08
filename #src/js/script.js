// @@include('noUiSlider.js')
document.addEventListener('DOMContentLoaded', function () {
    //===============================================select=================================================
    if (document.querySelector('.__select')) {
        const selectSingle = document.querySelector('.__select');
        const selectSingle_title = selectSingle.querySelector('.__select__title');
        const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
        // Toggle menu
        selectSingle_title.addEventListener('click', () => {
            if ('active' === selectSingle.getAttribute('data-state')) {
                selectSingle.setAttribute('data-state', '');
            } else {
                selectSingle.setAttribute('data-state', 'active');
            }
        });

        // Close when click to option
        for (let i = 0; i < selectSingle_labels.length; i++) {
            selectSingle_labels[i].addEventListener('click', (evt) => {
                selectSingle_title.textContent = evt.target.textContent;
                selectSingle.setAttribute('data-state', '');
            });
        }
    }

    //===============================================filter=================================================

    if (document.querySelector('#filter')) {
        const filter = document.querySelector('#filter');
        const filterVal = document.querySelector('.filter__prices-val');

        noUiSlider.create(filter, {
            start: [120, 550],
            connect: true,
            range: {
                'min': 120,
                'max': 550
            }
        });

        filter.noUiSlider.on('update', function (values) {
            filterVal.innerHTML = values.map((el) => Math.floor(el) + '₴').join(' - ');
        });
    }

    //===============================================menu logic=================================================
    const wrapper = document.querySelector('.wrapper');
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.menu');
    const book = document.querySelector('.book');
    burger.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            wrapper.classList.add('no-scroll');
            menu.classList.add('active');
            book.classList.add('light');
            // Проверку по ширине и высоте экрана
            if (window.innerHeight <= 500) {
                setTimeout(() => {
                    menu.classList.add('scroll');
                }, 1600);
            }
        } else {
            wrapper.classList.remove('no-scroll');
            menu.classList.remove('active');
            if (menu.classList.contains('scroll')) {
                menu.classList.remove('scroll');
            }
            book.classList.remove('light');
        }
    });

    //=====================================scroll to top logic==============================================
    const goTopBtn = document.querySelector('.scroll-btn');
    goTopBtn.addEventListener('click', function (event) {
        event.preventDefault();
        scrollTo(0, 400);
    });

    function scrollTo(to, duration = 700) {
        const
            element = wrapper,
            start = element.scrollTop,
            change = to - start,
            startDate = +new Date(),
            // t = current time
            // b = start value
            // c = change in value
            // d = duration
            easeInOutQuad = function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            animateScroll = function () {
                const currentDate = +new Date();
                const currentTime = currentDate - startDate;
                element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
                else {
                    element.scrollTop = to;
                }
            };
        animateScroll();
    }

    wrapper.addEventListener('scroll', function () {
        let scrolled = wrapper.scrollTop;
        let coords = wrapper.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('show');
        }
    });

    //======================================reviews-swiper=====================================================
    const reviewsEl = document.querySelector('.reviews-slider');
    if (reviewsEl) {
        new Swiper(reviewsEl, {
            speed: 400,
            loop: true,
            autoplay: {
                delay: 5000,
            }
        });
    }

    //======================================team-swiper=====================================================
    const teamEl = document.querySelector('.team-slider');
    if (teamEl) {
        new Swiper(teamEl, {
            speed: 1000,
            slidesPerView: 2,
            loop: true,
            followFinger: false,
            slidesPerGroup: 2,
            navigation: {
                nextEl: '.team-next',
                prevEl: '.team-prev',
            },
            breakpoints: {
                575: {
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                },
                995: {
                    slidesPerGroup: 4,
                    slidesPerView: 4,
                }
            }
        });
    }
    //=========================================forms==================================================
    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach(el => {
        el.lastChild.addEventListener('focus', function () {
            this.parentElement.classList.add('active');
        });
        el.lastChild.addEventListener('blur', function () {
            this.parentElement.classList.remove('active');
        });
    })

});
