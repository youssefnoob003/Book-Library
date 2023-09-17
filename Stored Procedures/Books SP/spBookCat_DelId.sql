USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spBookCat_DelId]    Script Date: 9/17/2023 11:07:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spBookCat_DelId]
	-- Add the parameters for the stored procedure here
	@CatId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE from dbo.BookCategory 
	where CategoryId = @CatId;
END
GO

