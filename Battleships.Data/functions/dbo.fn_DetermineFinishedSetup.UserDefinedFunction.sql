USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_DetermineFinishedSetup]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_DetermineFinishedSetup]
(
	@playerid		int,
	@gameid			int
) 
RETURNS	BIT
AS
BEGIN
	DECLARE		@count int;

	SELECT		@count = COUNT(*)
	FROM		Ships
	WHERE		GameId = @gameid
	AND			UserId = @playerid

	IF @count >= 5
		RETURN 1;

	RETURN 0;
END
GO
