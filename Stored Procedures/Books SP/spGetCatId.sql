USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spGetCatId]    Script Date: 9/17/2023 11:08:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spGetCatId]
	@Category nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   Select CategoryId 
   from Categories
   where Category = @Category;
END
GO

