USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CheckIfIntersecting]    Script Date: 6/30/2017 2:59:49 PM ******/
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
		BEGIN
			RETURN 1;
		END	
		
		ELSE IF (@y + ((@s - @counter) * @oriNum ) >= 10) OR (@y + ((@s - @counter) * @oriNum ) <= 0) OR
		(@x >= 10) OR (@x <= 0)
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
		BEGIN
			RETURN 1;
		END			

		ELSE IF (@x + ((@s - @counter) * @oriNum ) >= 10) OR (@x + ((@s - @counter) * @oriNum ) <= 0) OR
		(@y >= 10) OR (@y <= 0)
			RETURN 1;
	END

	SET @counter = @counter - 1;
	
	END
	
	RETURN 0;
END

GO
