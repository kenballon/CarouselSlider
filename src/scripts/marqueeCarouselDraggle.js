export default class Marquee {
  constructor(marqueeWrapper, marqueeContent) {
    this.marqueeWrapper = marqueeWrapper;
    this.marqueeContent = marqueeContent;

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;

    const cloneFirstChild = this.marqueeContent.cloneNode(true);
    this.marqueeWrapper.appendChild(cloneFirstChild);

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
}

// exampel when using it this class
// import Marquee from './marqueeCarouselDraggle.js';
// const marquee = new Marquee(document.querySelector(".marquee-wrapper"), document.querySelector(".marquee-content"));
