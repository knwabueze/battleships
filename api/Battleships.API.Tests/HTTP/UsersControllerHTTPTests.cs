using Battleships.API.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.API.Tests.HTTP
{
    [TestClass]
    public class UsersControllerHTTPTests
    {
        [TestMethod]
        public async Task RegisterPasssingTest()
        {
            using (var client = new HttpClient())
            using (var request = client.PostAsJsonAsync("http://localhost:52697/api/users/register", "http_user"))
            {                
                var response = await request;

                var responseObject = await response.Content.ReadAsStringAsync();
                var jsonObject = JsonConvert.DeserializeObject<UserInfo>(responseObject);
                
                Assert.IsNotNull(jsonObject);
                Assert.AreEqual(jsonObject.Username, "http_user");
            }
        }
    }
}
