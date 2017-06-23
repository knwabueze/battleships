USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_JoinLobby]    Script Date: 6/23/2017 9:52:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_JoinLobby] 
( 
	@userid int
,	@lobbyid int 
) AS
BEGIN
UPDATE		dbo.Lobbies
SET			[JoinId] = CASE WHEN [JoinId] IS NULL THEN @userid ELSE [JoinId] END
,			[JoinReady] = 'FALSE'
WHERE		[LobbyId] = @lobbyid

SELECT		[Name]
,			[CreationDate]
,			[LobbyId]
FROM		dbo.Lobbies
WHERE		[LobbyId] = @lobbyid
END

GO
