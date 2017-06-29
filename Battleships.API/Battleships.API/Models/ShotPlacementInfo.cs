using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class ShotPlacementInfo
    {
        [JsonProperty("x")]
        public int X { get; set; }

        [JsonProperty("y")]
        public int Y { get; set; }

        [JsonProperty("gameId")]
        public int GameId { get; set; }

        [JsonProperty("userId")]
        public int PlayerId { get; set; }
    }
}