using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class ClientsModel : PageModel
{
    public record Client(string Name, string Contact, string Email, int Items, string Status, string LastActivity);

    public List<Client> Clients { get; } = new()
    {
        new("Hartwell Trades", "Mark Hartwell", "mark@hartwelltrades.com", 642, "Active", "2 min ago"),
        new("Northside Build Co.", "Priya Nair", "priya@northsidebuild.com", 318, "Active", "11 min ago"),
        new("Coastal Interiors", "Dana Lowe", "dana@coastalinteriors.co", 205, "Active", "41 min ago"),
        new("Meridian Electrical", "Sam Okafor", "sam@meridianelec.com", 489, "Active", "1 hr ago"),
        new("Brightline Plumbing", "Erin Walsh", "erin@brightlineplumb.com", 134, "Inactive", "6 days ago"),
        new("Summit Roofing", "Leo Marsh", "leo@summitroofing.com", 271, "Active", "Yesterday"),
        new("Vantage Joinery", "Nadia Khan", "nadia@vantagejoinery.com", 96, "Inactive", "3 weeks ago"),
    };

    public int ActiveCount => Clients.Count(c => c.Status == "Active");
}
