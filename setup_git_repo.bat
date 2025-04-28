@echo off
REM Initialize Git repository
git init

REM Add README.md to the staging area
git add README.md

REM Make the initial commit
git commit -m "Initial commit"

echo Git repository has been initialized successfully.
echo You can now add more files and make additional commits.
pause
