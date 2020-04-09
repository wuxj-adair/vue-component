set SCRIPT_DIR=%~dp0
for %%I in ("%SCRIPT_DIR%") do set CATALINA_BASE_TEST=%%~dpfICallCenter
echo CATALINA_BASE_FACE
for %%I in ("%SCRIPT_DIR%") do set CATALINA_HOME_TEST=%%~dpfICallCenter
for %%I in ("%SCRIPT_DIR%") do set JAVA_HOME=%%~dpfIJVM\jre7
CALL %CATALINA_HOME_TEST%\bin\startup.bat