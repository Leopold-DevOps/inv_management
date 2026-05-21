@echo off
REM ============================================================
REM  DBSI - build a single, double-clickable Windows .exe
REM  Produces a self-contained app (no .NET install required
REM  on the machine that runs it).
REM ============================================================

echo.
echo  Building DBSI...
echo.

dotnet publish DBSI.csproj -c Release -r win-x64 --self-contained true ^
  -p:PublishSingleFile=true ^
  -p:IncludeNativeLibrariesForSelfExtract=true ^
  -p:EnableCompressionInSingleFile=true ^
  -o publish

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo  Build FAILED. Make sure the .NET 8 SDK is installed:
  echo  https://dotnet.microsoft.com/download/dotnet/8.0
  echo.
  pause
  exit /b 1
)

echo.
echo  Done!  Double-click your app here:
echo     publish\DBSI.exe
echo.
pause
