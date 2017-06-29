using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class LobbyCreationInfo : IEquatable<LobbyCreationInfo>
    {
        [JsonProperty("createdAt")]
        public DateTime CreationDate { get; set; }

        [JsonProperty("lobbyName")]
        public string LobbyName { get; set; }

        [JsonProperty("lobbyId")]
        public int LobbyId { get; set; }

        public bool Equals(LobbyCreationInfo other)
        {
            return other.CreationDate == this.CreationDate 
                && other.LobbyName == this.LobbyName
                && other.LobbyId == this.LobbyId;
        }
    }
}