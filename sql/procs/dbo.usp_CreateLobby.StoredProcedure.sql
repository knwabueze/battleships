USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_CreateLobby]    Script Date: 6/23/2017 9:52:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_CreateLobby] @name varchar(50), @hostid int
AS
BEGIN
INSERT INTO		dbo.Lobbies
VALUES			(@name, GETDATE(), @hostid, NULL, 'FALSE', NULL)

SELECT		[CreationDate]
,			[Name]
,			[HostId]
,			[LobbyId]
FROM		dbo.Lobbies
WHERE		LobbyId = SCOPE_IDENTITY()
END

GO
