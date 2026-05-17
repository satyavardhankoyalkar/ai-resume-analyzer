@echo off

title ResumeAI Local Engine

echo ==========================================
echo         ResumeAI AI Engine Setup
echo ==========================================
echo.

:: Check Git installation

git --version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (
    echo Git is not installed.
    echo Please install Git from:
    echo https://git-scm.com/downloads
    pause
    exit
)

:: Check Python installation

python --version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (
    echo Python is not installed.
    echo Please install Python 3.11+
    pause
    exit
)

echo.
echo Cloning ResumeAI repository...

git clone https://github.com/satyavardhankoyalkar/ai-resume-analyzer.git

echo.
echo Moving into backend directory...

cd ai-resume-analyzer\backend

echo.
echo Creating virtual environment...

python -m venv venv

echo.
echo Activating virtual environment...

call venv\Scripts\activate

echo.
echo Installing requirements...
echo This may take several minutes...

pip install -r requirements.txt

echo.
echo Starting ResumeAI Engine...

uvicorn app.main:app --reload

pause