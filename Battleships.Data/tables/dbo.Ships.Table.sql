USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[Ships]    Script Date: 6/29/2017 11:29:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ships](
	[ShipId] [int] IDENTITY(1,1) NOT NULL,
	[TypeId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[GameId] [int] NOT NULL,
	[X] [int] NOT NULL,
	[Y] [int] NOT NULL,
	[Orientation] [char](1) NOT NULL,
 CONSTRAINT [PK_Ships] PRIMARY KEY CLUSTERED 
(
	[ShipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Ships]  WITH CHECK ADD  CONSTRAINT [FK_Ships_Games1] FOREIGN KEY([GameId])
REFERENCES [dbo].[Games] ([GameId])
GO
ALTER TABLE [dbo].[Ships] CHECK CONSTRAINT [FK_Ships_Games1]
GO
ALTER TABLE [dbo].[Ships]  WITH CHECK ADD  CONSTRAINT [FK_Ships_ShipTypesLookup] FOREIGN KEY([TypeId])
REFERENCES [dbo].[ShipTypesLookup] ([TypeId])
GO
ALTER TABLE [dbo].[Ships] CHECK CONSTRAINT [FK_Ships_ShipTypesLookup]
GO
ALTER TABLE [dbo].[Ships]  WITH CHECK ADD  CONSTRAINT [CK_Ships_1] CHECK  (([X]<=(100) AND [X]>=(0) AND [Y]<=(100) AND [Y]>=(0)))
GO
ALTER TABLE [dbo].[Ships] CHECK CONSTRAINT [CK_Ships_1]
GO
