-- create database `Asset`
-- on primary
-- (
-- `name`=`asset_data`,
-- `filename`='E:\学习\数据库\SQL\Asset\asset_data.mdf',
-- `size`=`10mb`,
-- `maxsize`=`50mb`,
-- `filegrowth`=`1mb`
-- )
-- log on
-- (
-- `name`=asset_log,
-- `filename`='E:\学习\数据库\SQL\Asset\asset_log.ldf',
-- `size`=`2mb`,
-- `maxsize`=`5mb`,
-- `filegrowth`=`1%`
-- )


create table `AM_EMPLOYEE`
(
`employeeNo` char(10),
`name` varchar(30) not null,
`sex` char(2) check(sex in ('男','女')),
`address` varchar(100),
`workTelExt` char(11),
`homeTelNo` char(11),
`emplEmailAddress` varchar(30),
`sociaSecurityNumber` char(30),
`DOB` date,
`position` varchar(30),
`salary` varchar(10),
`dateStarted` date,
primary key(`employeeNo`)
)

create table `AM_ASSETCATEGORY`
(
`assetCategoryNo` char(10) primary key,
`assetCategoryDescription` varchar(100)
)

create table `AM_SERVICEAGENT`
(
`agentNo` char(10) primary key,
`agentName` varchar(30) not null unique,
`agentStreet`	VARCHAR(30),
`agentCity`	VARCHAR(30),
`agentState`	VARCHAR(30),
`agentZipCode`	CHAR(6),
`agentTelNo`	CHAR(11) not null unique,
`agentFaxNo`	VARCHAR(11) not null unique,
`agentEmailAddress`	VARCHAR(30),
`agentWebAdderss`	VARCHAR(100),
`contactName`	VARCHAR(10),
`contactTelNo`	CHAR(11),
`contactFaxNo`	VARCHAR(11),
`contactEmailAddress`	VARCHAR(30)
)

create table `AM_STATUS`
(
statuNo	CHAR(10) primary key,
statusDescription	VARCHAR(100)
)

create table AM_ASSET
(
assetNo	CHAR(10) primary key,
assetDescription	VARCHAR(100),
serialNo	CHAR(10) not null unique,
dateAcquired	DATE,	
purchasePrice	VARCHAR(10),
currentValue	VARCHAR(10),
dateSold	DATE,
nextMaintenanceDate	DATE,
employeeNo	CHAR(10),
assetCategoryNo	CHAR(10),
statuNo	CHAR(10),
foreign key(employeeNo) references AM_EMPLOYEE(employeeNo),
foreign key(assetCategoryNo) references AM_ASSETCATEGORY(assetCategoryNo),
foreign key(statuNo) references AM_STATUS(statuNo)
)

create table AM_MAINTENANCE
(
maintenanceNo	CHAR(10) primary key,
maintenanceDate	DATE,	
maintenanceDescription	VARCHAR(100),
maintenanceCost	VARCHAR(10),
assetNo	CHAR(10),
employeeNo	CHAR(10),
agentNo	CHAR(10),
foreign key(assetNO) references AM_ASSET(assetNo),
foreign key(employeeNo) references AM_EMPLOYEE(employeeNo),
foreign key(agentNo) references AM_SERVICEAGENT(agentNo)
)

create table AM_VALUATION
(
valuationNo	CHAR(10) primary key,
valuationDate	DATE,	
valuationPrice	VARCHAR(10),
assetNo	CHAR(10),
employeeNo	CHAR(10),
foreign key(assetNo) references AM_ASSET(assetNo),
foreign key(employeeNo) references AM_EMPLOYEE(employeeNo)
)
