USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spGetCategories_All]    Script Date: 9/17/2023 11:07:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE PROCEDURE [dbo].[spGetCategories_All]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Select Category
	From dbo.Categories;
END
GO

