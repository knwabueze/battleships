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
    /// <summary>
    /// WebAPI 2 Controller for handling SQL server interactions surrounding the Lobbies table.
    /// </summary>
    [RoutePrefix("api/lobbies")]
    public class LobbiesController : ApiController
    {
        private static readonly string connectionString =
               ConfigurationManager.ConnectionStrings["Local"].ConnectionString;


        /// <summary>
        /// Polls an update to check if lobby is full, if so use the returned gameId to follow into main game
        /// </summary>
        /// <param name="lobbyId"></param>
        /// <param name="playerId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("poll/{lobbyId}")]
        public GameInitializationPatch PollLobby([FromUri]int lobbyId, [FromBody]int playerId)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_PollLobby", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@lobbyid", lobbyId));
                command.Parameters.Add(new SqlParameter("@userid", playerId));
                SqlDataAdapter sda = new SqlDataAdapter(command);

                try
                {
                    connection.Open();

                    var table = new DataTable();

                    sda.Fill(table);

                    var dataRow = table.Rows[0];

                    int statusCode = int.Parse(dataRow["StatusCode"].ToString());

                    switch (statusCode)
                    {
                        case 0:
                            return new GameInitializationPatch()
                            {
                                StatusCode = statusCode,
                                GameId = int.Parse(dataRow["GameId"].ToString())
                            };
                        case 1:
                        case -1:
                            return new GameInitializationPatch()
                            {
                                StatusCode = statusCode,
                                GameId = null
                            };
                    }
                }
                finally
                {
                    if (connection != null)
                    {
                        connection.Close();
                    }
                }

                return default(GameInitializationPatch);
            }
        }

        /// <summary>
        /// Create a new lobby.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("create")]
        public LobbyCreationInfo Create([FromBody]LobbyPostInfo model)
        {
            if (string.IsNullOrWhiteSpace(model.LobbyName))
            {
                return default(LobbyCreationInfo);
            }

            var table = new DataTable();

            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_CreateLobby", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@name", model.LobbyName));
                command.Parameters.Add(new SqlParameter("@hostid", model.UserId));

                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var resultSet = table.Rows[0];

                return new LobbyCreationInfo()
                {
                    CreationDate = DateTime.Parse(resultSet["CreationDate"].ToString()),
                    LobbyId = int.Parse(resultSet["LobbyId"].ToString()),
                    LobbyName = resultSet["Name"].ToString()
                };
            }
        }

        /// <summary>
        /// Joins lobby specified with id.
        /// Lobbies only allow two players at a time,
        /// therefore you cannot join a lobby already with two players.
        /// </summary>
        /// <param name="id">Lobby Id, used to access a lobby</param>
        /// <param name="userId">User Id, tied to a user.</param>
        /// <returns>Error Code (temporary)</returns>
        [HttpPost]
        [Route("join/{id}")]
        public int Join([FromUri]int id, [FromBody]int userId)
        {
            int errCode = 0;

            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_JoinLobby", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@lobbyid", id));
                command.Parameters.Add(new SqlParameter("@userid", userId));

                connection.Open();
                errCode = int.Parse(command.ExecuteScalar().ToString());
                connection.Close();

                return errCode;
            }
        }

        /// <summary>
        /// Lists all available lobbies.        
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("all")]
        public LobbyGeneralInfo[] All()
        {
            var table = new DataTable();

            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_ListLobbies", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var model = new LobbyGeneralInfo[table.Rows.Count];

                for (int i = 0; i < table.Rows.Count; i++)
                {
                    model[i] = new LobbyGeneralInfo()
                    {
                        LobbyName = table.Rows[i]["Name"].ToString(),
                        LobbyId = int.Parse(table.Rows[i]["LobbyId"].ToString()),
                        CreationDate = DateTime.Parse(table.Rows[i]["CreationDate"].ToString()),
                        HostUsername = table.Rows[i]["Username"].ToString()
                    };
                }

                return model;
            }
        }
    }
}
