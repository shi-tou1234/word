@echo off
cd /d "%~dp0server"
if exist index.js (
    start cmd /k node index.js
) else (
    echo Error: server/index.js not found
    pause
    exit
)
timeout /t 2 >nul
cd /d "%~dp0"
start "" "单词记录.html"
exit
