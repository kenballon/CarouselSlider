// wait for the DOM to load first before executing the script
import { CarouselSlider } from "./CarouselSliderSwipe.js";
import Marquee from "./marqueeCarouselDraggle.js";

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below
    callStickyNavBarFunction();
    callOpenMobileMenu();
    marqueeAnimateStart();

    const sliderObj = {
      parentSlider: ".carousel__slider-wrapper",
      prevBtn: "handle_prev-slide",
      nextBtn: "handle_next-slide",
      showPrevBtn: ".handle_prev-slide",
    };

    // Use the carouselSliderJS function as needed
    const carouselSlider = new CarouselSlider(
      sliderObj.parentSlider,
      sliderObj.prevBtn,
      sliderObj.nextBtn,
      sliderObj.showPrevBtn
    );
  }
});

const callStickyNavBarFunction = () => {
  const headerScrolledSticky = document.querySelector("header.container-fluid");

  window.addEventListener("scroll", () => {
    let scrollDown = window.scrollY;
    if (scrollDown >= 5) {
      headerScrolledSticky.classList.add("scrolled");
    } else if (scrollDown <= 5) {
      headerScrolledSticky.classList.remove("scrolled");
    }
  });
};

const callOpenMobileMenu = () => {
  /* Event Listener for the button to hide and show menu */
  const mobileMenuBtn = document.getElementById("openCloseMobileNav");
  const revealMobileMenuNavLinks = document.querySelector(
    ".navigation-links-parent"
  );
  const bodyFixedScroll = document.querySelector("body");
  const addClassToFadeOut = document.querySelector(".navigation-links-parent");
  const navLinkItemMobile = document.querySelectorAll(".nav-item-mobile");

  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenuBtn.getAttribute("aria-label") == "Open Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Close Navigation");
      mobileMenuBtn.classList.add("nav-toggle--close");
      revealMobileMenuNavLinks.classList.add("show-mobile-menu");
      bodyFixedScroll.classList.add("fixed-modal-reveal");
    } else if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
      mobileMenuBtn.classList.remove("nav-toggle--close");

      // add class before closing for fadeout animation of mobile nav
      addClassToFadeOut.classList.add("fade-out-animate");

      addClassToFadeOut.addEventListener(
        "animationend",
        () => {
          bodyFixedScroll.classList.remove("fixed-modal-reveal");
          addClassToFadeOut.classList.remove("fade-out-animate");
          revealMobileMenuNavLinks.classList.remove("show-mobile-menu");
        },
        { once: true }
      );
    }
  });

  navLinkItemMobile.forEach((navlinkitem) => {
    navlinkitem.addEventListener("click", () => {
      if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
        mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
        mobileMenuBtn.classList.remove("nav-toggle--close");

        // add class before closing for fadeout animation of mobile nav
        addClassToFadeOut.classList.add("fade-out-animate");

        addClassToFadeOut.addEventListener(
          "animationend",
          () => {
            bodyFixedScroll.classList.remove("fixed-modal-reveal");
            addClassToFadeOut.classList.remove("fade-out-animate");
            revealMobileMenuNavLinks.classList.remove("show-mobile-menu");
          },
          { once: true }
        );
      }
    });
  });
};

/* Marquee - Featuring Insights From section */
const marqueeAnimateStart = () => {
  const marqueeContainer = document.querySelector(".marquee-wrapper");
  const marqueeContentAlone = document.querySelector(".marquee-content");

  const cloneFirstChild = marqueeContentAlone.cloneNode(true);
  marqueeContainer.appendChild(cloneFirstChild);

  const marqueeContents = document.querySelectorAll(".marquee-content");

  setTimeout(() => {
    if (marqueeContents.length >= 2) {
      marqueeContents.forEach((content) => {
        content.classList.add("loaded");
      });
      const marquee = new Marquee(marqueeContainer, marqueeContentAlone);
    }
  }, 300);
};
