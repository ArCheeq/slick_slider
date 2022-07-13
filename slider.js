function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
          slidesWrapper = document.querySelector(wrapper),
          slides = slidesWrapper.querySelectorAll(slide),
          currentSlide = document.querySelector(currentCounter),
          totalSlides = document.querySelector(totalCounter),
          prevBtn = document.querySelector(prevArrow),
          nextBtn = document.querySelector(nextArrow),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
    } else {
        totalSlides.textContent = `${slides.length}`;
    }

    function changeCurrentSlide(n) {
        if (n < 10) {
            currentSlide.textContent = `0${n}`;
        } else {
            currentSlide.textContent = n;
        }
    }

    changeCurrentSlide(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(dots);
    let dotsArr = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    function changeCurrentDot(n) {
        dotsArr.forEach(dot => {
            dot.style.opacity = '.5';
            if (dot.getAttribute('data-slide-to') ==  n) {
                dot.style.opacity = '1';
            }
        });
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });

    nextBtn.addEventListener('click', () => {
        if (offset == +parseInt(width) * (slides.length  - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += +parseInt(width);
            slideIndex += 1;
        }
        changeCurrentSlide(slideIndex);
        changeCurrentDot(slideIndex);
        slidesField.style.transform = `translateX(${-offset}px)`;
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = +parseInt(width) * (slides.length  - 1);
            slideIndex = slides.length;
        } else {
            offset -= +parseInt(width);
            slideIndex -=1;
        }
        changeCurrentSlide(slideIndex);
        changeCurrentDot(slideIndex);
        slidesField.style.transform = `translateX(${-offset}px)`;
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = +event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +parseInt(width) * (slideTo  - 1);

            changeCurrentSlide(slideTo);
            changeCurrentDot(slideTo);
            slidesField.style.transform = `translateX(${-offset}px)`;
        });
    });
}

export default slider;