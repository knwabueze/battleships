using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BattleshipAPI.Models
{
    public class GetBoardPatch
    {
        public static string[] MetadataLookup = 
        {
            "WATER",
            "SHIP",
            "HIT",
            "SHIP_HIT"
        };

        public GetBoardPatch(int width, int height)
        {
            this.Width = width;
            this.Height = height;
            this.CellSet = new Cell[width, height];

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    this.CellSet[y, x] = new Cell()
                    {
                        X = x + 1,
                        Y = y + 1
                    };
                }
            }
        }

        public class Cell
        {
            public class Metadata
            {
                public Metadata()
                {
                    this.Type = MetadataLookup[0];
                }

                [JsonProperty("type")]
                public string Type { get; set; }

                [JsonProperty("descriptor")]
                public object Descriptor { get; set; }
            }

            [JsonProperty("x")]
            public int X { get; set; }

            [JsonProperty("y")]
            public int Y { get; set; }

            [JsonProperty("meta")]
            public Metadata Meta { get; set; } = new Metadata();
        }

        [JsonProperty("cellSet")]
        public Cell[,] CellSet { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
}