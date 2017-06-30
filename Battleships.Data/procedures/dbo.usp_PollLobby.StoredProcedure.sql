USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PollLobby]    Script Date: 6/29/2017 11:29:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_PollLobby]
(
	@lobbyid	int,
	@userid		int
) AS
BEGIN

	DECLARE		@status	bit;

	SELECT		@status = [Status]
	FROM		Lobbies
	WHERE		LobbyId = @lobbyid
	AND			(HostId = @userid
	OR			JoinId = @userid)

	IF @status = 0
	BEGIN
		SELECT	1		AS StatusCode
		,		NULL	AS GameId
	END

	ELSE
	BEGIN
		IF EXISTS (SELECT * FROM Games WHERE FromLobbyId = @lobbyid AND (HostId = @userid OR JoinId = @userid))
		BEGIN
			SELECT	0	AS StatusCode
			,		(	SELECT		GameId
						FROM		Games
						WHERE		FromLobbyId = @lobbyid)	AS GameId
		END

		ELSE
		BEGIN
			EXEC usp_InitializeGame @lobbyid
		END		
	END

END


GO
