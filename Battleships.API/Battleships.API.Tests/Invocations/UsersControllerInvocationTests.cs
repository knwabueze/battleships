using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Battleships.API.Controllers;
using Battleships.API.Models;

namespace Battleships.API.Tests.Invocations
{
    [TestClass]
    public class UsersControllerInvocationTests
    {
        [TestMethod]
        public void RegisterPassingTest()
        {
            UsersController controller = new UsersController();
            var model = controller.Register("invocation_user");

            Assert.IsNotNull(model);
            Assert.IsInstanceOfType(model, typeof(UserInfo));
            Assert.AreEqual(model.Username, "invocation_user");
        }

        [TestMethod]
        public void RegisterWithEmptyStringTest()
        {
            UsersController controller = new UsersController();
            var model = controller.Register("");

            Assert.IsNull(model);
        }
    }
}
