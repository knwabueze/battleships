USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_InitializeGame]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_InitializeGame] 
(
	@fromlobbyid		int
) AS
BEGIN

DECLARE		@Status	bit;
DECLARE		@HostId	int;
DECLARE		@JoinId	int;

SELECT		@Status = [Status]
,			@Hostid = HostId
,			@JoinId = JoinId
FROM		Lobbies 
WHERE		LobbyId = @fromlobbyid

IF  @Status = 1
	BEGIN

	INSERT		Games
	VALUES		(@HostId, @JoinId, 0, 10, 10, NULL, @fromlobbyid)	

	SELECT	0					AS StatusCode
	,		SCOPE_IDENTITY()	AS GameId
	,		NULL				AS OpponentName

	END
ELSE
	BEGIN

	SELECT	-1		AS	StatusCode
	,		NULL	AS	GameId
	,		NULL	AS	OpponentName
	END

END
GO
