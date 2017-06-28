using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.Models
{
    public class ShipPlacementInfo
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("x")]
        public int X { get; set; }

        [JsonProperty("y")]
        public int Y { get; set; }

        [JsonIgnore]
        private OrientationEnum _orientation;

        [JsonProperty("orientation")]
        public string Orientation
        {
            get
            {
                return _orientation.ToString();
            }

            set
            {
                char val = value[0];

                if (val == 'N' || val == 'E' || val == 'S' || val == 'W')
                {
                    _orientation = (OrientationEnum)val;
                }
            }
        }

        [JsonProperty("shipType")]
        public string ShipType { get; set; }

        [JsonProperty("gameId")]
        public int GameId { get; set; }
    }

    public enum OrientationEnum
    {
        North = 'N',
        East = 'E',
        South = 'S',
        West = 'W'
    }
}