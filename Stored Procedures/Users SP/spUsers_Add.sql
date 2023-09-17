USE [BookUsers]
GO

/****** Object:  StoredProcedure [dbo].[spUsers_Add]    Script Date: 9/17/2023 11:04:56 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spUsers_Add]
	@Id int = 0 output,
	@UserName nvarchar(100),
	@Password nvarchar(100),
	@Role nvarchar(50),
	@Email nvarchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Insert into dbo.Users (UserName, Password, Email, Role)
	values(@UserName, @Password, @Email, @Role);
	Select @Id = SCOPE_IDENTITY();
END
GO

