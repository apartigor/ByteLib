using bytelibAPI.Data;
using bytelibAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bytelibAPI.Controllers
{
    [ApiController]
    [Route("api/livros")]
    public class LivroController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public LivroController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost] // - /api/livros para cadastro de livros
        public async Task<IActionResult> CadastroLivro([FromBody] Livro livro)
        {
            // valida se tudo estiver preenchido
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // valida se o livro ja existe
            var livroExistente = await _appDbContext.Livros
                .FirstOrDefaultAsync(l => l.Titulo == livro.Titulo && l.Autor == livro.Autor);

            if (livroExistente != null)
                return BadRequest("Livro já cadastrado.");

            _appDbContext.Livros.Add(livro);
            await _appDbContext.SaveChangesAsync();

            return Created("", livro);
        }

        [HttpGet] // - /api/livros listar os livros (catalogo)
        public async Task<ActionResult<IEnumerable<Livro>>> ListarLivros()
        {
            var livros = await _appDbContext.Livros.ToListAsync();

            return Ok(livros);
        }

        [HttpGet("{id}")] // - /api/livros/{id} listar livro especifico (leitura)
        public async Task<ActionResult<Livro>> GetLivroById(int id)
        {
            var livro = await _appDbContext.Livros.FindAsync(id);

            // valida a existencia do livro
            if (livro == null)
                return NotFound("Livro não encontrado.");

            return Ok(livro);
        }

        [HttpGet("{id}/baixar/pdf")] // - /api/livros/{id}/api abre o pdf do livro especifico (leitura)
        public async Task<ActionResult<Livro>> GetPdfByLivroId(int id)
        {
            var livro = await _appDbContext.Livros.FindAsync(id);

            // valida a existencia do livro
            if (livro == null)
                return NotFound("Livro não encontrado.");

            // constrói o caminho até o arquivo
            var urlPdf = Path.Combine("wwwroot", livro.PDF_Url);

            // valida a existencia do arquivo
            if (!System.IO.File.Exists(urlPdf))
                return NotFound("Arquivo PDF não encontrado.");

            // le o arquivo
            var ler = await System.IO.File.ReadAllBytesAsync(urlPdf);

            // retorna baixando o arquivo
            return File(ler, "application/pdf", Path.GetFileName(urlPdf));
        }

        [HttpGet("{id}/ler/pdf")] // - /api/livros/{id}/api abre pdf do livro especifico (leitura)
        public async Task<ActionResult<Livro>> LerPdfDoLivroPorId(int id)
        {
            var livro = await _appDbContext.Livros.FindAsync(id);

            // valida a existencia do livro
            if (livro == null)
                return NotFound("Livro não encontrado.");

            // constrói o caminho até o arquivo
            var urlPdf = Path.Combine("wwwroot", livro.PDF_Url);

            // valida a existencia do arquivo
            if (!System.IO.File.Exists(urlPdf))
                return NotFound("Arquivo PDF não encontrado.");

            // le o arquivo
            var ler = await System.IO.File.ReadAllBytesAsync(urlPdf);

            // retorna baiixando o arquivo
            return File(ler, "application/pdf");
        }

    }
}