# DBSI — Inventory Management (UI prototype)

A local, single-machine web app for inventory management. Double-click the
app, a small web server starts, and your browser opens to the DBSI interface.

This is a **UI/UX prototype**: the layout, styling, and screens are real, but
the data is sample data and the buttons don't save anything yet. The goal is to
nail the look and feel first.

## Screens (UI in French)

- **Accueil** — dashboard with stat cards, "Inventaires en cours" with progress
  bars, a weekly scans chart, and the latest scans.
- **Clients** — roster of clients (derived from inventory records) with contact,
  location, inventory count, and activity.
- **Inventaires** — inventory jobs with lifecycle state (Nouveau / En cours /
  Fermé), a responsible user, and a note about the file-based (SQLite + JSON)
  import/export sync for offline mobile stations.

## Tech

- ASP.NET Core (.NET 8) Razor Pages
- Plain CSS design system (no frameworks) — easy to read and tweak
- Binds to `http://localhost:5005` only (never exposed on the network)

---

## Run it (during development)

You need the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```bash
dotnet run
```

Your browser opens automatically. Stop the server with `Ctrl+C`.

## Build the double-clickable .exe

On Windows, just run:

```
publish-windows.bat
```

This produces a **single self-contained file** at `publish\DBSI.exe`. Copy that
one file anywhere and double-click it — the machine running it does **not** need
.NET installed. (The console window that appears is the local server; keep it
open while using the app.)

> Want a real installer (MSI/Setup.exe) instead of a bare exe? That's a separate
> packaging step (e.g. WiX or Inno Setup) — easy to add once the UI is signed off.

---

## Changing the look (start here)

Almost all of the design lives in **CSS variables** at the top of
`wwwroot/css/site.css`. To re-skin the whole app, change these:

```css
--brand:      #2f80ed;   /* main blue (buttons, links, active nav) */
--brand-soft: #e7f0ff;   /* light-blue tint (chips, active states) */
--bg:         #eef4fb;   /* page background */
--surface:    #ffffff;   /* cards */
```

For example, to lean closer to the old "baby blue" feel, try a softer brand
like `#4da3ff` with `--brand-soft: #eaf4ff`.

- **Colors / spacing / radius:** `wwwroot/css/site.css`
- **Page layout & navigation:** `Pages/Shared/_Layout.cshtml`
- **Page content + sample data:** `Pages/*.cshtml` and `Pages/*.cshtml.cs`

## Project layout

```
DBSI.csproj            Project file
Program.cs             Starts the server + opens the browser
Pages/
  Shared/_Layout.cshtml  App shell: sidebar + top bar
  Index.cshtml           Home dashboard
  Clients.cshtml         Clients list
  Inventory.cshtml       Inventory list
wwwroot/
  css/site.css           The design system (edit colors here)
  js/site.js             Small UI interactions
  favicon.svg
publish-windows.bat    One-click build of DBSI.exe
```
