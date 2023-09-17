USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spDelete]    Script Date: 9/17/2023 11:07:20 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spDelete]
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM Library
	WHERE Id = @Id;
END
GO

