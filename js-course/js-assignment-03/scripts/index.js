// carousel-image-wrapper.style.transform = 'translateX(-' + currentImageIndex * 400 + 'px)';

const carouselContainer =
  document.getElementsByClassName("carousel-container")[0];
const imageWrapper = document.getElementsByClassName(
  "carousel-image-wrapper"
)[0];

let imageCollection = imageWrapper.getElementsByTagName("img");
let numberOfImages = imageCollection.length;
let imageArray = Array.from(imageCollection);

imageArray.map((item) => {
  let cssStyleObj = window.getComputedStyle(item);
  let imgWidth = cssStyleObj.getPropertyValue("width");

});

//* FUNCTION TO GET COMPUTED WIDTH OF AN ELEMENT
function calcWidthOf(element) {
  let cssStyleObj = window.getComputedStyle(element);
  return cssStyleObj.getPropertyValue("width").split("px")[0];
}

let indicatorsEl = createChildOf(carouselContainer, {
  tagName: "div",
  classes: "indicators",
});

for (let i = 0; i < 3; i++) {
  createChildOf(indicatorsEl, {
    tagName: "div",
    classes: "indicator",
    text: ".",
  });
}

let nextButton = createSiblingAfter(carouselContainer, {
  tagName: "div",
  classes: "nav-button",
  text: "NEXT",
});
let prevButton = createSiblingAfter(nextButton, {
  tagName: "div",
  classes: "nav-button",
  text: "PREV",
});

//* SCRIPTS FOR CAROUSEL STARTS HERE **
let currentImageIndex = 0;
let currentImage = imageArray[Math.abs(currentImageIndex)];
//numberOFImages = 3 so index= 0, 1, 2
let indicatorCollection = document.getElementsByClassName("indicator");
let indicatorArray = Array.from(indicatorCollection);

highlightCurrentIndicator();

// function for translating image wrapper
function translateImageWrapper() {
  imageWrapper.style.transform =
    "translateX(-" +
    calcWidthOf(currentImage) * Math.abs(currentImageIndex) +
    "px)";
}

// function to add 'active-indicator' class to CURRENTIMAGEINDEX/ current indicator
function highlightCurrentIndicator() {
  indicatorArray.forEach((indicator) =>
    indicator.classList.remove("active-indicator")
  );
  indicatorArray[currentImageIndex].classList.add("active-indicator");
}

// adding translations on indicator click
for (let i = 0; i < indicatorArray.length; i++) {
  indicatorArray[i].addEventListener("click", () => {
    currentImageIndex = i;

    highlightCurrentIndicator();

    // translating imagewrapper
    translateImageWrapper();
  });
}

//* NEXT BUTTON EVENT
nextButton.addEventListener("click", () => {
  // first change the currentImageIndex to next index
  currentImageIndex++;

  // if increased currentImageIndex becomes greater
  // than possible image index [0 to numberofImages-1],
  // change currentImageIndex to 0 by calculating modulus
  if (currentImageIndex >= numberOfImages)
    currentImageIndex = currentImageIndex % numberOfImages;

  highlightCurrentIndicator();

  // offset X coordinate with respect to currentImageIndex
  translateImageWrapper();
});

//* PREV BUTTON EVENT
prevButton.addEventListener("click", () => {
  // first change the currentImageIndex to previous index
  currentImageIndex--;

  // if decreased currentImageIndex becomes negative change currentImageIndex to last possible index
  if (currentImageIndex < 0) currentImageIndex = numberOfImages - 1;

  highlightCurrentIndicator();

  // offset X coordinate with respect to currentImageIndex
  imageWrapper.style.transform =
    "translateX(-" +
    calcWidthOf(currentImage) * Math.abs(currentImageIndex) +
    "px)";
});

//* FUNCTIONS TO CREATE SIBLINGS
function createSiblingAfter(e, passedObject) {
  const {
    tagName,
    classes,
    onclick,
    text,
    id,
    href,
    target,
    alt,
    placeholder,
  } = passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (alt) newElement.setAttribute("alt", alt);
  if (placeholder) newElement.setAttribute("placeholder", placeholder);

  e.insertAdjacentElement("afterend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }

  return newElement;
}

function createChildOf(e, passedObject) {
  const { tagName, classes, onclick, text, id, href, target, src, alt } =
    passedObject;

  // creating a new element object
  let newElement = document.createElement(tagName);

  // appending attributes on newly created element
  if (classes) newElement.setAttribute("class", classes);
  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (src) newElement.setAttribute("src", src);
  if (alt) newElement.setAttribute("alt", alt);

  // inserting new element on DOM as last child
  e.insertAdjacentElement("beforeend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }

  // returning created child element
  return newElement;
}
