Aggiorna il push.bat con questa versione:
bat@echo off
echo Eseguo build...
call build.bat

echo.
echo Aggiungo file a git...
git add .

set /p msg="Messaggio commit: "
git commit -m "%msg%"

echo.
echo Push su GitHub...
git push origin main

echo.
echo Apro GitHub Actions...
start https://github.com/ricciomg/BasketBubble-CourtStats/actions

echo.
echo Done!
pause