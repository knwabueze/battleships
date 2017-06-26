USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_JoinLobby]    Script Date: 6/26/2017 3:05:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[usp_JoinLobby]
(	
	@lobbyid	int,
	@userid		int
) AS
BEGIN

--Update only if JoinID is NULL
UPDATE		Lobbies
SET			[JoinId] = @userid
,			[Status] = 'TRUE'
WHERE		LobbyId = @lobbyid
AND			JoinId	IS NULL

--Did it work?
DECLARE		@joinId int = -1;

SELECT		[JoinId] = @joinId
FROM		Lobbies
WHERE		LobbyId = @lobbyid
AND			JoinId	= @userid

IF @joinId != -1
	BEGIN
		SELECT -1 AS [Status]
	END
ELSE
	BEGIN
		SELECT 0 AS [Status]
	END
END



GO
