@echo off
REM ============================================================
REM  Sauvegarde de tous les vaults Obsidian vers GitHub
REM  Placer ce fichier a la racine du dossier Obsidian\
REM  Double-clic pour sauvegarder.
REM ============================================================
cd /d "%~dp0"

git add -A
git commit -m "Sauvegarde vaults %date% %time%"
git push origin master

echo.
echo Sauvegarde terminee.
pause
