

















function openAssignment(assignmentId) {
    var i, tabcontent, tablinks, neededContent;
    tabcontent = document.getElementsByClassName("assignment-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");

    }
    neededContent = document.getElementById(assignmentId);
    neededContent.classList.add("active");
    tablinks = document.getElementsByClassName("course-item");
}
function openAssignmentDetails(assignmentDetailsId) {
    var i, tabcontent, tablinks, neededContent;
    tabcontent = document.getElementsByClassName("assignment-item-details");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");

    }
    neededContent = document.getElementById(assignmentDetailsId);
    neededContent.classList.add("active");
    tablinks = document.getElementsByClassName("course-item");
}
