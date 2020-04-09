@echo off&setlocal enabledelayedexpansion
title 监控平台配置文件一键修改
rem 主框架配置文件替换
echo 主框架JMS文件替换
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\主框架\jms.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\主框架\jms.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties
 
echo 主框架CONFIG文件替换
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\config.properties (
replace "%cd%\监控平台配置文件\主框架\config.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\config.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\主框架\config.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties
 
echo 主框架MONGODB文件替换
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\主框架\mongodb.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\主框架\mongodb.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties

echo 主框架WEB.XML文件替换
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\web.xml (
replace "%cd%\监控平台配置文件\主框架\web.xml" "%cd%\Monitorweb\webapps\Monitor\WEB-INF"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\web.xml (echo 文件替换完成))else copy %cd%\监控平台配置文件\主框架\web.xml %cd%\Monitorweb\webapps\Monitor\WEB-INF



rem 权限管理配置文件替换

echo 权限管理WEB.XML文件替换
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\web.xml (
replace "%cd%\监控平台配置文件\权限管理\web.xml" "%cd%\Monitorweb\webapps\Manage\WEB-INF"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\web.xml (echo 文件替换完成))else copy %cd%\监控平台配置文件\权限管理\web.xml %cd%\Monitorweb\webapps\Manage\WEB-INF

echo 权限管理MONGODB文件替换
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\权限管理\mongodb.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\权限管理\mongodb.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties

echo 权限管理JMS文件替换
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\权限管理\jms.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\权限管理\jms.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties
 
echo 权限管理CONFIG文件替换
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\config.properties (
replace "%cd%\监控平台配置文件\权限管理\config.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\config.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\权限管理\config.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties


rem 录像查看配置文件替换

echo 录像查看WEB.XML文件替换
if exist %cd%\video\webapps\record\WEB-INF\web.xml (
replace "%cd%\监控平台配置文件\录像查看\web.xml" "%cd%\video\webapps\record\WEB-INF"
if exist %cd%\video\webapps\record\WEB-INF\web.xml (echo 文件替换完成))else copy %cd%\监控平台配置文件\录像查看\web.xml %cd%\video\webapps\record\WEB-INF

echo 录像查看MONGODB文件替换
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\录像查看\mongodb.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\录像查看\mongodb.properties %cd%\video\webapps\record\WEB-INF\classes\properties

echo 录像查看JMS文件替换
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\录像查看\jms.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\录像查看\jms.properties %cd%\video\webapps\record\WEB-INF\classes\properties
 
echo 录像查看CONFIG文件替换
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\config.properties (
replace "%cd%\监控平台配置文件\录像查看\config.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\config.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\录像查看\config.properties %cd%\video\webapps\record\WEB-INF\classes\properties

rem 实时视频配置文件替换
  
echo 实时视频WEB.XML文件替换
if exist %cd%\video\webapps\videoCtrl\WEB-INF\web.xml (
replace "%cd%\监控平台配置文件\实时视频\web.xml" "%cd%\video\webapps\videoCtrl\WEB-INF"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\web.xml (echo 文件替换完成))else copy %cd%\监控平台配置文件\实时视频\web.xml %cd%\video\webapps\videoCtrl\WEB-INF

echo 实时视频MONGODB文件替换
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\实时视频\mongodb.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\实时视频\mongodb.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties

echo 实时视频JMS文件替换
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\实时视频\jms.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\实时视频\jms.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties
 
echo 实时视频CONFIG文件替换
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\config.properties (
replace "%cd%\监控平台配置文件\实时视频\config.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\config.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\实时视频\config.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties
 
rem 报警查看配置文件替换
  
echo 报警模块WEB.XML文件替换
if exist %cd%\video\webapps\alarmplatform\WEB-INF\web.xml (
replace "%cd%\监控平台配置文件\报警模块\web.xml" "%cd%\video\webapps\alarmplatform\WEB-INF"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\web.xml (echo 文件替换完成))else copy %cd%\监控平台配置文件\报警模块\web.xml %cd%\video\webapps\alarmplatform\WEB-INF

echo 报警模块MONGODB文件替换
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\报警模块\mongodb.properties" "%cd%\video\webapps\alarmplatform\WEB-INF\classes\properties"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\报警模块\mongodb.properties %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties

echo 报警模块JMS文件替换
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\报警模块\jms.properties" "%cd%\video\webapps\alarmplatform\WEB-INF\classes\properties"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\报警模块\jms.properties %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties
 
rem 呼叫中心配置文件替换
  

echo 呼叫中心MONGODB文件替换
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\监控平台配置文件\呼叫中心\mongodb.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mongodb.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\呼叫中心\mongodb.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties

echo 呼叫中心JMS文件替换
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\jms.properties (
replace "%cd%\监控平台配置文件\呼叫中心\jms.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\jms.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\呼叫中心\jms.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties
 
 echo 呼叫中心MYSQL文件替换
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql.properties (
replace "%cd%\监控平台配置文件\呼叫中心\mysql.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\呼叫中心\mysql.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties

echo 呼叫中心MYSQL_DEVICE文件替换
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql_device.properties (
replace "%cd%\监控平台配置文件\呼叫中心\mysql_device.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql_device.properties (echo 文件替换完成))else copy %cd%\监控平台配置文件\呼叫中心\mysql_device.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties


 
pause