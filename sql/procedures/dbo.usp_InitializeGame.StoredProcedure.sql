USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  StoredProcedure [dbo].[usp_InitializeGame]    Script Date: 6/27/2017 9:49:37 PM ******/
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
	VALUES		(@HostId, @JoinId, 0, 100, 100, NULL)	

	SELECT 0	AS StatusCode

	END
ELSE
	BEGIN

	SELECT	-1	AS StatusCode

	END

END


GO
