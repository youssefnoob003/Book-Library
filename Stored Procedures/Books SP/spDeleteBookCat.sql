USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spDeleteBookCat]    Script Date: 9/17/2023 11:07:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spDeleteBookCat]
	@BookId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Delete from dbo.BookCategory
	where BookId = @BookId;
END
GO

