/**
 * Marquee Class.
 * This class is for Infinite Marquee Effect. Call this class when we want a maquee effect.
 * It expect the below parameters for it to work.
 *
 * @param {string} marqueeWrapper - CSS class of the parent container wrapper of marqueeContent.
 * @param {string} marqueeContent - CSS class of the parent of each marquee child. Let's say cards or images.
 */

export default class Marquee {
  constructor(marqueeWrapper, marqueeContent) {
    this.marqueeWrapper = marqueeWrapper;
    this.marqueeContent = marqueeContent;

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;

    this.marqueeWrapper.addEventListener(
      "mousedown",
      this.startDrag.bind(this)
    );
    this.marqueeWrapper.addEventListener("mousemove", this.drag.bind(this));
    this.marqueeWrapper.addEventListener("mouseup", () => {
      this.endDrag.bind(this);
      this.marqueeWrapper.classList.remove("is-grabbing");
    });
    this.marqueeWrapper.addEventListener("mouseleave", this.endDrag.bind(this));

    // Touch events for mobile and tablets
    this.marqueeWrapper.addEventListener(
      "touchstart",
      this.startDragTouch.bind(this)
    );
    this.marqueeWrapper.addEventListener(
      "touchmove",
      this.dragTouch.bind(this)
    );
    this.marqueeWrapper.addEventListener(
      "touchend",
      this.endDragTouch.bind(this)
    );
    this.marqueeWrapper.addEventListener(
      "touchcancel",
      this.endDragTouch.bind(this)
    );
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.clientX - this.currentX;
    this.marqueeWrapper.classList.add("is-grabbing");
  }

  drag(e) {
    if (this.isDragging) {
      const newX = e.clientX - this.startX;
      this.marqueeWrapper.style.animationPlayState = "paused";
      this.marqueeWrapper.scrollLeft -= newX - this.currentX;
      this.currentX = newX;
      this.marqueeWrapper.classList.add("is-dragging");
    }
  }

  endDrag() {
    this.isDragging = false;
    this.marqueeWrapper.style.animationPlayState = "running";
    this.marqueeWrapper.classList.remove("is-dragging");
  }

  // Touch event handlers
  startDragTouch(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX - this.currentX;
    this.marqueeWrapper.classList.add("is-grabbing");
  }

  dragTouch(e) {
    if (this.isDragging) {
      const newX = e.touches[0].clientX - this.startX;
      this.marqueeWrapper.style.animationPlayState = "paused";
      this.marqueeWrapper.scrollLeft -= newX - this.currentX;
      this.currentX = newX;
      this.marqueeWrapper.classList.add("is-dragging");
    }
  }

  endDragTouch() {
    this.isDragging = false;
    this.marqueeWrapper.style.animationPlayState = "running";
    this.marqueeWrapper.classList.remove("is-dragging");
  }
}

// exampel when using it this class
// import Marquee from './marqueeCarouselDraggle.js';
// const marquee = new Marquee(document.querySelector(".marquee-wrapper"), document.querySelector(".marquee-content"));
