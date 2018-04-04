USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  View [dbo].[vw_OpponentsByGame]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vw_OpponentsByGame] AS
SELECT		u1.Username		AS OpponentName
,			u2.Username		AS YourName
,			l1.LobbyId		AS LobbyId
,			u2.UserId		AS YourId
,			u1.UserId		AS OpponentId
FROM		Users	u1
,			Users	u2
,			Lobbies	l1
WHERE		( l1.HostId = u1.UserId
AND			l1.JoinId = u2.UserId )
OR			( l1.HostId = u2.UserId
AND			l1.JoinId = u1.UserId )


GO
