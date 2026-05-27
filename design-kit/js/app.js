// DBSI shell — hash-based router + small UI interactions. No framework.
(function () {
    "use strict";

    const app       = document.getElementById("app");
    const view      = document.getElementById("view");
    const navEl     = document.getElementById("nav");
    const toggle    = document.getElementById("menuToggle");
    const scrim     = document.getElementById("scrim");

    // route hash -> { view fn name, page title, sidebar active key }
    const ROUTES = {
        "#/accueil":     { view: "home",         title: "Accueil",     active: "home"      },
        "#/clients":     { view: "clients",      title: "Clients",     active: "clients"   },
        "#/inventaires": { view: "inventaires",  title: "Inventaires", active: "inventory" },
    };
    const DEFAULT_HASH = "#/accueil";

    function render() {
        const route = ROUTES[location.hash] || ROUTES[DEFAULT_HASH];
        const renderer = window.DBSI_VIEWS[route.view];
        view.innerHTML = renderer(window.DBSI_DATA);
        document.title = route.title + " · DBSI";

        navEl.querySelectorAll(".nav-item").forEach((a) => {
            a.classList.toggle("active", a.dataset.route === route.active);
        });

        app.classList.remove("nav-open");
        view.scrollTop = 0;
    }

    // ----- mobile nav -----
    function closeNav() { app.classList.remove("nav-open"); }
    if (toggle) toggle.addEventListener("click", () => app.classList.toggle("nav-open"));
    if (scrim)  scrim.addEventListener("click", closeNav);

    // ----- delegated UI: filter pills (works for re-rendered content) -----
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        const group = btn.closest(".filter-pills");
        if (!group) return;
        group.querySelectorAll(".filter").forEach((f) => f.classList.remove("active"));
        btn.classList.add("active");
    });

    // ----- routing -----
    if (!location.hash || !ROUTES[location.hash]) {
        history.replaceState(null, "", DEFAULT_HASH);
    }
    window.addEventListener("hashchange", render);
    render();
})();
