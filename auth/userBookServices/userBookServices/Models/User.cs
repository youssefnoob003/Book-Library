namespace userBookServices.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public List<string> PrefferedCategories { get; set; }
    }
}
