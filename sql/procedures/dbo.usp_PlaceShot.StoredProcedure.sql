USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PlaceShot]    Script Date: 6/27/2017 1:27:18 PM ******/
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
				SELECT 'Cell has already been shot at.' AS Error
				RETURN;
			END

			IF (@x > 10 OR @y > 10)
			BEGIN
				SELECT 'Shot is out of bounds' AS Error
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
					,			'Sunk enemy ship!'	AS [Message]
					,			NULL				AS Error
				END

				ELSE IF (dbo.fn_CalculateIfAllShipsDown(@enemyid, @gameid) = 1)
				BEGIN
					SELECT		NULL						AS SunkShipId
					,			'You won! Game finished'	AS [Message]
					,			NULL						AS Error
				END

				ELSE
				BEGIN
					SELECT 'Hit enemy ship!'	AS [Message]
					,		NULL				AS SunkShipId
					,		NULL				AS Error
				END
			END
			ELSE
			BEGIN
				SELECT	'Miss enemy ship!'		AS [Message]
				,		NULL					AS Error
				,		NULL					AS SunkShipId
			END
		END

		ELSE
		BEGIN
			SELECT 'It is not your turn.'	AS Error
			,		NULL					AS [Message]
			,		NULL					AS SunkShipId
		
		END
	END
GO
