USE [Books]
GO

/****** Object:  StoredProcedure [dbo].[spGetCategoriesForBook]    Script Date: 9/17/2023 11:07:49 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGetCategoriesForBook]
    @BookId int
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    SELECT category
    FROM Categories AS c
    INNER JOIN BookCategory AS bc ON c.CategoryId = bc.CategoryId
    WHERE bc.BookId = @BookId;
END

GO

