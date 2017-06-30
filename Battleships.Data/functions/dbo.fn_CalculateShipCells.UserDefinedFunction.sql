USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CalculateShipCells]    Script Date: 6/29/2017 11:29:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_CalculateShipCells]
(
	@x		int,
	@y		int,
	@s		int,
	@o		char(1)
)
RETURNS @result TABLE
(
	X	int,
	Y	int
)
AS
BEGIN
	DECLARE		@counter	int = 0;
	DECLARE		@isValid	bit	= 1;

	DECLARE @orientationNum int = CASE 
								WHEN @o = 'N' THEN -1
								WHEN @o = 'E' THEN -1
								WHEN @o = 'S' THEN	1
								WHEN @o = 'W' THEN	1
								ELSE 0 END

	WHILE	@counter < @s
	BEGIN
		IF (@o = 'N' OR @o = 'S')
		BEGIN
			IF (@y + ( @orientationNum * @counter ) > 10 ) OR ( @y + ( @orientationNum * @counter ) < 1 )
				SET @isValid = 0;
			INSERT		@result
			VALUES		(@x, @y + (@orientationNum * @counter))
		END
		ELSE IF (@o = 'W' OR @o = 'E')
		BEGIN
			IF (@x + ( @orientationNum * @counter ) > 10 ) OR ( @x + ( @orientationNum * @counter ) < 1 )
				SET @isValid = 0;

			INSERT		@result
			VALUES		(@x + (@orientationNum * @counter), @y)
		END
	SET @counter = @counter + 1;
	IF @isValid = 0 
	BEGIN
		DELETE @result
		RETURN
	END
	END
	RETURN
END


GO
