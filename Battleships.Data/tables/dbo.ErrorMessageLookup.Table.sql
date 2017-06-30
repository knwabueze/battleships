USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[ErrorMessageLookup]    Script Date: 6/29/2017 11:29:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ErrorMessageLookup](
	[ErrorMessageId] [int] IDENTITY(1,1) NOT NULL,
	[Message] [varchar](200) NOT NULL,
 CONSTRAINT [PK_ErrorMessageLookup_1] PRIMARY KEY CLUSTERED 
(
	[ErrorMessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
