@echo off&setlocal enabledelayedexpansion
title ���ƽ̨�����ļ�һ���޸�
rem ����������ļ��滻
echo �����JMS�ļ��滻
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\�����\jms.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\�����\jms.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties
 
echo �����CONFIG�ļ��滻
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\config.properties (
replace "%cd%\���ƽ̨�����ļ�\�����\config.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\config.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\�����\config.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties
 
echo �����MONGODB�ļ��滻
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\�����\mongodb.properties" "%cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\�����\mongodb.properties %cd%\Monitorweb\webapps\Monitor\WEB-INF\classes\properties

echo �����WEB.XML�ļ��滻
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\web.xml (
replace "%cd%\���ƽ̨�����ļ�\�����\web.xml" "%cd%\Monitorweb\webapps\Monitor\WEB-INF"
if exist %cd%\Monitorweb\webapps\Monitor\WEB-INF\web.xml (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\�����\web.xml %cd%\Monitorweb\webapps\Monitor\WEB-INF



rem Ȩ�޹��������ļ��滻

echo Ȩ�޹���WEB.XML�ļ��滻
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\web.xml (
replace "%cd%\���ƽ̨�����ļ�\Ȩ�޹���\web.xml" "%cd%\Monitorweb\webapps\Manage\WEB-INF"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\web.xml (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\Ȩ�޹���\web.xml %cd%\Monitorweb\webapps\Manage\WEB-INF

echo Ȩ�޹���MONGODB�ļ��滻
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\Ȩ�޹���\mongodb.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\Ȩ�޹���\mongodb.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties

echo Ȩ�޹���JMS�ļ��滻
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\Ȩ�޹���\jms.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\Ȩ�޹���\jms.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties
 
echo Ȩ�޹���CONFIG�ļ��滻
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\config.properties (
replace "%cd%\���ƽ̨�����ļ�\Ȩ�޹���\config.properties" "%cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties"
if exist %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties\config.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\Ȩ�޹���\config.properties %cd%\Monitorweb\webapps\Manage\WEB-INF\classes\properties


rem ¼��鿴�����ļ��滻

echo ¼��鿴WEB.XML�ļ��滻
if exist %cd%\video\webapps\record\WEB-INF\web.xml (
replace "%cd%\���ƽ̨�����ļ�\¼��鿴\web.xml" "%cd%\video\webapps\record\WEB-INF"
if exist %cd%\video\webapps\record\WEB-INF\web.xml (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\¼��鿴\web.xml %cd%\video\webapps\record\WEB-INF

echo ¼��鿴MONGODB�ļ��滻
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\¼��鿴\mongodb.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\¼��鿴\mongodb.properties %cd%\video\webapps\record\WEB-INF\classes\properties

echo ¼��鿴JMS�ļ��滻
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\¼��鿴\jms.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\¼��鿴\jms.properties %cd%\video\webapps\record\WEB-INF\classes\properties
 
echo ¼��鿴CONFIG�ļ��滻
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\config.properties (
replace "%cd%\���ƽ̨�����ļ�\¼��鿴\config.properties" "%cd%\video\webapps\record\WEB-INF\classes\properties"
if exist %cd%\video\webapps\record\WEB-INF\classes\properties\config.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\¼��鿴\config.properties %cd%\video\webapps\record\WEB-INF\classes\properties

rem ʵʱ��Ƶ�����ļ��滻
  
echo ʵʱ��ƵWEB.XML�ļ��滻
if exist %cd%\video\webapps\videoCtrl\WEB-INF\web.xml (
replace "%cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\web.xml" "%cd%\video\webapps\videoCtrl\WEB-INF"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\web.xml (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\web.xml %cd%\video\webapps\videoCtrl\WEB-INF

echo ʵʱ��ƵMONGODB�ļ��滻
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\mongodb.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\mongodb.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties

echo ʵʱ��ƵJMS�ļ��滻
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\jms.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\jms.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties
 
echo ʵʱ��ƵCONFIG�ļ��滻
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\config.properties (
replace "%cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\config.properties" "%cd%\video\webapps\videoCtrl\WEB-INF\classes\properties"
if exist %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties\config.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\ʵʱ��Ƶ\config.properties %cd%\video\webapps\videoCtrl\WEB-INF\classes\properties
 
rem �����鿴�����ļ��滻
  
echo ����ģ��WEB.XML�ļ��滻
if exist %cd%\video\webapps\alarmplatform\WEB-INF\web.xml (
replace "%cd%\���ƽ̨�����ļ�\����ģ��\web.xml" "%cd%\video\webapps\alarmplatform\WEB-INF"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\web.xml (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\����ģ��\web.xml %cd%\video\webapps\alarmplatform\WEB-INF

echo ����ģ��MONGODB�ļ��滻
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\����ģ��\mongodb.properties" "%cd%\video\webapps\alarmplatform\WEB-INF\classes\properties"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\����ģ��\mongodb.properties %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties

echo ����ģ��JMS�ļ��滻
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\����ģ��\jms.properties" "%cd%\video\webapps\alarmplatform\WEB-INF\classes\properties"
if exist %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\����ģ��\jms.properties %cd%\video\webapps\alarmplatform\WEB-INF\classes\properties
 
rem �������������ļ��滻
  

echo ��������MONGODB�ļ��滻
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mongodb.properties (
replace "%cd%\���ƽ̨�����ļ�\��������\mongodb.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mongodb.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\��������\mongodb.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties

echo ��������JMS�ļ��滻
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\jms.properties (
replace "%cd%\���ƽ̨�����ļ�\��������\jms.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\jms.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\��������\jms.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties
 
 echo ��������MYSQL�ļ��滻
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql.properties (
replace "%cd%\���ƽ̨�����ļ�\��������\mysql.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\��������\mysql.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties

echo ��������MYSQL_DEVICE�ļ��滻
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql_device.properties (
replace "%cd%\���ƽ̨�����ļ�\��������\mysql_device.properties" "%cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties"
if exist %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties\mysql_device.properties (echo �ļ��滻���))else copy %cd%\���ƽ̨�����ļ�\��������\mysql_device.properties %cd%\CallCenter\webapps\malfunctionfilter\WEB-INF\classes\properties


 
pause