using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DBSI.Pages;

public class InventoryModel : PageModel
{
    public record Item(string Name, string Sku, string Barcode, string Client, int Qty, string Location, string Status, string Tone);

    public List<Item> Items { get; } = new()
    {
        new("Cordless Drill 18V", "DRL-018-BK", "8901234500017", "Hartwell Trades", 64, "A1-03", "In stock", "green"),
        new("Galvanized Screws 50mm", "FST-GS-050", "8901234500024", "Hartwell Trades", 1240, "A2-11", "In stock", "green"),
        new("Safety Goggles (Clear)", "PPE-GG-CLR", "8901234500031", "Northside Build Co.", 12, "B1-07", "Low stock", "amber"),
        new("Paint Roller Kit", "PNT-RK-09", "8901234500048", "Coastal Interiors", 0, "C3-02", "Out of stock", "red"),
        new("LED Work Light", "LGT-WL-22", "8901234500055", "Meridian Electrical", 88, "B2-04", "In stock", "green"),
        new("Masking Tape 24mm", "ADH-MT-24", "8901234500062", "Coastal Interiors", 8, "C1-09", "Low stock", "amber"),
        new("Cable Ties 200mm", "ELC-CT-200", "8901234500079", "Meridian Electrical", 15, "B2-12", "Low stock", "amber"),
        new("Heavy Duty Gloves", "PPE-GL-HD", "8901234500086", "Summit Roofing", 156, "B1-02", "In stock", "green"),
        new("Sealant Cartridge", "ADH-SC-310", "8901234500093", "Brightline Plumbing", 47, "C2-05", "In stock", "green"),
        new("Tape Measure 8m", "MSR-TM-08", "8901234500109", "Vantage Joinery", 33, "A3-01", "In stock", "green"),
    };

    public int Total => Items.Sum(i => i.Qty);
    public int LowOrOut => Items.Count(i => i.Tone is "amber" or "red");
}
