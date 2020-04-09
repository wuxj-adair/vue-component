title mongodb
REM --查询当前路径--
set SCRIPT_DIR=%~dp0
REM --运行环境--
for %%I in ("%SCRIPT_DIR%") do set MONGODB_HOME=%%~dpfImongodb
REM --jar包运行--
REM ./mongod --port 27017 --bind_ip 127.0.0.1 --dbpath data/ --logpath log/mongodb.log --logappend --fork 
REM CALL %MONGODB_HOME%\bin\mongod.exe --dbpath=D:\mogodbData
REM  CALL %MONGODB_HOME%\bin\mongod.exe --port 27017  --dbpath=E:\mogodbData
CALL %MONGODB_HOME%\bin\mongod.exe --port 27017  --dbpath=%MONGODB_HOME%\mongodbData
