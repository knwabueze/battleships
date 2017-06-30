USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  User [KosiNwabueze]    Script Date: 6/29/2017 11:29:10 PM ******/
CREATE USER [KosiNwabueze] FOR LOGIN [KosiNwabueze] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [KosiNwabueze]
GO
