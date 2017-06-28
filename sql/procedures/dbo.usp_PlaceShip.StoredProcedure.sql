USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_PlaceShip]    Script Date: 6/27/2017 9:49:37 PM ******/
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
	IF (dbo.fn_DetermineGameStatus(@gameid) = 1)
	BEGIN
		DECLARE		@s		int;
		DECLARE		@typeid	int;

		SELECT		@s = Size
		,			@typeid = TypeId
		FROM		ShipTypesLookup
		WHERE		[Name] = LTRIM(RTRIM(@type))

		DECLARE		@numOfShipOfType	int;

		SELECT		@numOfShipOfType = COUNT(*) 
		FROM		vw_OccupiedCells	oc 
		,			ShipTypesLookup		stl
		,			Ships				s
		WHERE		s.ShipId	= oc.ShipId
		AND			stl.TypeId	= s.TypeId
		AND			oc.PlayerId	= @userid
		AND			s.GameId	= @gameid
		AND			stl.TypeId	= @typeid

		IF (@numOfShipOfType < 1)
		BEGIN
			IF (dbo.fn_CheckIfIntersecting(@x, @y, @o, @s, @userid) = 0)
			BEGIN
				INSERT		Ships
				VALUES		(@typeid, @userid, @gameid, @x, @y, @o)

				SELECT		X	AS X
				,			Y	AS Y
				,			0   AS StatusCode
				FROM		fn_CalculateShipCells(@x, @y, @s, @o)
			END
			ELSE
			BEGIN
				SELECT		NULL	AS X
				,			NULL	AS Y
				,			-1		AS StatusCode
			END
		END
		ELSE
		BEGIN
			SELECT		NULL	AS X
			,			NULL	AS Y
			,			-1		AS StatusCode
		END
	END

	ELSE
	BEGIN
		SELECT	NULL	AS	X
		,		NULL	AS	Y
		,		-1		AS StatusCode
	END
END
GO
