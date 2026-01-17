@echo off
"C:\Program Files\Git\bin\git.exe" config --global user.name "Ricardo Alguibay"
"C:\Program Files\Git\bin\git.exe" config --global user.email "ricardo.alguibay@gmail.com"
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit - Coaching TEC project"
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Alguibay/coaching-tec.git
"C:\Program Files\Git\bin\git.exe" push -u origin main
