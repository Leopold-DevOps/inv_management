using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class InventoryModel : PageModel
{
    public record Inventaire(string Ref, string Client, string Ville, string Province, string Periode, int Articles, string Responsable, string Etat, string Tone);

    public List<Inventaire> Inventaires { get; } = new()
    {
        new("INV-1042", "Quincaillerie Bélanger", "Québec", "QC", "19 mai – en cours", 642, "J. Gravel", "En cours", "green"),
        new("INV-1041", "Construction Nord-Côte", "Lévis", "QC", "18 mai – en cours", 318, "M. Tremblay", "En cours", "green"),
        new("INV-1040", "Décor Côtier", "Montréal", "QC", "21 mai – en cours", 12, "J. Gravel", "Nouveau", "blue"),
        new("INV-1039", "Électrique Méridien", "Laval", "QC", "17 mai – en cours", 489, "M. Tremblay", "En cours", "green"),
        new("INV-1038", "Toiture Sommet", "Sherbrooke", "QC", "12 mai – 16 mai", 271, "J. Gravel", "Fermé", "gray"),
        new("INV-1037", "Plomberie Rivard", "Gatineau", "QC", "08 mai – 10 mai", 134, "M. Tremblay", "Fermé", "gray"),
        new("INV-1036", "Menuiserie Vantage", "Trois-Rivières", "QC", "02 mai – 05 mai", 96, "J. Gravel", "Fermé", "gray"),
    };

    public int EnCoursCount => Inventaires.Count(i => i.Etat == "En cours");
    public int NouveauxCount => Inventaires.Count(i => i.Etat == "Nouveau");
}
