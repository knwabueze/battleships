USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PlaceShot]    Script Date: 6/29/2017 11:29:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_PlaceShot]
(
	@x			int,
	@y			int,
	@gameid		int,
	@playerid	int
) AS
BEGIN
	IF (dbo.fn_DetermineGameStatus(@gameid) = 2)
	BEGIN
		DECLARE		@turn	bit
		,			@hostid	int
		,			@joinid	int;

		SELECT		@turn = g.CurrentTurn
		,			@hostid = g.HostId
		,			@joinid = g.JoinId
		FROM		Games	g
		WHERE		GameId = @gameid

		
		IF (@turn = 0 AND @playerid = @hostid) OR (@turn = 1 AND @playerid = @joinid)
		BEGIN			

			IF EXISTS (SELECT * FROM HitCells WHERE X = @x AND Y = @y AND PlayerId = @playerid)
			BEGIN

				SELECT	[Message]		AS Error
				,		NULL			AS [Message]
				,		NULL			AS SunkShipId
				,		ErrorMessageId	AS ErrorCode
				,		0				AS MessageCode
				FROM	ErrorMessageLookup
				WHERE	ErrorMessageId = 1

				RETURN;
			END

			IF (@x > 10 OR @y > 10)
			BEGIN
				SELECT	[Message]		AS Error
				,		NULL			AS [Message]
				,		NULL			AS SunkShipId
				,		ErrorMessageId	AS ErrorCode
				,		0				AS MessageCode
				FROM	ErrorMessageLookup
				WHERE	ErrorMessageId = 2
			END

			INSERT		HitCells
			VALUES		(@x, @y, @gameid, @playerid)

			UPDATE		Games
			SET			CurrentTurn = ~(CurrentTurn)
			,			LastShotId = SCOPE_IDENTITY()
			WHERE		GameId = @gameid

			DECLARE		@shipid		int
			,			@enemyid	int;

			SELECT		@shipid = ShipId
			,			@enemyid = HitPlayerId
			FROM		vw_HitShipCells
			WHERE		X = @x 
			AND			Y = @y 
			AND			EnemyId = @playerid
			AND			GameId = @gameid

			IF (@shipid IS NOT NULL)
			BEGIN				

				IF (dbo.fn_CalculateIfShipDown(@shipid) = 1)
				BEGIN
					SELECT		@shipid				AS SunkShipId
					,			[Message]			AS [Message]
					,			NULL				AS Error
					,			0					AS ErrorCode
					,			PreparedMessageId	AS MessageCode
					FROM		PreparedMessageLookup
					WHERE		PreparedMessageId = 1
				END

				ELSE IF (dbo.fn_CalculateIfAllShipsDown(@enemyid, @gameid) = 1)
				BEGIN
					SELECT		NULL				AS SunkShipId
					,			[Message]			AS [Message]
					,			NULL				AS Error
					,			0					AS ErrorCode
					,			PreparedMessageId	AS MessageCode
					FROM		PreparedMessageLookup
					WHERE		PreparedMessageId = 2
				END

				ELSE
				BEGIN
					SELECT		NULL				AS SunkShipId
					,			[Message]			AS [Message]
					,			NULL				AS Error
					,			0					AS ErrorCode
					,			PreparedMessageId	AS MessageCode
					FROM		PreparedMessageLookup
					WHERE		PreparedMessageId = 3
				END
			END
			ELSE
			BEGIN
				SELECT		NULL				AS SunkShipId
					,			[Message]			AS [Message]
					,			NULL				AS Error
					,			0					AS ErrorCode
					,			PreparedMessageId	AS MessageCode
					FROM		PreparedMessageLookup
					WHERE		PreparedMessageId = 3
			END
		END

		ELSE
		BEGIN
			SELECT	[Message]		AS Error
			,		NULL			AS [Message]
			,		NULL			AS SunkShipId
			,		ErrorMessageId	AS ErrorCode
			,		0				AS MessageCode
			FROM	ErrorMessageLookup
			WHERE	ErrorMessageId = 3
		END
	END
	ELSE
	BEGIN
		SELECT	[Message]		AS Error
		,		NULL			AS [Message]
		,		NULL			AS SunkShipId
		,		ErrorMessageId	AS ErrorCode
		,		0				AS MessageCode
		FROM	ErrorMessageLookup
		WHERE	ErrorMessageId = 4
	END
END

SELECT * FROM PreparedMessageLookup
SELECT * FROM ErrorMessageLookup
GO
