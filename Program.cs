using System.Diagnostics;
using System.Runtime.InteropServices;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

// Local-only: bind to loopback so the app is never exposed on the network.
const string url = "http://localhost:5005";
builder.WebHost.UseUrls(url);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();

// Pop the browser open once the server is actually listening.
app.Lifetime.ApplicationStarted.Register(() => OpenBrowser(url));

Console.WriteLine();
Console.WriteLine("  ===============================================");
Console.WriteLine("   DBSI - Inventory Management");
Console.WriteLine("  ===============================================");
Console.WriteLine($"   Running at: {url}");
Console.WriteLine("   Your browser should open automatically.");
Console.WriteLine("   Keep this window open. Press Ctrl+C to stop.");
Console.WriteLine();

app.Run();

static void OpenBrowser(string target)
{
    try
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            Process.Start(new ProcessStartInfo(target) { UseShellExecute = true });
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            Process.Start("xdg-open", target);
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            Process.Start("open", target);
    }
    catch
    {
        // If we can't launch the browser, the user can open the URL manually.
    }
}
