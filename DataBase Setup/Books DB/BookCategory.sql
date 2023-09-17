USE [Books]
GO

/****** Object:  Table [dbo].[BookCategory]    Script Date: 9/17/2023 11:06:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BookCategory](
	[CategoryId] [int] NOT NULL,
	[BookId] [int] NOT NULL
) ON [PRIMARY]
GO

