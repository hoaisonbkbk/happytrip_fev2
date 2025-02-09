document.addEventListener("DOMContentLoaded", function () {
    console.log("Custom script loaded!");
  
    const sidebarToggle = document.getElementById("sidebarCollapse");
    const sidebar = document.getElementById("sidebar");
  
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", function () {
        console.log("Sidebar button clicked!");
        sidebar.classList.toggle("active");
        document.body.classList.toggle("active");
      });
    } else {
      console.error("Sidebar or toggle button not found!");
    }
  });
  