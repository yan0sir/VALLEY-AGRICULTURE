@echo off
rem Keeps the Valley Agriculture dev server running on http://localhost:3100.
rem If the server stops for any reason, it restarts after 5 seconds.
rem Output goes to web\server.log.

cd /d "%~dp0.."
title Valley Agriculture server (port 3100)

rem Infinite loop without labels (safe regardless of line endings).
for /l %%i in (0,0,1) do (
  echo [%date% %time%] Starting server>> server.log
  call "C:\Program Files\nodejs\npm.cmd" run dev -- -p 3100 >> server.log 2>&1
  echo [%date% %time%] Server stopped, restarting in 5 seconds>> server.log
  timeout /t 5 /nobreak >nul
)
