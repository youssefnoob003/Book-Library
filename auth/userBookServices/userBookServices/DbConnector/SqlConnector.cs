using System.Data;
using userBookServices.Models;
using System.Data.SqlClient;
using Dapper;

namespace userBookServices.DbConnector
{
    public class SqlConnector
    {
        private readonly string _connectionString;

        public SqlConnector(IConfiguration configuration)
        {
            // Access the connection string from the configuration object
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void GetPrefCats(User x)
        {
            List<string> cats = new List<string>();

            using (IDbConnection connection = new SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@UserId", x.Id);
                cats = connection.Query<string>("spGetCategoriesForUser", p, commandType: CommandType.StoredProcedure).ToList();
                x.PrefferedCategories = cats;
            }
        }

        public void AddPrefs(User u)
        {
            using (IDbConnection connection = new SqlConnection(_connectionString))
            {
                foreach (string cat in u.PrefferedCategories)
                {
                    DynamicParameters p = new DynamicParameters();

                    p.Add("@UserId", u.Id);
                    p.Add("@PrefferedCategory", cat);

                    connection.Query("spAddPrefCatToUser", p, commandType: CommandType.StoredProcedure).ToList(); 
                }
            }
        }

        public List<User> GetUsers()
        {
            List<User> output = new List<User>();

            using (IDbConnection connection = new SqlConnection(_connectionString))
            {
                output = connection.Query<User>("spUsers_GetAll").ToList();
            }

            foreach (User u in output)
            {
                GetPrefCats(u);
            }

            return output;
        }
    }
}
