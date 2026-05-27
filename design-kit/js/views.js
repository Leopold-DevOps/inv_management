// Views: each function takes the data object and returns an HTML string
// to be injected into <main id="view">. Pure functions, no DOM access.
(function () {
    "use strict";

    // ---- helpers --------------------------------------------------------

    const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

    const fmt = (n) => Number(n).toLocaleString("fr-CA");

    const initiales = (nom) => {
        const parts = String(nom || "").trim().split(/\s+/);
        if (!parts[0]) return "?";
        return parts.length === 1
            ? parts[0][0].toUpperCase()
            : (parts[0][0] + parts[1][0]).toUpperCase();
    };

    // ---- icons (inline SVG) --------------------------------------------

    const ICONS = {
        box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/></svg>`,
        scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h2"/><path d="M17 4h2a1 1 0 0 1 1 1v2"/><path d="M20 17v2a1 1 0 0 1-1 1h-2"/><path d="M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M4 12h16"/></svg>`,
        plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
        import: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>`,
        export: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></svg>`,
        search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
        more: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`,
        folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`,
    };

    // ---- partials -------------------------------------------------------

    const searchInput = (placeholder, label) => `
        <div class="search search-inline">
            ${ICONS.search}
            <input type="text" placeholder="${esc(placeholder)}" aria-label="${esc(label || placeholder)}" />
        </div>`;

    const filterPills = (labels) => `
        <div class="filter-pills">
            ${labels.map((l, i) => `<button class="filter${i === 0 ? " active" : ""}">${esc(l)}</button>`).join("")}
        </div>`;

    // ---- views ----------------------------------------------------------

    function home(d) {
        const semaineMax = Math.max(...d.semaine.map((b) => b.valeur));

        const statCards = d.stats.map((s) => `
            <div class="card stat">
                <div class="stat-ico tone-${esc(s.tone)}">${ICONS.box}</div>
                <div class="stat-body">
                    <span class="stat-label">${esc(s.label)}</span>
                    <span class="stat-value">${esc(s.value)}</span>
                </div>
                <span class="trend ${s.up ? "up" : "down"}">
                    ${s.up ? "▲" : "▼"} ${esc(s.trend)}
                </span>
            </div>`).join("");

        const enCoursRows = d.enCours.map((i) => `
            <tr>
                <td class="strong">${esc(i.client)}</td>
                <td class="muted">${esc(i.ville)}</td>
                <td><span class="badge tone-${esc(i.tone)}">${esc(i.etat)}</span></td>
                <td>
                    <div class="meter-row">
                        <div class="meter"><span class="meter-fill tone-blue" style="width:${i.avancement}%"></span></div>
                        <span class="muted small">${i.avancement} %</span>
                    </div>
                </td>
            </tr>`).join("");

        const chartCols = d.semaine.map((b) => `
            <div class="chart-col">
                <div class="bar" style="height:${Math.round((b.valeur * 100) / semaineMax)}%" title="${b.valeur} scans"></div>
                <span class="chart-x">${esc(b.jour)}</span>
            </div>`).join("");

        const scanRows = d.derniersScans.map((r) => `
            <tr>
                <td class="strong">${esc(r.produit)}</td>
                <td class="mono muted">${esc(r.code)}</td>
                <td>${esc(r.client)}</td>
                <td><span class="loc">${esc(r.section)}</span></td>
                <td class="strong">${fmt(r.qte)}</td>
                <td class="muted">${esc(r.heure)}</td>
            </tr>`).join("");

        return `
            <div class="page-head">
                <div>
                    <h1>Bon retour, Jean-Philippe</h1>
                    <p class="page-sub">Voici l'activité de vos inventaires aujourd'hui.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-ghost">Exporter</button>
                    <button class="btn btn-primary">${ICONS.scan} Démarrer un scan</button>
                </div>
            </div>

            <section class="stat-grid">${statCards}</section>

            <section class="grid-2">
                <div class="card">
                    <div class="card-head">
                        <h2>Inventaires en cours</h2>
                        <a class="link" href="#/inventaires">Voir tout</a>
                    </div>
                    <div class="table-wrap">
                        <table class="table">
                            <thead><tr><th>Client</th><th>Localisation</th><th>État</th><th>Avancement</th></tr></thead>
                            <tbody>${enCoursRows}</tbody>
                        </table>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <h2>Scans cette semaine</h2>
                        <span class="pill">7 jours</span>
                    </div>
                    <div class="chart">${chartCols}</div>
                </div>
            </section>

            <section class="card">
                <div class="card-head">
                    <h2>Derniers scans</h2>
                    <a class="link" href="#/inventaires">Voir tout</a>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <thead><tr><th>Produit</th><th>Code</th><th>Client</th><th>Section</th><th>Qté</th><th>Heure</th></tr></thead>
                        <tbody>${scanRows}</tbody>
                    </table>
                </div>
            </section>`;
    }

    function clients(d) {
        const actifs = d.clients.filter((c) => c.etat === "Actif").length;

        const rows = d.clients.map((c) => {
            const tone = c.etat === "Actif" ? "green" : "gray";
            return `
                <tr>
                    <td>
                        <div class="cell-user">
                            <span class="avatar avatar-sm">${esc(initiales(c.nom))}</span>
                            <span class="strong">${esc(c.nom)}</span>
                        </div>
                    </td>
                    <td>
                        <div class="cell-stack">
                            <span>${esc(c.contact)}</span>
                            <span class="muted small">${esc(c.courriel)}</span>
                        </div>
                    </td>
                    <td>${esc(c.ville)}, ${esc(c.province)}</td>
                    <td class="strong">${c.inventaires}</td>
                    <td><span class="badge tone-${tone}">${esc(c.etat)}</span></td>
                    <td class="muted">${esc(c.derniereActivite)}</td>
                    <td class="cell-actions">
                        <button class="icon-btn sm" aria-label="Plus">${ICONS.more}</button>
                    </td>
                </tr>`;
        }).join("");

        return `
            <div class="page-head">
                <div>
                    <h1>Clients</h1>
                    <p class="page-sub">${d.clients.length} au total · ${actifs} actifs</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-ghost">Importer</button>
                    <button class="btn btn-primary">${ICONS.plus} Ajouter un client</button>
                </div>
            </div>

            <div class="card">
                <div class="toolbar">
                    ${searchInput("Rechercher un client…", "Rechercher un client")}
                    ${filterPills(["Tous", "Actifs", "Inactifs"])}
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <thead><tr><th>Client</th><th>Contact</th><th>Localisation</th><th>Inventaires</th><th>État</th><th>Dernière activité</th><th></th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>`;
    }

    function inventaires(d) {
        const enCours = d.inventaires.filter((i) => i.etat === "En cours").length;
        const nouveaux = d.inventaires.filter((i) => i.etat === "Nouveau").length;

        const rows = d.inventaires.map((i) => `
            <tr>
                <td>
                    <div class="cell-stack">
                        <span class="strong">${esc(i.client)}</span>
                        <span class="mono muted small">${esc(i.ref)}</span>
                    </div>
                </td>
                <td>${esc(i.ville)}, ${esc(i.province)}</td>
                <td class="muted">${esc(i.periode)}</td>
                <td class="strong">${fmt(i.articles)}</td>
                <td>${esc(i.responsable)}</td>
                <td><span class="badge tone-${esc(i.tone)}">${esc(i.etat)}</span></td>
            </tr>`).join("");

        return `
            <div class="page-head">
                <div>
                    <h1>Inventaires</h1>
                    <p class="page-sub">${d.inventaires.length} au total · ${enCours} en cours · ${nouveaux} nouveau(x)</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-ghost">${ICONS.import} Importer</button>
                    <button class="btn btn-ghost">${ICONS.export} Exporter</button>
                    <button class="btn btn-primary">${ICONS.plus} Nouvel inventaire</button>
                </div>
            </div>

            <div class="banner">
                ${ICONS.folder}
                <div>
                    <strong>Synchronisation par fichiers</strong> — exportez un fichier SQLite et un fichier JSON clients
                    vers un dossier pour les postes mobiles, puis réimportez les scans (aucune connexion requise).
                </div>
            </div>

            <div class="card">
                <div class="toolbar">
                    ${searchInput("Rechercher par client ou numéro…", "Rechercher un inventaire")}
                    ${filterPills(["Tous", "Nouveaux", "En cours", "Fermés"])}
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <thead><tr><th>Inventaire</th><th>Localisation</th><th>Période</th><th>Articles</th><th>Responsable</th><th>État</th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>`;
    }

    window.DBSI_VIEWS = { home, clients, inventaires };
})();
