// ^ Write your JavaScript code here
var themeBtn = document.getElementById("theme-toggle-button");
var scrollTopBtn = document.getElementById("scroll-to-top");
var navLinks = document.querySelectorAll(".nav-links a, #mobile-menu a");
var sections = document.querySelectorAll("section[id]");
var filterBtns = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
var menuToggle = document.getElementById("menu-toggle");
var mobileMenu = document.getElementById("mobile-menu");
var mobileThemeBtn = document.getElementById("mobile-theme-toggle-button");
var testimonialsCarousel = document.getElementById("testimonials-carousel");
var testimonialCard = document.querySelectorAll(".testimonial-card");
var nextTestimonial = document.getElementById("next-testimonial");
var prevTestimonial = document.getElementById("prev-testimonial");
var carouselIndicators = document.querySelectorAll(".carousel-indicator");
var currentIndex = 0;
var maxIndex = testimonialCard.length - 3;

var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");
var settingsToggle = document.getElementById("settings-toggle");
var fontOption = document.querySelectorAll(".font-option");
var themeColor = document.getElementById("theme-colors-grid");
var resetSetting = document.getElementById("reset-settings");

// زرار hamburger in navbar on mobile screen

menuToggle.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
});

mobileThemeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});

// Dark & light Mode
themeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});

// Scroll to Top
window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollTopBtn.classList.add("opacity-0", "invisible");
  }

  // Active Navbar
  for (var i = 0; i < sections.length; i++) {
    var sectionId = sections[i].getAttribute("id");
    var sectionTop = sections[i].offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      for (var k = 0; k < navLinks.length; k++) {
        navLinks[k].classList.remove("active");
        if (navLinks[k].getAttribute("href") === "#" + sectionId) {
          navLinks[k].classList.add("active");
        }
      }
    }
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// portfolio filters

//  دى بتلف على كل الزرارير

for (var i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    var selectedFilter = this.getAttribute("data-filter");

    // تغيير لون الزرار active

    for (var k = 0; k < filterBtns.length; k++) {
      filterBtns[k].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );

      filterBtns[k].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }

    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );

    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );

    // دى بتلف على كل الكروت

    for (var j = 0; j < portfolioItems.length; j++) {
      var itemCategory = portfolioItems[j].getAttribute("data-category");

      if (selectedFilter === itemCategory || selectedFilter === "all") {
        portfolioItems[j].classList.remove("hidden");
      } else {
        portfolioItems[j].classList.add("hidden");
      }
    }
  });
}

// testimonial cards

// next card
nextTestimonial.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
  updateCarousel();
});

function updateCarousel() {
  var cardWidth = testimonialCard[0].offsetWidth;

  var carouselWidth = testimonialsCarousel.parentElement.offsetWidth;

  maxIndex = testimonialCard.length - Math.floor(carouselWidth / cardWidth);

  testimonialsCarousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;

  for (var i = 0; i < carouselIndicators.length; i++) {
    if (i === currentIndex) {
      carouselIndicators[i].classList.add("bg-accent");
      carouselIndicators[i].classList.remove(
        "bg-slate-400",
        "dark:bg-slate-600",
      );
    } else {
      carouselIndicators[i].classList.remove("bg-accent");
      carouselIndicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
    }
  }
}

for (var i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener("click", function () {
    currentIndex = Number(this.getAttribute("data-index"));
    updateCarousel();
  });
}

// Click on carousel indicators
for (var i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener("click", function () {
    currentIndex = Number(this.getAttribute("data-index"));
    updateCarousel();
  });
}

// previous card

prevTestimonial.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }
  updateCarousel();
});

// sidebar

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
});

closeSettings.addEventListener("click", function () {
  settingsToggle.focus();
  settingsSidebar.classList.add("translate-x-full");
});

for (var i = 0; i < fontOption.length; i++) {
  fontOption[i].addEventListener("click", function (e) {
    var selectedFont = e.currentTarget.getAttribute("data-font");

    // font family

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );
    document.body.classList.add("font-" + selectedFont);

    for (var j = 0; j < fontOption.length; j++) {
      fontOption[j].classList.remove("active");

      fontOption[j].setAttribute("aria-checked", "false");
    }

    e.currentTarget.classList.add("active");
    e.currentTarget.setAttribute("aria-checked", "true");
  });
}

// theme color

var themeColors = [
  {
    name: "indigo",
    value: "#6366F1",
  },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Orange", value: "#F97316" },
  { name: "Green", value: "#10B981" },
  { name: "Cyan", value: "#06B6D4" },
];
for (var i = 0; i < themeColors.length; i++) {
  themeColor.innerHTML += `
  <button 
  data-color="${themeColors[i].value}"
  style="background-color: ${themeColors[i].value}; border-radius: 50%; width: 40px; height: 40px">
  </button>
  `;
}

var colorButtons = document.querySelectorAll("#theme-colors-grid button");

for (var i = 0; i < colorButtons.length; i++) {
  colorButtons[i].addEventListener("click", function (e) {
    var selectedColor = e.currentTarget.getAttribute("data-color");

    document.documentElement.style.setProperty(
      "--color-primary",
      selectedColor,
    );

    for (var j = 0; j < colorButtons.length; j++) {
      colorButtons[j].classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  });
}

// reset setting

resetSetting.addEventListener("click", function () {
  document.documentElement.style.setProperty("--color-primary", "#6366F1");

  for (var j = 0; j < colorButtons.length; j++) {
    colorButtons[j].classList.remove("active");
  }

  colorButtons[0].classList.add("active");
  for (var k = 0; k < fontOption.length; k++) {
    fontOption[k].classList.remove("active");
    fontOption[k].setAttribute("aria-checked", "false");
  }

  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );

  document.body.classList.add("font-tajawal");
  fontOption[1].classList.add("active");
  fontOption[1].setAttribute("aria-checked", "true");
});
