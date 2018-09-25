@if (1==1) @if(1==0) @ELSE
@echo off&SETLOCAL ENABLEEXTENSIONS
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"||(
    cscript //E:JScript //nologo "%~f0"
    @goto :EOF
)

REM Move into the project directory.
CD /D %~dp0

REM Clear any possible pre-existing test area.
IF EXIST test RD /S /Q test

REM Re-create the test area.
MD test

REM Create an empty file and an empty directory.
TYPE NUL> test\file
MD test\folder

REM Create different types of links.
MKLINK test\symlink-file test\file
MKLINK /D test\symlink-folder test\folder
MKLINK /J test\junction-folder test\folder

@goto :EOF
@end @ELSE
ShA=new ActiveXObject("Shell.Application")
ShA.ShellExecute("cmd.exe","/c \""+WScript.ScriptFullName+"\"","","runas",5);
@end
