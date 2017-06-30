using Battleships.API.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Battleships.API.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private static readonly string connectionString =
            ConfigurationManager.ConnectionStrings["Local"].ConnectionString;

        [HttpPost]
        [Route("register")]
        public UserInfo Register([FromBody] string username)
        {
            var table = new DataTable();

            if (string.IsNullOrWhiteSpace(username))
            {
                return default(UserInfo);
            }

            using (var conn = new SqlConnection(connectionString))
            using (var comm = new SqlCommand("usp_CreateUser", conn))
            {
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@username", username));

                var dataAdapter = new SqlDataAdapter(comm);

                conn.Open();
                dataAdapter.Fill(table);
                conn.Close();
            }

            return new UserInfo()
            {
                Username = table.Rows[0]["Username"].ToString(),
                Id = int.Parse(table.Rows[0]["UserId"].ToString())
            };
        }
    }
}
