# Book-Library
This is a complete web application that uses angular and .NET core 6.
It supports SQL as a database.
This application uses an auth service that uses JWT tokens. you can create new users and then login to start using the main app.
Once you're logged in as an admin (for now, to specify a user is an admin, you create one using the form, then you access your db and edit the user role to admin), you can add books, categories and edit your library.
As a normal user, you ll only be able to see the books.
