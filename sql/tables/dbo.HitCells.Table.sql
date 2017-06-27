USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[HitCells]    Script Date: 6/27/2017 12:06:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HitCells](
	[X] [int] NOT NULL,
	[Y] [int] NOT NULL,
	[GameId] [int] NOT NULL,
	[PlayerId] [int] NOT NULL
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[HitCells]  WITH CHECK ADD  CONSTRAINT [FK_HitCells_Games] FOREIGN KEY([GameId])
REFERENCES [dbo].[Games] ([GameId])
GO
ALTER TABLE [dbo].[HitCells] CHECK CONSTRAINT [FK_HitCells_Games]
GO
ALTER TABLE [dbo].[HitCells]  WITH CHECK ADD  CONSTRAINT [FK_HitCells_Users] FOREIGN KEY([PlayerId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[HitCells] CHECK CONSTRAINT [FK_HitCells_Users]
GO
