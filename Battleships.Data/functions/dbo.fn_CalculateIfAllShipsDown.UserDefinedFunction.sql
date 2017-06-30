USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CalculateIfAllShipsDown]    Script Date: 6/29/2017 11:29:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_CalculateIfAllShipsDown]
(
	@playerid		int,
	@gameid			int
) 
RETURNS BIT
AS
BEGIN

	DECLARE		@countShipsDown	int;
	DECLARE		@totalShips		int;


	SELECT			@countShipsDown = COUNT(DISTINCT ShipId)
	FROM			vw_HitShipCells
	WHERE			HitPlayerId = @playerid
	AND				dbo.fn_CalculateIfShipDown(ShipId) = 1
	AND				GameId = @gameid

	SELECT			@totalShips = COUNT(DISTINCT ShipId)
	FROM			vw_OccupiedCells
	WHERE			PlayerId = @playerid
	AND				GameId = @gameid

	IF (@countShipsDown >= @totalShips)
	BEGIN
		RETURN 1;
	END

	RETURN 0;

END

GO
