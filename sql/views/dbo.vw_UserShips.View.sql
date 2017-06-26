USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  View [dbo].[vw_UserShips]    Script Date: 6/26/2017 3:05:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vw_UserShips] AS
SELECT		s.X				AS HeadX
,			s.Y				AS HeadY
,			s.Orientation	AS Orientation
,			u.Username		AS PlayerUsername
,			u.UserId		AS PlayerId
FROM		dbo.Ships	s
,			dbo.Games	g
,			dbo.Users	u
WHERE		s.UserId = u.UserId
AND			s.GameId = g.GameId

GO
