@echo off
REM ============================================================
REM  DBSI - build a single, double-clickable Windows .exe
REM  Produces a self-contained app (no .NET install required
REM  on the machine that runs it).
REM ============================================================

echo.
echo  Building DBSI...
echo.

REM Stop any running instance so its .exe isn't locked during publish.
taskkill /F /IM DBSI.exe >nul 2>&1

dotnet publish DBSI.csproj -c Release -r win-x64 --self-contained true ^
  -p:PublishSingleFile=true ^
  -p:IncludeNativeLibrariesForSelfExtract=true ^
  -p:EnableCompressionInSingleFile=true ^
  -o publish

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo  Build FAILED.
  echo   - If you saw "Access ... DBSI.exe is denied", the app is still
  echo     running. Close its console window and run this again.
  echo   - If it cannot find dotnet, install the .NET 8 SDK:
  echo     https://dotnet.microsoft.com/download/dotnet/8.0
  echo.
  pause
  exit /b 1
)

echo.
echo  Done!  Double-click your app here:
echo     publish\DBSI.exe
echo.
pause
