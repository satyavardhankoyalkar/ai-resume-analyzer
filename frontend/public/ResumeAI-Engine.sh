#!/bin/bash

echo "=========================================="
echo "      ResumeAI AI Engine Setup"
echo "=========================================="

echo ""
echo "Checking Git..."

if ! command -v git &> /dev/null
then
    echo "Git is not installed."
    exit
fi

echo ""
echo "Checking Python..."

if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed."
    exit
fi

echo ""
echo "Cloning ResumeAI repository..."

git clone https://github.com/satyavardhankoyalkar/ai-resume-analyzer.git

cd ai-resume-analyzer/backend

echo ""
echo "Creating virtual environment..."

python3 -m venv venv

echo ""
echo "Activating virtual environment..."

source venv/bin/activate

echo ""
echo "Installing requirements..."

pip install -r requirements.txt

echo ""
echo "Starting ResumeAI Engine..."

uvicorn app.main:app --reload