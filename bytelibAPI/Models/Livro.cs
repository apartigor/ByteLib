using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using bytelibAPI.Models;

namespace bytelibAPI.Models
{
    public class Livro
    {
        public int LivroId { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Autor { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public string Capa_URL { get; set; }

        [Required]
        public string PDF_Url { get; set; }

        [Required]
        public int TotalPaginas { get; set; }

        // Relação de muitos pra muitos
        [JsonIgnore]
        public ICollection<UserLivro> UsersLivros { get; set; }
    }
}