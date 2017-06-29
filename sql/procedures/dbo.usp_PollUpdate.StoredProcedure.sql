USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PollUpdate]    Script Date: 6/28/2017 8:40:28 PM ******/
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
	IF (dbo.fn_DetermineGameStatus(@gameid) = 2)
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
				SELECT		[Message]			AS [Message]
				,			PreparedMessageId	AS MessageCode
				,			0					AS ErrorCode
				,			NULL				AS Error
				,			NULL				AS X
				,			NULL				AS Y
				,			NULL				AS SunkShipId
				FROM		PreparedMessageLookup
				WHERE		PreparedMessageId = 5
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
					SELECT	pml.[Message]			AS [Message]
					,		pml.PreparedMessageId	AS MessageCode
					,		NULL					AS Error
					,		0						AS ErrorCode
					,		NULL					AS SunkShipId
					,		temp.X					AS X
					,		temp.Y					AS Y
					FROM	(SELECT X, Y FROM vw_HitShipCells WHERE HitCellId = @lasthit)	AS temp
					,		PreparedMessageLookup											AS pml
					WHERE	PreparedMessageId = 6
				END

				ELSE IF (dbo.fn_CalculateIfShipDown(@shipid) = 1)
				BEGIN
					SELECT		[Message]				AS [Message]
					,			pml.PreparedMessageId	AS MessageCode
					,			0						AS ErrorCode
					,			NULL					AS Error
					,			temp.X					AS X
					,			temp.Y					AS Y
					,			@shipid					AS SunkShipId
					FROM		(SELECT X, Y FROM vw_HitShipCells WHERE HitCellId = @lasthit)	AS temp
					,			PreparedMessageLookup											AS pml
					WHERE		PreparedMessageId = 7
				END	

				ELSE
				BEGIN
					SELECT		[Message]			AS [Message]
					,			PreparedMessageId	AS MessageCode
					,			0					AS ErrorCode
					,			NULL				AS Error
					,			NULL				AS X
					,			NULL				AS Y
					,			NULL				AS SunkShipId
					FROM		PreparedMessageLookup
					WHERE		PreparedMessageId = 8
				END
			END
		END
		ELSE IF (@lasthit IS NULL) AND ((@playerid = @hostid AND @turn = 0) OR (@joinid = @playerId AND @turn = 1))
		BEGIN
			SELECT		[Message]		AS Error
			,			ErrorMessageId	AS ErrorCode
			,			NULL			AS [Message]
			,			NULL			AS SunkShipId
			,			0				AS MessageCode
			,			NULL			AS X
			,			NULL			AS Y
			FROM		ErrorMessageLookup
			WHERE		ErrorMessageId = 5
			RETURN;
		END
		ELSE
		BEGIN
			SELECT		[Message]		AS Error
			,			ErrorMessageId	AS ErrorCode
			,			0				AS MessageCode
			,			NULL			AS [Message]
			,			NULL			AS SunkShipId
			,			NULL			AS X
			,			NULL			AS Y
			FROM		ErrorMessageLookup
			WHERE		ErrorMessageId = 6
			RETURN;
		END
	END
	ELSE
	BEGIN
		IF (dbo.fn_CalculateIfAllShipsDown(@playerid, @gameid) = 1)
		BEGIN
			SELECT		[Message]			AS [Message]
			,			PreparedMessageId	AS MessageCode
			,			0					AS ErrorCode
			,			NULL				AS Error
			,			NULL				AS X
			,			NULL				AS Y
			,			NULL				AS SunkShipId
			FROM		PreparedMessageLookup
			WHERE		PreparedMessageId = 5
			RETURN;
		END

		SELECT		[Message]		AS Error
		,			ErrorMessageId	AS ErrorCode
		,			0				AS MessageCode
		,			NULL			AS [Message]
		,			NULL			AS SunkShipId
		,			NULL			AS X
		,			NULL			AS Y
		FROM		ErrorMessageLookup
		WHERE		ErrorMessageId = 7
	END
END
GO
