using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Battleships.API.Models;
using System.Web.Http.Cors;

namespace Battleships.API.Controllers
{
    /// <summary>
    /// Web API 2 Controller for controlling actions during the game
    /// </summary>
    [RoutePrefix("api/games")]
    [EnableCors("*", "*", "*")]
    public class GamesController : ApiController
    {
        private static readonly string connectionString =
               ConfigurationManager.ConnectionStrings["Local"].ConnectionString;
        
        
        /// <summary>
        /// Place Ship during setup stage of the game. 
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("placeship")]
        public ShipPlacementPatch PlaceShip([FromBody]ShipPlacementInfo info)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_PlaceShip", connection))
            {
                var table = new DataTable();
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@userid", info.UserId));
                command.Parameters.Add(new SqlParameter("@x", info.X));
                command.Parameters.Add(new SqlParameter("@y", info.Y));
                command.Parameters.Add(new SqlParameter("@o", info.Orientation));
                command.Parameters.Add(new SqlParameter("@type", info.ShipType));
                command.Parameters.Add(new SqlParameter("@gameid", info.GameId));

                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var dataRow = table.Rows[0];

                if (int.Parse(dataRow["StatusCode"].ToString()) == 0)
                {
                    return new ShipPlacementPatch()
                    {
                        X = int.Parse(dataRow["X"].ToString()),
                        Y = int.Parse(dataRow["Y"].ToString()),
                        Orientation = dataRow["Orientation"].ToString()[0],
                        Size = int.Parse(dataRow["Size"].ToString())
                    };
                }

                return default(ShipPlacementPatch);
            }
        }

        /// <summary>
        /// Place a shot during the ongoing phase of the game.
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("placeshot")]
        public ShotPlacementPatch PlaceShot([FromBody]ShotPlacementInfo info)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_PlaceShot", connection))
            {
                var table = new DataTable();
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@x", info.X));
                command.Parameters.Add(new SqlParameter("@y", info.Y));
                command.Parameters.Add(new SqlParameter("@gameid", info.GameId));
                command.Parameters.Add(new SqlParameter("@playerid", info.PlayerId));

                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var dataRow = table.Rows[0];

                switch (int.Parse(dataRow["ErrorCode"].ToString()))
                {
                    // If ErrorCode = 0, That means there are no errors.
                    case 0:
                        int messageCode = int.Parse(dataRow["MessageCode"].ToString());

                        switch (messageCode)
                        {
                            // Case 1 means that you sunk an enemy ship.
                            case 1:
                                return new ShotPlacementPatch()
                                {
                                    ErrorCode = 0,
                                    MessageCode = messageCode,
                                    Message = dataRow["Message"].ToString(),
                                    SunkShipId = int.Parse(dataRow["SunkShipId"].ToString())
                                };

                            // Any other case doesn't need to be reconciled in a special case.
                            default:
                                return new ShotPlacementPatch()
                                {
                                    ErrorCode = 0,
                                    MessageCode = messageCode,
                                    Message = dataRow["Message"].ToString()
                                };
                        }
                    default:
                        return new ShotPlacementPatch()
                        {
                            ErrorCode = int.Parse(dataRow["ErrorCode"].ToString()),
                            ErrorMessage = dataRow["Error"].ToString(),
                            MessageCode = 0
                        };
                }
            }


        }

        /// <summary>
        /// Poll for enemy actions one they finish.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("poll")]
        public GameUpdatePatch PollUpdate([FromBody]RequestGameUpdate request)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("usp_PollUpdate", connection))
            {
                var table = new DataTable();
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@playerid", request.PlayerId));
                command.Parameters.Add(new SqlParameter("@gameid", request.GameId));
                var dataAdapter = new SqlDataAdapter(command);

                connection.Open();
                dataAdapter.Fill(table);
                connection.Close();

                var dataRow = table.Rows[0];
                var errorCode = int.Parse(dataRow["ErrorCode"].ToString());
                var messageCode = int.Parse(dataRow["MessageCode"].ToString());

                switch (errorCode)
                {
                    // No errors, proceed
                    case 0:
                        switch (messageCode)
                        {
                            // Your ship was sunk
                            case 7:
                                return new GameUpdatePatch()
                                {
                                    Message = dataRow["Message"].ToString(),
                                    MessageCode = messageCode,
                                    X = int.Parse(dataRow["X"].ToString()),
                                    Y = int.Parse(dataRow["Y"].ToString()),
                                    SunkShipId = int.Parse(dataRow["SunkShipId"].ToString()),
                                    ErrorCode = errorCode
                                };
                            // Your ship was hit but not sunk
                            case 6:
                                return new GameUpdatePatch()
                                {
                                    Message = dataRow["Message"].ToString(),
                                    MessageCode = messageCode,
                                    ErrorCode = errorCode,
                                    X = int.Parse(dataRow["X"].ToString()),
                                    Y = int.Parse(dataRow["Y"].ToString())
                                };

                            // Either everything is ok or you lost horribly.
                            default:
                                return new GameUpdatePatch()
                                {
                                    Message = dataRow["Message"].ToString(),
                                    MessageCode = messageCode,
                                    ErrorCode = errorCode
                                };
                        }

                    // No errors are handled in a particular manner.
                    default:
                        return new GameUpdatePatch()
                        {
                            ErrorCode = errorCode,
                            MessageCode = messageCode,
                            ErrorMessage = dataRow["Error"].ToString()
                        };
                }
            }
        }
    }
}
