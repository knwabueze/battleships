USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[Ships]    Script Date: 6/24/2017 4:32:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ships](
	[ShipId] [int] IDENTITY(1,1) NOT NULL,
	[Size] [int] NOT NULL,
	[Affiliation] [bit] NOT NULL,
	[GameId] [int] NOT NULL,
	[Status] [int] NOT NULL,
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
ALTER TABLE [dbo].[Ships]  WITH CHECK ADD  CONSTRAINT [CK_Ships] CHECK  (([Status]<(2) AND [Status]>(-2)))
GO
ALTER TABLE [dbo].[Ships] CHECK CONSTRAINT [CK_Ships]
GO
ALTER TABLE [dbo].[Ships]  WITH CHECK ADD  CONSTRAINT [CK_Ships_1] CHECK  (([X]<=(100) AND [X]>=(0) AND [Y]<=(100) AND [Y]>=(0)))
GO
ALTER TABLE [dbo].[Ships] CHECK CONSTRAINT [CK_Ships_1]
GO
