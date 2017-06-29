USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_CreateUser]    Script Date: 6/28/2017 8:40:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_CreateUser] @username varchar(50)
AS
BEGIN
INSERT INTO		Users
VALUES			(@username)

SELECT			UserId
,				Username
FROM			Users
WHERE			UserId = SCOPE_IDENTITY()
END

GO
