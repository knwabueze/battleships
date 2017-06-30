USE [KosiNwabuezeBattleships2017]
GO
/****** Object:  Table [dbo].[ShipTypesLookup]    Script Date: 6/29/2017 11:29:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShipTypesLookup](
	[TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Size] [int] NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ShipTypes] PRIMARY KEY CLUSTERED 
(
	[TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
