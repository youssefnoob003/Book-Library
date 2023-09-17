USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spAddBook]    Script Date: 9/17/2023 11:06:52 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spAddBook]
	@Title nvarchar(50),
	@Author nvarchar(50),
	@Id int = 0 output
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert Into Library (Title, Author)
	Values (@Title, @Author);

	select @Id = SCOPE_IDENTITY();
END
GO

