using System.Collections.Generic;
using System.Data;
using System.Linq;
using auth.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace auth.Repositories
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<UserModel> GetUsers()
        {
            List<UserModel> output = new List<UserModel>();

            using (IDbConnection connection = new SqlConnection(_connectionString))
            {
                output = connection.Query<UserModel>("spUsers_GetAll").ToList();
            }

            return output;
        }
        public void AddUser(UserModel user)
        {
            using (IDbConnection connection = new SqlConnection(_connectionString))
            {
                DynamicParameters p = new DynamicParameters();

                p.Add("@Username", user.Username);
                p.Add("@Password", user.Password);
                p.Add("@Email", user.Email);
                p.Add("@Role", user.Role);
                p.Add("@Id", 0, dbType: DbType.Int32, direction: ParameterDirection.Output);

                connection.Execute("spUsers_Add", p, commandType: CommandType.StoredProcedure);
                user.Id = p.Get<int>("@Id");

            }
        }

        public UserModel GetUserByUsername(string userName)
        {
            return GetUsers().FirstOrDefault(u => u.Username == userName);
        }

        
    }
}
