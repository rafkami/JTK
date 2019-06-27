import "../css/style.css";
import "../video/Feather - 11168 (1).mp4";
import "../about.html";
import "../offer.html";
import "../contact.html";
import "../blog.html";
import "../media.html";
import "./zl_widget";

// Strzałka powracająca do menu głównego

const arrow = document.querySelector(".arrow");
arrow.onclick = function() {
  scrollTo(0, 300);
};
const scrollTo = function(to, duration) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
};

function arrowAppear() {
  const scrollPosition = window.scrollY;
  const menuSize = document.querySelector("header nav").clientHeight;
  if (scrollPosition > menuSize) {
    arrow.classList.add("on");
  } else {
    arrow.classList.remove("on");
  }
}
window.addEventListener("scroll", arrowAppear);

// zwijane menu przy skrolowaniu

const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  if (window.scrollY !== 0) {
    header.classList.add("narrow");
  } else {
    header.classList.remove("narrow");
  }
});

// animowany burger przy mniejszej rozdzielczości

const menuIcon = document.querySelector(".burger-menu--icon");
const toggleActive = document.querySelector(".burger-menu");
const menuLink = document.querySelector("ul");

menuIcon.addEventListener("click", function() {
  toggleActive.classList.toggle("active");
});

document.addEventListener("click", function(e) {
  if (
    !menuIcon.contains(e.target) &&
    !menuLink.contains(e.target) &&
    toggleActive.classList.contains("active")
  ) {
    toggleActive.classList.remove("active");
  }
});

// wjeżdżające info w ofercie

const therapyForm = document.querySelectorAll(".offer__column");

therapyForm.forEach(column => {
  column.addEventListener("click", function() {
    this.classList.toggle("active");
  });
  document.addEventListener("click", function(e) {
    if (
      !column.contains(e.target) &&
      !menuIcon.contains(e.target) &&
      column.classList.contains("active")
    ) {
      column.classList.remove("active");
    }
  });
});

therapyForm.forEach(column =>
  column.addEventListener("transitionend", function(e) {
    if (e.propertyName.includes("flex")) {
      this.classList.toggle("revealed");
    }
  })
);

// wjeżdzający aside z listą wpisów na blogu

const blogList = document.querySelector(".blog-list");

if (blogList) {
  blogList.addEventListener("click", function() {
    this.classList.toggle("active");
  });
}

// mapy - kontakt

if (document.getElementById("contact__map--leg")) {
  const mymapLeg = L.map("contact__map--leg").setView(
    [52.3953581, 20.9184158],
    17
  );

  const markerLeg = L.marker([52.3953581, 20.9184158]).addTo(mymapLeg);

  const mymapWaw = L.map("contact__map--waw").setView(
    [52.230319, 21.0678778],
    17
  );

  const markerWaw = L.marker([52.230319, 21.0678778]).addTo(mymapWaw);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoicmFma2FtaSIsImEiOiJjanV2M2ZtZnMwbjk3NDRwaTcxZndqaDV6In0.Ir9V-RDPPvvT5giFhI9COw"
    }
  ).addTo(mymapLeg);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoicmFma2FtaSIsImEiOiJjanV2M2ZtZnMwbjk3NDRwaTcxZndqaDV6In0.Ir9V-RDPPvvT5giFhI9COw"
    }
  ).addTo(mymapWaw);
}
