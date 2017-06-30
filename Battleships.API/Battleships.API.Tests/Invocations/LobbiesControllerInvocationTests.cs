using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Battleships.API.Controllers;
using Battleships.API.Models;
using System.Linq;
using System.Collections.Generic;

namespace Battleships.API.Tests.Invocations
{
    [TestClass]
    public class LobbiesControllerInvocationTests
    {
        [TestMethod]
        public void CreatePassingTest()
        {
            LobbiesController controller = new LobbiesController();

            const string lobbyName = "invocation_lobbyName";
            const int userId = 6;

            var model = new LobbyPostInfo()
            {
                LobbyName = lobbyName,
                UserId = userId
            };

            var response = controller.Create(model);

            Assert.IsNotNull(response);
            Assert.IsNotNull(response.CreationDate);
            Assert.AreEqual(response.LobbyName, lobbyName);
        }

        [TestMethod]
        public void JoinPassingTest()
        {
            // Instatiate a users and a lobbies controller
            LobbiesController lobbiesController = new LobbiesController();
            UsersController usersController = new UsersController();

            // First, create two users
            const string userName1 = "invoc_u_1";
            const string userName2 = "invoc_u_2";

            var modelUser1 = usersController.Register(userName1);
            var modelUser2 = usersController.Register(userName2);

            Assert.IsNotNull(modelUser1);
            Assert.IsNotNull(modelUser2);

            Assert.AreEqual(modelUser1.Username, userName1);
            Assert.AreEqual(modelUser2.Username, userName2);

            // Second, create a lobby using modelUser1's credentials
            const string lobbyName = "invoc_l_1";

            var modelLobby =
                lobbiesController.Create(new LobbyPostInfo() { LobbyName = lobbyName, UserId = modelUser1.Id });

            Assert.IsNotNull(modelLobby);
            Assert.AreEqual(modelLobby.LobbyName, lobbyName);

            // Finally, join the lobby with modelUser2's credentials
            var response = lobbiesController.Join(modelLobby.LobbyId, modelUser2.Id);

            Assert.AreEqual(0, response);
        }

        [TestMethod]
        public void ListAllPassingTest()
        {
            // Instantiate a users and a lobbies controller
            LobbiesController lobbiesController = new LobbiesController();
            UsersController usersController = new UsersController();

            // First, create a user
            const string userName1 = "invoc_u_3";
            var modelUser1 = usersController.Register(userName1);

            // Second, create five lobbies using modelUser1's credentials
            string[] lobbyNames = new string[5];
            LobbyCreationInfo[] modelLobbies = new LobbyCreationInfo[5];

            for (int i = 0; i < 5; i++)
            {
                lobbyNames[i] = $"invoc_l_{i}";
            }

            for (int i = 0; i < 5; i++)
            {
                modelLobbies[i] =
                    lobbiesController.Create(new LobbyPostInfo()
                    {
                        UserId = modelUser1.Id,
                        LobbyName = lobbyNames[i]
                    });
            }

            // Finally, compare the modelLobbies to the response
            var response = lobbiesController.All().ToCreationInfoArray();

            foreach (var element in modelLobbies)
            {
                Assert.IsTrue(response.Any(e => e.Equals(element)));
            }
        }
    }
}
