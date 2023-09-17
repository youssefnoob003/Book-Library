USE [BookUsers]
GO

/****** Object:  StoredProcedure [dbo].[spUsers_GetAll]    Script Date: 9/17/2023 11:05:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spUsers_GetAll]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM dbo.Users;
END
GO

