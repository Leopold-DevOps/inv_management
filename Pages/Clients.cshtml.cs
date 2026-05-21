using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class ClientsModel : PageModel
{
    public record Client(string Nom, string Contact, string Courriel, string Ville, string Province, int Inventaires, string DerniereActivite, string Etat);

    public List<Client> Clients { get; } = new()
    {
        new("Quincaillerie Bélanger", "Marc Bélanger", "marc@quincbelanger.ca", "Québec", "QC", 8, "il y a 2 min", "Actif"),
        new("Construction Nord-Côte", "Priya Nair", "priya@nordcote.ca", "Lévis", "QC", 5, "il y a 11 min", "Actif"),
        new("Décor Côtier", "Danielle Lortie", "danielle@decorcotier.ca", "Montréal", "QC", 4, "il y a 41 min", "Actif"),
        new("Électrique Méridien", "Samuel Ouellet", "samuel@meridien.ca", "Laval", "QC", 6, "il y a 1 h", "Actif"),
        new("Plomberie Rivard", "Erika Rivard", "erika@plomberierivard.ca", "Gatineau", "QC", 3, "il y a 6 jours", "Inactif"),
        new("Toiture Sommet", "Léo Marchand", "leo@toituresommet.ca", "Sherbrooke", "QC", 2, "Hier", "Actif"),
        new("Menuiserie Vantage", "Nadia Caron", "nadia@vantage.ca", "Trois-Rivières", "QC", 1, "il y a 3 semaines", "Inactif"),
    };

    public int ActifsCount => Clients.Count(c => c.Etat == "Actif");
}
