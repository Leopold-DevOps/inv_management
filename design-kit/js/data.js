// Mock data. Replace these arrays with real data from your app.
window.DBSI_DATA = {

    stats: [
        { label: "Inventaires en cours", value: "6",   trend: "+2",    up: true, tone: "blue"  },
        { label: "Nouveaux inventaires", value: "3",   trend: "+1",    up: true, tone: "amber" },
        { label: "Clients actifs",       value: "27",  trend: "+2",    up: true, tone: "green" },
        { label: "Scans aujourd'hui",    value: "318", trend: "+12 %", up: true, tone: "blue"  },
    ],

    enCours: [
        { client: "Quincaillerie Bélanger",  ville: "Québec, QC",   etat: "En cours", tone: "green", avancement: 72 },
        { client: "Construction Nord-Côte",  ville: "Lévis, QC",    etat: "En cours", tone: "green", avancement: 45 },
        { client: "Décor Côtier",            ville: "Montréal, QC", etat: "Nouveau",  tone: "blue",  avancement: 5  },
        { client: "Électrique Méridien",     ville: "Laval, QC",    etat: "En cours", tone: "green", avancement: 88 },
    ],

    derniersScans: [
        { produit: "Perceuse sans fil 18V",       code: "8901234500017", client: "Quincaillerie Bélanger", section: "A-03", qte: 12,   heure: "il y a 2 min"  },
        { produit: "Lunettes de sécurité",        code: "8901234500031", client: "Construction Nord-Côte", section: "B-07", qte: 48,   heure: "il y a 11 min" },
        { produit: "Vis galvanisées 50 mm",       code: "8901234500024", client: "Quincaillerie Bélanger", section: "A-11", qte: 1240, heure: "il y a 26 min" },
        { produit: "Ensemble rouleau à peinture", code: "8901234500048", client: "Décor Côtier",           section: "C-02", qte: 24,   heure: "il y a 41 min" },
        { produit: "Lampe de travail DEL",        code: "8901234500055", client: "Électrique Méridien",    section: "B-04", qte: 60,   heure: "il y a 1 h"    },
    ],

    semaine: [
        { jour: "lun", valeur: 210 },
        { jour: "mar", valeur: 280 },
        { jour: "mer", valeur: 240 },
        { jour: "jeu", valeur: 330 },
        { jour: "ven", valeur: 318 },
        { jour: "sam", valeur: 120 },
        { jour: "dim", valeur: 60  },
    ],

    clients: [
        { nom: "Quincaillerie Bélanger",  contact: "Marc Bélanger",    courriel: "marc@quincbelanger.ca",     ville: "Québec",         province: "QC", inventaires: 8, derniereActivite: "il y a 2 min",     etat: "Actif"   },
        { nom: "Construction Nord-Côte",  contact: "Priya Nair",       courriel: "priya@nordcote.ca",         ville: "Lévis",          province: "QC", inventaires: 5, derniereActivite: "il y a 11 min",    etat: "Actif"   },
        { nom: "Décor Côtier",            contact: "Danielle Lortie",  courriel: "danielle@decorcotier.ca",   ville: "Montréal",       province: "QC", inventaires: 4, derniereActivite: "il y a 41 min",    etat: "Actif"   },
        { nom: "Électrique Méridien",     contact: "Samuel Ouellet",   courriel: "samuel@meridien.ca",        ville: "Laval",          province: "QC", inventaires: 6, derniereActivite: "il y a 1 h",       etat: "Actif"   },
        { nom: "Plomberie Rivard",        contact: "Erika Rivard",     courriel: "erika@plomberierivard.ca",  ville: "Gatineau",       province: "QC", inventaires: 3, derniereActivite: "il y a 6 jours",   etat: "Inactif" },
        { nom: "Toiture Sommet",          contact: "Léo Marchand",     courriel: "leo@toituresommet.ca",      ville: "Sherbrooke",     province: "QC", inventaires: 2, derniereActivite: "Hier",             etat: "Actif"   },
        { nom: "Menuiserie Vantage",      contact: "Nadia Caron",      courriel: "nadia@vantage.ca",          ville: "Trois-Rivières", province: "QC", inventaires: 1, derniereActivite: "il y a 3 semaines", etat: "Inactif" },
    ],

    inventaires: [
        { ref: "INV-1042", client: "Quincaillerie Bélanger", ville: "Québec",         province: "QC", periode: "19 mai – en cours", articles: 642, responsable: "J. Gravel",   etat: "En cours", tone: "green" },
        { ref: "INV-1041", client: "Construction Nord-Côte", ville: "Lévis",          province: "QC", periode: "18 mai – en cours", articles: 318, responsable: "M. Tremblay", etat: "En cours", tone: "green" },
        { ref: "INV-1040", client: "Décor Côtier",           ville: "Montréal",       province: "QC", periode: "21 mai – en cours", articles: 12,  responsable: "J. Gravel",   etat: "Nouveau",  tone: "blue"  },
        { ref: "INV-1039", client: "Électrique Méridien",    ville: "Laval",          province: "QC", periode: "17 mai – en cours", articles: 489, responsable: "M. Tremblay", etat: "En cours", tone: "green" },
        { ref: "INV-1038", client: "Toiture Sommet",         ville: "Sherbrooke",     province: "QC", periode: "12 mai – 16 mai",   articles: 271, responsable: "J. Gravel",   etat: "Fermé",    tone: "gray"  },
        { ref: "INV-1037", client: "Plomberie Rivard",       ville: "Gatineau",       province: "QC", periode: "08 mai – 10 mai",   articles: 134, responsable: "M. Tremblay", etat: "Fermé",    tone: "gray"  },
        { ref: "INV-1036", client: "Menuiserie Vantage",     ville: "Trois-Rivières", province: "QC", periode: "02 mai – 05 mai",   articles: 96,  responsable: "J. Gravel",   etat: "Fermé",    tone: "gray"  },
    ],
};
