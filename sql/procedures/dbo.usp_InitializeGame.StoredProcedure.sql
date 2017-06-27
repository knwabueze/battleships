USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_InitializeGame]    Script Date: 6/27/2017 12:06:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_InitializeGame] 
(
	@fromlobbyid		int
) AS
BEGIN

DECLARE		@Status	bit;
DECLARE		@HostId	int;
DECLARE		@JoinId	int;

SELECT		@Status = [Status]
,			@Hostid = HostId
,			@JoinId = JoinId
FROM		Lobbies 
WHERE		LobbyId = @fromlobbyid

IF  @Status = 1
	BEGIN

	INSERT		Games
	VALUES		(@HostId, @JoinId, 0, 100, 100)	

	SELECT 0

	END
ELSE
	BEGIN

	SELECT		-1;

	END

END


GO
