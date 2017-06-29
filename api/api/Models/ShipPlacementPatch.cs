using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.Models
{
    public class ShipPlacementPatch
    {
        [JsonProperty("x")]
        public int X { get; set; }

        [JsonProperty("y")]
        public int Y { get; set; }

        [JsonProperty("size")]
        public int Size { get; set; }

        [JsonProperty("orientation")]
        public char Orientation;
    }
}