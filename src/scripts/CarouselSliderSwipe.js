export class CarouselSlider {
  constructor(carouselParentClass, prevBtn, nextBtn, showPrevBtn) {
    this.sliderParent = document.querySelector(carouselParentClass);
    this.showPreviousButton = document.querySelector(showPrevBtn);
    this.previousButton = prevBtn;
    this.nextButton = nextBtn;
    this.sliderArray = this.sliderParent.children;
    this.slideWidth = this.sliderArray[0].offsetWidth;
    this.isTouched = false;
    this.autoplayInterval = null;

    this.setupEventListeners();
    this.startAutoplay();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      let nextPrevSlideBtns;
      if (e.target.matches(".carousel_btn")) {
        nextPrevSlideBtns = e.target;
      } else {
        nextPrevSlideBtns = e.target.closest(".carousel_btn");
      }
      if (nextPrevSlideBtns != null) {
        this.handleNextPrevClick(nextPrevSlideBtns);
      }
    });

    this.sliderParent.addEventListener("touchstart", (event) => {
      this.touchStartX = event.touches[0].clientX;
    });

    this.sliderParent.addEventListener("touchend", (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchEndX - this.touchStartX;

      if (swipeDistance > 0) {
        this.stopAutoplay();
        this.prevSlide();
        setTimeout(this.startAutoplay(), 3000);
      } else if (swipeDistance < 0) {
        this.stopAutoplay();
        this.nextSlide();
        setTimeout(this.startAutoplay(), 3000);
      }
    });
  }

  handleNextPrevClick(handle) {
    this.stopAutoplay();
    if (handle.classList.contains(this.previousButton)) {
      this.prevSlide();
    }
    if (handle.classList.contains(this.nextButton)) {
      this.nextSlide();
    }
    setTimeout(this.startAutoplay(), 3000);
  }

  nextSlide() {
    // show previous button once next button is clicked
    const showPrevBtn = document.querySelector(".handle_prev-slide");
    this.sliderParent.classList.add("next-animation");
    if (this.isTouched) {
      this.sliderParent.style.transform = `translateX(-${200}%)`;
      this.sliderParent.addEventListener("transitionend", this.nextTouched);
    } else if (!this.isTouched) {
      this.sliderParent.style.transform = `translateX(-${100}%)`;
      this.sliderParent.addEventListener(
        "transitionend",
        this.afterAnimation,
        false
      );
      this.showPreviousButton.classList.remove("d-none");
    }
  }

  nextTouched = () => {
    const content = Array.from(this.sliderArray);
    const firstSlide = content.shift();
    content.push(firstSlide);

    for (let i = 0; i < content.length; i++) {
      content[i].classList.remove("current__active-slide");
    }

    for (let j = 0; j < content.length && j < 5; j++) {
      content[1].classList.add("current__active-slide");
    }

    for (let len = this.sliderArray.length - 1; len >= 0; --len) {
      this.sliderParent.insertBefore(
        content[len],
        this.sliderParent.firstChild
      );
    }

    this.sliderParent.classList.remove("next-animation");
    this.sliderParent.style.transform = `translateX(-${100}%)`;
    this.sliderParent.removeEventListener("transitionend", this.nextTouched);
  };

  prevSlide() {
    this.sliderParent.classList.remove("next-animation");
    if (this.isTouched) {
      const content = Array.from(this.sliderArray);
      const getSplice = content.splice(this.sliderArray.length - 1);
      const newArr = getSplice.concat(content);

      for (let i = this.sliderArray.length - 1; i >= 0; --i) {
        this.sliderParent.insertBefore(newArr[i], this.sliderParent.firstChild);
      }

      this.sliderParent.style.transform = `translateX(-${200}%)`;

      setTimeout(() => {
        this.sliderParent.classList.add("next-animation");
        this.sliderParent.style.transform = `translateX(-${100}%)`;
        this.sliderParent.addEventListener(
          "transitionend",
          this.afterAnimation,
          false
        );
      });
    }
  }

  afterAnimation = () => {
    this.sliderParent.classList.remove("next-animation");
    if (!this.isTouched) {
      this.isTouched = true;
    }
    this.sliderParent.removeEventListener("transitionend", this.afterAnimation);
  };

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }
}
