USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PlaceShip]    Script Date: 6/27/2017 12:06:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_PlaceShip]
(
	@userid		int,
	@x			int,
	@y			int,
	@o			char(1),
	@type		varchar(50),
	@gameid		int

)	AS
BEGIN
	DECLARE		@s		int;
	DECLARE		@typeid	int;

	SELECT		@s = Size
	,			@typeid = TypeId
	FROM		ShipTypesLookup
	WHERE		[Name] = LTRIM(RTRIM(@type))

	DECLARE		@numOfShipOfType	int;

	SELECT		@numOfShipOfType = COUNT(*) 
	FROM		vw_OccupiedCells
	WHERE		PlayerId	= @userid
	AND			GameId		= @gameid

	IF (@numOfShipOfType < 1)
	BEGIN
		IF (dbo.fn_CheckIfIntersecting(@x, @y, @o, @s, @userid) = 0)
		BEGIN
			INSERT		Ships
			VALUES		(@typeid, @userid, @gameid, @x, @y, @o)
		END
		ELSE
		BEGIN
			SELECT -1
		END
	END
	ELSE
	BEGIN
		SELECT -1
	END
END

GO
