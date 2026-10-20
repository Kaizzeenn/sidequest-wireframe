@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 start_sidequest.py
  goto finished
)
where python >nul 2>nul
if not errorlevel 1 (
  python start_sidequest.py
  goto finished
)
echo Python was not found. Open this folder in VS Code and use Live Server,
echo or publish the entire extracted folder on GitHub Pages.
:finished
pause
