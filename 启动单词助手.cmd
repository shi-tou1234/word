
@echo off
cd /d "%~dp0"

echo Starting Danci Helper...

:: Start Server
cd server
if exist index.js (
    start cmd /k node index.js
) else (
    echo Server file not found!
    pause
    exit
)
cd ..

:: Wait for server
timeout /t 2 >nul

:: Open the HTML file (using wildcard to avoid encoding issues)
for %%f in (*.html) do (
    echo Opening %%f...
    start "" "%%f"
    goto :Done
)

:Done
exit
