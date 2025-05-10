namespace bytelibAPI.Models
{
    public class UserLivro
    {
        // FK
        public string NomeUsuario { get; set; }
        public User User { get; set; }

        // FK
        public int LivroId { get; set; }
        public Livro Livro { get; set; }

        public double Progresso { get; set; }


    }
}