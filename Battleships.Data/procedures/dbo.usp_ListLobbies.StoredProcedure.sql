USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_ListLobbies]    Script Date: 6/29/2017 11:29:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_ListLobbies] AS
BEGIN

SELECT		l.[Name]
,			l.LobbyId
,			l.CreationDate
,			h.Username
FROM		Lobbies	l
,			Users	h
WHERE		h.UserId = l.HostId
AND			[Status] = 0

END
GO
