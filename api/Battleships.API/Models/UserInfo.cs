using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Battleships.API.Models
{
    public class UserInfo
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }
    }
}