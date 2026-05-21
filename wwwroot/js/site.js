// DBSI — minimal UI interactions (this is a design prototype)
(function () {
    "use strict";

    var app = document.getElementById("app");
    var toggle = document.getElementById("menuToggle");
    var scrim = document.getElementById("scrim");

    function closeNav() { app && app.classList.remove("nav-open"); }

    if (toggle && app) {
        toggle.addEventListener("click", function () {
            app.classList.toggle("nav-open");
        });
    }
    if (scrim) scrim.addEventListener("click", closeNav);

    // Close the mobile nav after tapping a link.
    document.querySelectorAll(".nav-item").forEach(function (a) {
        a.addEventListener("click", closeNav);
    });

    // Prototype-only: keep filter pills feeling responsive.
    document.querySelectorAll(".filter-pills").forEach(function (group) {
        group.addEventListener("click", function (e) {
            var btn = e.target.closest(".filter");
            if (!btn) return;
            group.querySelectorAll(".filter").forEach(function (f) {
                f.classList.remove("active");
            });
            btn.classList.add("active");
        });
    });
})();
