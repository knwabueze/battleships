USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[Games]    Script Date: 6/29/2017 11:29:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Games](
	[GameId] [int] IDENTITY(1,1) NOT NULL,
	[HostId] [int] NOT NULL,
	[JoinId] [int] NOT NULL,
	[CurrentTurn] [bit] NOT NULL,
	[Width] [int] NOT NULL,
	[Height] [int] NOT NULL,
	[LastShotId] [int] NULL,
	[FromLobbyId] [int] NULL,
 CONSTRAINT [PK_Games] PRIMARY KEY CLUSTERED 
(
	[GameId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD  CONSTRAINT [FK_Games_HitCells] FOREIGN KEY([LastShotId])
REFERENCES [dbo].[HitCells] ([HitCellId])
GO
ALTER TABLE [dbo].[Games] CHECK CONSTRAINT [FK_Games_HitCells]
GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD  CONSTRAINT [FK_Games_Lobbies] FOREIGN KEY([FromLobbyId])
REFERENCES [dbo].[Lobbies] ([LobbyId])
GO
ALTER TABLE [dbo].[Games] CHECK CONSTRAINT [FK_Games_Lobbies]
GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD  CONSTRAINT [FK_Games_Users3] FOREIGN KEY([HostId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Games] CHECK CONSTRAINT [FK_Games_Users3]
GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD  CONSTRAINT [FK_Games_Users4] FOREIGN KEY([JoinId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Games] CHECK CONSTRAINT [FK_Games_Users4]
GO
