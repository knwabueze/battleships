USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  User [KosiNwabueze]    Script Date: 6/27/2017 9:49:37 PM ******/
CREATE USER [KosiNwabueze] FOR LOGIN [KosiNwabueze] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [KosiNwabueze]
GO
