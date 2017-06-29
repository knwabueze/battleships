USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  View [debug].[vw_CheatSheetNotHitCells]    Script Date: 6/28/2017 8:40:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [debug].[vw_CheatSheetNotHitCells] AS

SELECT	X, Y, ShipId, PlayerId
FROM	vw_OccupiedCells	osc
EXCEPT
SELECT	X, Y, ShipId, HitPlayerId
FROM	vw_HitShipCells



GO
