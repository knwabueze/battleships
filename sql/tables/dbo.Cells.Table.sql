USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[Cells]    Script Date: 6/23/2017 8:48:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cells](
	[CellId] [int] NOT NULL,
	[X] [int] NOT NULL,
	[Y] [int] NOT NULL,
	[GameId] [int] NOT NULL,
	[OccupiedShipId] [int] NULL,
	[Hit] [bit] NOT NULL,
 CONSTRAINT [PK_Cells] PRIMARY KEY CLUSTERED 
(
	[CellId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Cells]  WITH CHECK ADD  CONSTRAINT [FK_Cells_Games] FOREIGN KEY([GameId])
REFERENCES [dbo].[Games] ([GameId])
GO
ALTER TABLE [dbo].[Cells] CHECK CONSTRAINT [FK_Cells_Games]
GO
ALTER TABLE [dbo].[Cells]  WITH CHECK ADD  CONSTRAINT [FK_Cells_Ships] FOREIGN KEY([OccupiedShipId])
REFERENCES [dbo].[Ships] ([ShipId])
GO
ALTER TABLE [dbo].[Cells] CHECK CONSTRAINT [FK_Cells_Ships]
GO
