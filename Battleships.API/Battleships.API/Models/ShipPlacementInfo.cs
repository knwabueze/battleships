using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class ShipPlacementInfo
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("x")]
        public int X { get; set; }

        [JsonProperty("y")]
        public int Y { get; set; }

        [JsonProperty("orientation")]
        public char Orientation { get; set; }

        [JsonProperty("shipType")]
        public string ShipType { get; set; }

        [JsonProperty("gameId")]
        public int GameId { get; set; }
    }
}