USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[sbBookCategory_Add]    Script Date: 9/17/2023 11:06:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sbBookCategory_Add]
	@CategoryId int,
	@BookId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert into dbo.BookCategory (CategoryId, BookId)
	Values (@CategoryId, @BookId);
END
GO

