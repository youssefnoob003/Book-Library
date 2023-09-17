USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spAddCategory]    Script Date: 9/17/2023 11:06:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spAddCategory]
	-- Add the parameters for the stored procedure here
	@Category nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	Insert into dbo.Categories (Category)
	values(@Category);
END
GO

