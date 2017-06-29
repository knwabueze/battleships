using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class RequestGameUpdate
    {
        [JsonProperty("gameId")]
        public int GameId { get; set; }

        [JsonProperty("userId")]
        public int PlayerId { get; set; }
    }
}