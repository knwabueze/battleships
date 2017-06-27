USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PollUpdate]    Script Date: 6/27/2017 1:27:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_PollUpdate]
(
	@playerid		int,
	@gameid			int
) AS
BEGIN

	DECLARE		@hostid		int
	,			@joinid		int
	,			@lasthit	int
	,			@turn		bit;

	SELECT		@hostid		= HostId
	,			@joinid		= JoinId
	,			@turn		= CurrentTurn
	,			@lasthit	= LastShotId
	FROM		Games
	WHERE		GameId = @gameid

	IF ((@playerid = @hostid AND @turn = 0) OR (@joinid = @playerId AND @turn = 1)) AND (@lasthit IS NOT NULL)
	BEGIN		

		IF (dbo.fn_CalculateIfAllShipsDown(@playerid, @gameid) = 1)
		BEGIN
			SELECT		'Game is finished. You lost.' AS [Message]
			,			NULL				AS Error
			,			NULL				AS X
			,			NULL				AS Y
			,			NULL				AS Payload
			RETURN;
		END		
		
		ELSE
		BEGIN		
			UPDATE		Games
			SET			LastShotId = NULL
			WHERE		GameId = @gameid

			DECLARE @shipid		int;

			SELECT		@shipid = ShipId
			FROM		vw_HitShipCells
			WHERE		HitCellId = @lasthit			

			IF EXISTS (SELECT * FROM vw_HitShipCells WHERE HitCellId = @lasthit)
			BEGIN
				SELECT	'Your ship was hit!'	AS [Message]
				,		NULL					AS Error
				,		NULL					AS Payload
				,		temp.X					AS X
				,		temp.Y					AS Y
				FROM (SELECT X, Y FROM vw_HitShipCells WHERE HitCellId = @lasthit) AS temp
			END

			ELSE IF (dbo.fn_CalculateIfShipDown(@shipid) = 1)
			BEGIN
				SELECT	'You ship was sunk.'	AS [Message]
				,		NULL					AS Error
				,		@shipid					AS Payload
				,		NULL					AS X
				,		NULL					AS Y
			END	

			ELSE
			BEGIN
				SELECT	'Everything is OK!'		AS [Message]
				,		NULL					AS Error
				,		NULL					AS Payload
				,		NULL					AS X
				,		NULL					AS Y
			END
		END
	END
	ELSE IF (@lasthit IS NULL) AND ((@playerid = @hostid AND @turn = 0) OR (@joinid = @playerId AND @turn = 1))
	BEGIN
		SELECT		'You have already checked earlier this turn.'	AS Error
		,			NULL											AS [Message]
		,			NULL											AS Payload
		,			NULL											AS X
		,			NULL											AS Y
		RETURN;
	END
	ELSE
	BEGIN
		SELECT		'It is not your turn.'	AS Error
		,			NULL					AS [Message]
		,			NULL					AS Payload
		,			NULL					AS X
		,			NULL					AS Y
		RETURN;
	END

END
GO
