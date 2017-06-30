using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class GameInitializationPatch
    {
        [JsonProperty("statusCode")]
        public int StatusCode { get; set; }

        [JsonProperty("gameId")]
        public int? GameId { get; set; }

        [JsonProperty("opponentName")]
        public string OpponentName { get; set; }
    }
}