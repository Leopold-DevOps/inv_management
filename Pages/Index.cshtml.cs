using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class IndexModel : PageModel
{
    public record Stat(string Label, string Value, string Trend, bool TrendUp, string Tone);
    public record Scan(string Item, string Sku, string Client, string Time, string Status, string Tone);
    public record LowStock(string Item, string Client, int Qty, int Reorder);
    public record Bar(string Day, int Value);

    public List<Stat> Stats { get; } = new()
    {
        new("Items tracked", "4,182", "+3.2%", true, "blue"),
        new("Active clients", "27", "+2", true, "green"),
        new("Low stock alerts", "9", "-4", false, "amber"),
        new("Scans today", "318", "+12%", true, "blue"),
    };

    public List<Scan> RecentScans { get; } = new()
    {
        new("Cordless Drill 18V", "DRL-018-BK", "Hartwell Trades", "2 min ago", "In stock", "green"),
        new("Safety Goggles (Clear)", "PPE-GG-CLR", "Northside Build Co.", "11 min ago", "Low stock", "amber"),
        new("Galvanized Screws 50mm", "FST-GS-050", "Hartwell Trades", "26 min ago", "In stock", "green"),
        new("Paint Roller Kit", "PNT-RK-09", "Coastal Interiors", "41 min ago", "Out of stock", "red"),
        new("LED Work Light", "LGT-WL-22", "Meridian Electrical", "1 hr ago", "In stock", "green"),
    };

    public List<LowStock> LowStockItems { get; } = new()
    {
        new("Safety Goggles (Clear)", "Northside Build Co.", 12, 50),
        new("Paint Roller Kit", "Coastal Interiors", 0, 25),
        new("Masking Tape 24mm", "Coastal Interiors", 8, 40),
        new("Cable Ties 200mm", "Meridian Electrical", 15, 60),
    };

    public List<Bar> Week { get; } = new()
    {
        new("Mon", 210), new("Tue", 280), new("Wed", 240),
        new("Thu", 330), new("Fri", 318), new("Sat", 120), new("Sun", 60),
    };

    public int WeekMax => Week.Max(b => b.Value);
}
