const mainContainer = document.getElementsByClassName("main-container")[0];

//* PROFILE
{
  createChildOf(mainContainer, {
    tagName: "div",
    classes: "toggle-profile",
    onclick: "toggleProfile()",
  });
  createChildOf(mainContainer, {
    tagName: "div",
    classes: "course-tab",
  });

  createChildOf(mainContainer, {
    tagName: "div",
    classes: "profile",
  });
  const profile = document.getElementsByClassName("profile")[0];

  createChildOf(profile, {
    tagName: "div",
    classes: "profile_pic",
  });
  const profilePic = document.getElementsByClassName("profile_pic")[0];

  createChildOf(profilePic, {
    tagName: "figure",
    classes: "profile_frame",
  });
  const profileFrame = document.getElementsByClassName("profile_frame")[0];
  createChildOf(profileFrame, {
    tagName: "img",
    src: "images/profile",
    alt: "Sabudh Bahadur Thapa",
  });
  createChildOf(profile, {
    tagName: "div",
    classes: "profile_name",
  });
  const profileName = document.getElementsByClassName("profile_name")[0];
  createChildOf(profileName, {
    tagName: "h3",
    text: "Sabudh Bahadur Thapa",
  });
  createChildOf(profile, {
    tagName: "div",
    classes: "profile_bio",
  });
  const profileBio = document.getElementsByClassName("profile_bio")[0];
  createChildOf(profileBio, {
    tagName: "p",
    text: "Hi, I am originally from Baglung. My interest lies in learning programming and expanding its limits.",
  });
}

//* COURSE TAB
{
}
const courseTab = document.getElementsByClassName("course-tab")[0];
createSiblingAfter(courseTab, {
  tagName: "div",
  classes: "assignment-tab",
});

const assignmentTab = document.getElementsByClassName("assignment-tab")[0];

let courseItems = ["html", "css", "js"];

//* CREATING COURSE-ITEMS INSIDE COURSE-TAB
for (let i = 0; i < courseItems.length; i++) {
  //i for course tab
  // creating course-item for each course tab
  createChildOf(courseTab, {
    tagName: "div",
    classes: "course-item",
    onclick: `openAssignment('${courseItems[i]}')`,
  });

  // creating course-item-text inside each course-item
  let courseItemIndex = document.getElementsByClassName("course-item")[i];
  createChildOf(courseItemIndex, {
    tagName: "div",
    classes: "course-item-text",
    text: `${courseItems[i]}`,
  });

  //* creating assignmen-tab-content for each courseItems
  createChildOf(assignmentTab, {
    tagName: "div",
    classes: `assignment-tab-content assignment-tab-content--${courseItems[i]}`,
    id: `${courseItems[i]}`,
  });

  //*CREATING ASSIGNMENT CARDS FOR EACH ASSIGNMENT TAB CONTENT
  let assignmentTabContent = document.getElementsByClassName(
    "assignment-tab-content"
  )[i];

  //* creating assignment-item inside each assignment-tab-content
  for (let j = 1; j < 5; j++) {
    createChildOf(assignmentTabContent, {
      tagName: "div",
      classes: `assignment-item assignment-item--${courseItems[i]}`,
      onclick: `openAssignmentDetails('${courseItems[i]}${j}')`,
    });

    let assignmentItem = document.getElementsByClassName(
      `assignment-item--${courseItems[i]}`
    )[j - 1];

    createChildOf(assignmentItem, {
      tagName: "div",
      classes: "assignment-item_number",
      text: `${j}`,
    });

    createChildOf(assignmentItem, {
      tagName: "a",
      classes: "assignment-item_demo",
      text: "Demo",
      href: `https://tsabudh.github.io/internship/${courseItems[i]}-course/${courseItems[i]}-assignment-0${j}/`,
      target: "_blank",
    });
    createChildOf(assignmentItem, {
      tagName: "a",
      classes: "assignment-item_repo",
      text: "Repo",
      href: `https://github.com/tsabudh/internship/tree/master/${courseItems[i]}-course/${courseItems[i]}-assignment-0${j}`,
      target: "_blank",
    });
  }
}

