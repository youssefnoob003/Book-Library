USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spDelCategory]    Script Date: 9/17/2023 11:07:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spDelCategory]
	@Category nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @CategoryId INT;

	-- Get the categoryId for the given category
	SELECT @CategoryId = categoryId FROM dbo.Categories WHERE Category = @Category;

	-- Call the spDeleteBookCat procedure with the retrieved categoryId
	EXEC spBookCat_DelId @CategoryId;

	-- Delete the category from the Categories table
	DELETE FROM dbo.Categories
	WHERE Category = @Category;
END

GO

