title activemq
REM --��ѯ��ǰ·��--
set SCRIPT_DIR=%~dp0
REM --���л���--
for %%I in ("%SCRIPT_DIR%") do set MQ_HOME=%%~dpfIapache-activemq-5.11.1
REM --����--
CALL %MQ_HOME%\bin\win64\activemq.bat