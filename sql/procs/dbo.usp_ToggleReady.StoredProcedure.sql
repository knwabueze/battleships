USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_ToggleReady]    Script Date: 6/23/2017 9:52:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_ToggleReady]
(
	@userid		int,
	@lobbyid	int
) AS
BEGIN
UPDATE		dbo.Lobbies
SET			[HostReady] = CASE WHEN [HostId] = @userid THEN ~[HostReady] ELSE [HostReady] END
,			[JoinReady] = CASE WHEN [JoinId] = @userid THEN ~[JoinReady] ELSE [JoinReady] END
WHERE		[LobbyId] = @lobbyid
END
GO
