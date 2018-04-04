USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[PreparedMessageLookup]    Script Date: 6/30/2017 2:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PreparedMessageLookup](
	[PreparedMessageId] [int] IDENTITY(1,1) NOT NULL,
	[Message] [varchar](50) NOT NULL,
 CONSTRAINT [PK_PreparedMessageLookup] PRIMARY KEY CLUSTERED 
(
	[PreparedMessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
