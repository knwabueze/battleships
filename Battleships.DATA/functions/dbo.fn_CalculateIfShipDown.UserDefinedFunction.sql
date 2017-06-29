USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CalculateIfShipDown]    Script Date: 6/28/2017 8:40:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_CalculateIfShipDown]
(
	@shipid			int
)
RETURNS BIT
AS
BEGIN

DECLARE		@size		int
,			@cellsHit	int;

SELECT		@size = stl.Size
FROM		Ships			s
,			ShipTypesLookup	stl
WHERE		ShipId = @shipid
AND			stl.TypeId = s.TypeId

SELECT		@cellsHit = COUNT(ShipId)
FROM		vw_HitShipCells
WHERE		ShipId = @shipid
GROUP BY	ShipId

IF @cellsHit = @size
	RETURN 1;

RETURN 0;
END
GO
