@echo off
:: Activa fnm y carga la versión de Node del proyecto
FOR /f "tokens=*" %%i IN ('fnm env --use-on-cd --shell cmd') DO @@%%i
echo [OK] Node %NODE_VERSION% activado via fnm
