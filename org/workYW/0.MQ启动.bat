title activemq
REM --查询当前路径--
set SCRIPT_DIR=%~dp0
REM --运行环境--
for %%I in ("%SCRIPT_DIR%") do set MQ_HOME=%%~dpfIapache-activemq-5.11.1
REM --运行--
CALL %MQ_HOME%\bin\win64\activemq.bat