USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  View [dbo].[vw_HitShipCells]    Script Date: 6/29/2017 11:29:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vw_HitShipCells] AS
SELECT	hc.X			AS	X
,		hc.Y			AS	Y
,		oc.PlayerId		AS	HitPlayerId
,		hc.PlayerId		AS	EnemyId
,		oc.GameId		AS	GameId
,		oc.ShipId		AS	ShipId
,		hc.HitCellId	AS	HitCellId
FROM	vw_OccupiedCells	oc
,		HitCells			hc
WHERE	oc.X = hc.X
AND		oc.Y = hc.Y
AND		oc.GameId = hc.GameId
AND		oc.PlayerId != hc.PlayerId




GO
