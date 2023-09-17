USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spUpdate]    Script Date: 9/17/2023 11:08:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spUpdate] 
	@Id int,
	@Title nchar(50),
	@Author nchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
    Update dbo.Library 
	Set Title = @Title, Author = @Author
	Where Id = @Id;
END
GO

