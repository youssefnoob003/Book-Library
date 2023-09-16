using BookLibrary.Models;
using Dapper;
using Microsoft.AspNetCore.Identity;
using System.Data;
using System.Reflection;

namespace BookLibrary.DbConnector
{
    public class SqlConnector
    {
        private readonly string _connectionString;

        public SqlConnector(IConfiguration configuration)
        {
            // Access the connection string from the configuration object
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<BookModel> GetBooks()
        {
            List<BookModel> output = new List<BookModel>();

            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                output = connection.Query<BookModel>("spGetBooks_All").ToList();

                foreach (BookModel book in output)
                {
                    DynamicParameters p = new DynamicParameters();
                    p.Add("@BookId", book.Id);

                    book.Categories = connection.Query<string>("spGetCategoriesForBook", p, commandType: CommandType.StoredProcedure).ToList();
                }
            }

            return output;
        }
        public List<string> getCategories()
        {
            List<string> output = new List<string>();

            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                output = connection.Query<string>("spGetCategories_All").ToList();
            }

            return output;
        }

        public void AddBook(BookModel book)
        {
            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@Title", book.Title);
                p.Add("@Author", book.Author);
                p.Add("@Id", 0, dbType: DbType.Int32, direction: ParameterDirection.Output);

                connection.Execute("spAddBook", p, commandType: CommandType.StoredProcedure);
                book.Id = p.Get<int>("@Id");

                foreach (string category in book.Categories)
                {
                    p = new DynamicParameters();
                    p.Add("@category", category);
                    int Id = connection.QueryFirstOrDefault<int>("spGetCatId", p, commandType: CommandType.StoredProcedure);

                    p = new DynamicParameters();

                    p.Add("@CategoryId", Id);
                    p.Add("@BookId", book.Id);

                    connection.Execute("sbBookCategory_Add", p, commandType: CommandType.StoredProcedure);
                }
            }
        }

        public void DeleteBook(BookModel book)
        {
            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@Id", book.Id);

                connection.Execute("spDelete", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void AddCategory(Category cat)
        {
            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@Category", cat.Name);

                connection.Execute("spAddCategory", p, commandType: CommandType.StoredProcedure);
            }
        }

        public void DeleteCategory(Category cat)
        {
            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@Category", cat.Name);

                connection.Execute("spDelCategory", p, commandType: CommandType.StoredProcedure);
            }
        }

        public void UpdateBook(BookModel book)
        {
            using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@Id", book.Id);
                p.Add("@Title", book.Title);
                p.Add("@Author", book.Author);

                connection.Execute("spUpdate", p, commandType: CommandType.StoredProcedure);

                p = new DynamicParameters();

                p.Add("@BookId", book.Id);
                connection.Execute("spDeleteBookCat", p, commandType: CommandType.StoredProcedure);

                foreach (string category in book.Categories)
                {
                    p = new DynamicParameters();
                    p.Add("@category", category);
                    int Id = connection.QueryFirstOrDefault<int>("spGetCatId", p, commandType: CommandType.StoredProcedure);

                    p = new DynamicParameters();

                    p.Add("@CategoryId", Id);
                    p.Add("@BookId", book.Id);

                    connection.Execute("sbBookCategory_Add", p, commandType: CommandType.StoredProcedure);
                }
            }
        }
    }
}
