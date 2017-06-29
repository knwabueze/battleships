using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.Models
{
    public class GameUpdatePatch
    {
        [JsonProperty("x")]
        public int? X { get; set; }

        [JsonProperty("y")]
        public int? Y { get; set; }

        [JsonProperty("sunkShipId")]
        public int? SunkShipId { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("messageCode")]
        public int MessageCode { get; set; }

        [JsonProperty("errCode")]
        public int ErrorCode { get; set; }

        [JsonProperty("err")]
        public string ErrorMessage { get; set; }
    }
}