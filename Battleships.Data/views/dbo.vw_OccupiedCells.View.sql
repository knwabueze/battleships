USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  View [dbo].[vw_OccupiedCells]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_OccupiedCells] AS
SELECT			f.X				AS X
,				f.Y				AS Y
,				s.ShipId		AS ShipId
,				s.UserId		AS PlayerId
,				s.GameId		AS GameId
FROM			Ships			AS s
JOIN			ShipTypesLookup	AS stl ON s.TypeId = stl.TypeId
CROSS APPLY		fn_CalculateShipCells(s.X, s.Y, stl.Size, s.Orientation) AS f
GO
