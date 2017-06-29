using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class LobbyGeneralInfo
    {
        [JsonProperty("lobbyName")]
        public string LobbyName { get; set; }

        [JsonProperty("lobbyId")]
        public int LobbyId { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreationDate { get; set; }

        [JsonProperty("hostUsername")]
        public string HostUsername { get; set; }
    }

    public static class LobbyGeneralInfoExtensions
    {
        public static LobbyCreationInfo ToCreationInfo(this LobbyGeneralInfo model)
        {
            return new LobbyCreationInfo()
            {
                CreationDate = model.CreationDate,
                LobbyId = model.LobbyId,
                LobbyName = model.LobbyName
            };
        }

        public static LobbyCreationInfo[] ToCreationInfoArray(this LobbyGeneralInfo[] model)
        {
            var returnModel = new LobbyCreationInfo[model.Length];

            for (int i = 0; i < model.Length; i++)
            {
                returnModel[i] = model[i].ToCreationInfo();
            }

            return returnModel;
        }
    }
}