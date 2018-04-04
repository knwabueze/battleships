USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[HitCells]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HitCells](
	[X] [int] NOT NULL,
	[Y] [int] NOT NULL,
	[GameId] [int] NOT NULL,
	[PlayerId] [int] NOT NULL,
	[HitCellId] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_HitCells] PRIMARY KEY CLUSTERED 
(
	[HitCellId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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
