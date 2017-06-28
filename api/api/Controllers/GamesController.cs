using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;

namespace api.Controllers
{
    [RoutePrefix("api/games")]
    public class GamesController : ApiController
    {
        private static readonly string connectionString =
               ConfigurationManager.ConnectionStrings["Local"].ConnectionString;

        /// <summary>
        /// Initializes game from lobby; the lobby, however must be full (status of 1).
        /// </summary>
        /// <param name="lobbyId"></param>
        /// <returns>The id of the newly created game</returns>
        [HttpPost]
        [Route("initialize/{lobbyId}")]
        public int? InitializeGame([FromUri]int lobbyId)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_InitializeGame", connection))
            {
                var table = new DataTable();

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@fromlobbyid", lobbyId));
                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var dr = table.Rows[0];

                if (int.Parse(dr["StatusCode"].ToString()) == 0)
                {
                    return int.Parse(dr["GameId"].ToString());
                }

                return null;
            }                
        }

        [HttpPost]
        [Route("placeship")]
        public ShipPlacement PlaceShip([FromBody]ShipPlacementInfo info)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_PlaceShip", connection))
            {
                var table = new DataTable();
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@userid", info.UserId));
                command.Parameters.Add(new SqlParameter("@x", info.X));
                command.Parameters.Add(new SqlParameter("@y", info.Y));
                command.Parameters.Add(new SqlParameter("@o", info.Orientation[0]));
                command.Parameters.Add(new SqlParameter("@type", info.ShipType));
                command.Parameters.Add(new SqlParameter("@gameid", info.GameId));

                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var dataRow = table.Rows[0];

                if (int.Parse(dataRow["StatusCode"].ToString()) == 0)
                {
                    return new ShipPlacement()
                    {
                        X = int.Parse(dataRow["X"].ToString()),
                        Y = int.Parse(dataRow["Y"].ToString()),
                        Orientation = dataRow["Orientation"].ToString()[0],
                        Size = int.Parse(dataRow["Size"].ToString())
                    };
                }

                return default(ShipPlacement);
            }                
        }
    }
}
