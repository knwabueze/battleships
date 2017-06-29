USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_DetermineGameStatus]    Script Date: 6/28/2017 8:40:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION	[dbo].[fn_DetermineGameStatus]
(
	@gameid		int
)
RETURNS	INT
AS
BEGIN

DECLARE		@hasHostPlacedShips	bit
,			@hasJoinPlacedShips	bit;

DECLARE		@hostsShipsDown		bit
,			@joinShipsDown		bit;

SELECT		@hasHostPlacedShips = dbo.fn_DetermineFinishedSetup(HostId, @gameid)
,			@hasJoinPlacedShips	= dbo.fn_DetermineFinishedSetup(JoinId, @gameid)
,			@hostsShipsDown		= dbo.fn_CalculateIfAllShipsDown(HostId, @gameid)
,			@joinShipsDown		= dbo.fn_CalculateIfAllShipsDown(JoinId, @gameid)
FROM		Games
WHERE		GameId = @gameid

IF		@hasHostPlacedShips = 0 OR @hasJoinPlacedShips = 0	RETURN 1;
ELSE IF	@hostsShipsDown = 1	OR	@joinShipsDown = 1	RETURN 3;
ELSE IF	@hostsShipsDown IS NOT NULL OR @joinShipsDown IS NOT NULL RETURN 2;

RETURN -1;

END;
GO
