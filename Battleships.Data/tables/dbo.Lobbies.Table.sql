USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[Lobbies]    Script Date: 6/28/2017 8:40:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lobbies](
	[LobbyId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[HostId] [int] NOT NULL,
	[JoinId] [int] NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Lobbies] PRIMARY KEY CLUSTERED 
(
	[LobbyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Lobbies]  WITH CHECK ADD  CONSTRAINT [FK_Lobbies_Users3] FOREIGN KEY([HostId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Lobbies] CHECK CONSTRAINT [FK_Lobbies_Users3]
GO
ALTER TABLE [dbo].[Lobbies]  WITH CHECK ADD  CONSTRAINT [FK_Lobbies_Users4] FOREIGN KEY([JoinId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Lobbies] CHECK CONSTRAINT [FK_Lobbies_Users4]
GO
