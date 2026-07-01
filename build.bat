bat@echo off
echo Copio i file in www...
copy index.html www\index.html
copy app.js www\app.js
copy i18n.js www\i18n.js
copy manifest.json www\manifest.json
copy service-worker.js www\service-worker.js
xcopy icons www\icons /E /I /Y

echo Sincronizzo con Android...
npx cap sync android

echo.
echo Done! Ora fai git push per compilare l'APK su GitHub Actions.
pause