using BookLibrary.DbConnector;
using BookLibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Controllers
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

        [HttpGet("GetBooks")]
        public IActionResult Get_All()
        {
            return Ok(connector.GetBooks());
        }

        [HttpGet("GetCategories")]
        public IActionResult Get_Categories()
        {
            return Ok(connector.getCategories());
        }

        [HttpPost("AddCat")]
        public IActionResult Add_Cat([FromBody] Category cat)
        {
            connector.AddCategory(cat);
            return Ok();
        }

        [HttpPost("DelCat")]
        public IActionResult Del_Cat([FromBody] Category cat)
        {
            connector.DeleteCategory(cat);
            return Ok();
        }

        [HttpPost("AddBook")]
        public IActionResult Add([FromBody] BookModel book)
        {
            connector.AddBook(book);
            return Ok();
        }

        [HttpPost("DeleteBook")]
        public IActionResult Delete([FromBody] BookModel book)
        {
            connector.DeleteBook(book);
            return Ok();
        }

        [HttpPost("UpdateBook")]
        public IActionResult Update([FromBody] BookModel book)
        {
            connector.UpdateBook(book);
            return Ok();
        }
    }
}
