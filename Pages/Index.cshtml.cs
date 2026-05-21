using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class IndexModel : PageModel
{
    public record Stat(string Label, string Value, string Trend, bool TrendUp, string Tone);
    public record Scan(string Produit, string Code, string Client, string Section, int Qte, string Heure);
    public record InvSummary(string Client, string Ville, string Etat, string Tone, int Avancement);
    public record Bar(string Jour, int Valeur);

    public List<Stat> Stats { get; } = new()
    {
        new("Inventaires en cours", "6", "+2", true, "blue"),
        new("Nouveaux inventaires", "3", "+1", true, "amber"),
        new("Clients actifs", "27", "+2", true, "green"),
        new("Scans aujourd'hui", "318", "+12 %", true, "blue"),
    };

    public List<InvSummary> EnCours { get; } = new()
    {
        new("Quincaillerie Bélanger", "Québec, QC", "En cours", "green", 72),
        new("Construction Nord-Côte", "Lévis, QC", "En cours", "green", 45),
        new("Décor Côtier", "Montréal, QC", "Nouveau", "blue", 5),
        new("Électrique Méridien", "Laval, QC", "En cours", "green", 88),
    };

    public List<Scan> DerniersScans { get; } = new()
    {
        new("Perceuse sans fil 18V", "8901234500017", "Quincaillerie Bélanger", "A-03", 12, "il y a 2 min"),
        new("Lunettes de sécurité", "8901234500031", "Construction Nord-Côte", "B-07", 48, "il y a 11 min"),
        new("Vis galvanisées 50 mm", "8901234500024", "Quincaillerie Bélanger", "A-11", 1240, "il y a 26 min"),
        new("Ensemble rouleau à peinture", "8901234500048", "Décor Côtier", "C-02", 24, "il y a 41 min"),
        new("Lampe de travail DEL", "8901234500055", "Électrique Méridien", "B-04", 60, "il y a 1 h"),
    };

    public List<Bar> Semaine { get; } = new()
    {
        new("lun", 210), new("mar", 280), new("mer", 240),
        new("jeu", 330), new("ven", 318), new("sam", 120), new("dim", 60),
    };

    public int SemaineMax => Semaine.Max(b => b.Valeur);
}
