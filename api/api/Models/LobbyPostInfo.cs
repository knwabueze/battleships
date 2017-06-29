using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.Models
{
    public class LobbyPostInfo
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("lobbyName")]
        public string LobbyName { get; set; }
    }
}