//* CREATING TABS FOR DIFFERENT ASSIGNMENTS

// creating assignment tab content
// createChildOf(assignmentTab, {
//   tagName:"div",
//   classes:"assignment-tab-content",
//   id:"html"
// })

// const assignmentTabContent = document.getElementsByClassName(
//   "assignment-tab-content"
// )[0];

//* LOOP FOR CREATING ASSIGNMENT CARDS FOR CSS
// for(let i=1;i< 5;i++){
//   createChildOf(assignmentTabContent, {
//     tagName : "div",
//     classes:"assignment-item",
//     onclick: `openAssignmentDetails('css${i}')`
//   })
// }

//* CREATING ASSIGNMENT CARDS FOR EACH TAB
// createChildOf(assignmentTabContent, {
//   tagName: "div",
//   classes: "assignment-item",
//   onclick: "openAssignmentDetails('html1')",
// });

// const assignmentItem = document.getElementsByClassName("assignment-item")[0];

// createChildOf(assignmentItem, {
//   tagName: "div",
//   classes: "assignment-item_number",
//   text: "01",
// });
// createChildOf(assignmentItem, {
//   tagName: "a",
//   classes: "assignment-item_demo",
//   text: "Demo",
//   href: "https://tsabudh.github.io/internship/html-course/html-assignment-01/",
//   target: "_blank",
// });
// createChildOf(assignmentItem, {
//   tagName: "a",
//   classes: "assignment-item_repo",
//   text: "Demo",
//   href: "https://github.com/tsabudh/internship/tree/master/html-course/html-assignment-01",
//   target: "_blank",
// });
// createChildOf(assignmentItem, {
//   tagName: "div",
//   classes: "assignment-item_opendetails",
//   text: "Details",
// });

//* CREATING DETAILS TAB
createSiblingAfter(assignmentTab, {
  tagName: "div",
  classes: "details-tab",
});
const detailsTab = document.getElementsByClassName("details-tab")[0];

createChildOf(detailsTab, {
  tagName: "div",
  classes: "assignment-item-details",
  id: "html1",
});
const assignmentItemDetails = document.getElementsByClassName(
  "assignment-item-details"
)[0];
createChildOf(assignmentItemDetails, {
  tagName: "iframe",
  src: "https://tsabudh.github.io/internship/html-course/html-assignment-01/",
});

function createSiblingAfter(e, passedObject) {
  const { tagName, classes, onclick, text, id, href, target, alt } =
    passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (alt) newElement.setAttribute("alt", alt);

  e.insertAdjacentElement("afterend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
}

function createChildOf(e, passedObject) {
  const { tagName, classes, onclick, text, id, href, target, src, alt } =
    passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (src) newElement.setAttribute("src", src);
  if (alt) newElement.setAttribute("alt", alt);

  e.appendChild(newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
}

function openAssignment(assignmentId) {
  let i, tabcontent, tablinks, neededContent;
  tabcontent = document.getElementsByClassName("assignment-tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].className = tabcontent[i].className.replace(" active", "");
  }
  neededContent = document.getElementById(assignmentId);
  neededContent.classList.add("active");
  tablinks = document.getElementsByClassName("course-item");
}

function openAssignmentDetails(assignmentDetailsId) {
  let i, tabcontent, tablinks, neededContent;
  tabcontent = document.getElementsByClassName("assignment-item-details");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].className = tabcontent[i].className.replace(" active", "");
  }
  neededContent = document.getElementById(assignmentDetailsId);
  neededContent.classList.add("active");
  tablinks = document.getElementsByClassName("course-item");
}

function toggleProfile() {
  const profile = document.getElementsByClassName("profile")[0];
  profile.classList.toggle("active-flex");
}
