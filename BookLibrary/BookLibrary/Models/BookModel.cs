namespace BookLibrary.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public List<string> Categories { get; set; }
    }
}
