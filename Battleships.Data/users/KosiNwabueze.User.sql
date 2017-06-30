USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  User [KosiNwabueze]    Script Date: 6/30/2017 2:59:48 PM ******/
CREATE USER [KosiNwabueze] FOR LOGIN [KosiNwabueze] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [KosiNwabueze]
GO
