using Microsoft.AspNetCore.Mvc;
using userBookServices.DbConnector;
using userBookServices.Models;

namespace userBookServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly SqlConnector connector;

        public BookController(SqlConnector _connector)
        {
            connector = _connector;
        }

        [HttpGet("GetUsers")]
        public IActionResult GetUsers_All()
        {
            return Ok(connector.GetUsers());
        }

        [HttpPost("AddPreferences")]
        public IActionResult AddPrefs([FromBody] User u)
        {
            connector.AddPrefs(u);
            return Ok();
        }
    }
}
