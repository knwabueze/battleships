USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CheckIfIntersecting]    Script Date: 6/27/2017 9:49:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_CheckIfIntersecting]
(
	@x			int,		-- X coord
	@y			int,		-- Y coord
	@o			char(1),
	@s			int,
	@playerid	int
)
RETURNS BIT 
AS
BEGIN
	DECLARE		@counter	int = @s;

	DECLARE		@oriNum		int =
		CASE	
			WHEN	@o  = 'N' THEN -1
			WHEN	@o	= 'E' THEN -1
			WHEN	@o	= 'S' THEN	1
			WHEN	@o	= 'W' THEN	1 END

	WHILE @counter > 0
	BEGIN

	IF @o = 'N' OR @o = 'S'
	BEGIN
		IF EXISTS ( 
		SELECT		* 
		FROM		vw_OccupiedCells 
		WHERE		X = @x 
		AND			Y = @y + ( (@s - @counter) * @oriNum )  
		AND			PlayerId = @playerid
		)
			RETURN 1;
	END

	ELSE
	BEGIN
		IF EXISTS (
		SELECT		*
		FROM		vw_OccupiedCells
		WHERE		X = @x + ( (@s - @counter) * @oriNum )
		AND			Y = @y
		AND			PlayerId = @playerid
		)
			RETURN 1;
	END

	SET @counter = @counter - 1;
	
	END
	
	RETURN 0;
END

GO
