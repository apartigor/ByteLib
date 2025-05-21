using System.Text.Json;
using bytelibAPI.Data;
using bytelibAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bytelibAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserLivroController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public UserLivroController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("progresso/{livroId}/{nomeUsuario}")]
        public async Task<IActionResult> SalvarProgresso(int livroId, string nomeUsuario, [FromBody] double paginaAtual)
        {
            if (string.IsNullOrEmpty(nomeUsuario))
                return BadRequest("Nome do usuário é obrigatório.");

            // valida se o livro existe
            var livroExistente = await _appDbContext.Livros.FindAsync(livroId);
            if (livroExistente == null)
                return BadRequest("Livro não encontrado.");

            // valida se o usuario existe
            var usuarioEncontrado = await _appDbContext.Users.FindAsync(nomeUsuario);
            if (usuarioEncontrado == null)
                return BadRequest("Usuário não encontrado.");

            if (paginaAtual > livroExistente.TotalPaginas || paginaAtual < 0)
                return BadRequest("Dados colocados incorretamente!");

            // valida se ja existe um registro de progresso para o usuario
            var userLivro = await _appDbContext.UsuariosLivros
            .FirstOrDefaultAsync(ul => ul.NomeUsuario == nomeUsuario && ul.LivroId == livroId);
            // se não existir, cria o progresso, e se ja existe apenas atualiza o progresso
            if (userLivro == null)
            {
                userLivro = new UserLivro
                {
                    NomeUsuario = nomeUsuario,
                    LivroId = livroId,
                    Progresso = paginaAtual
                };
                _appDbContext.UsuariosLivros.Add(userLivro);
            }
            else
            {
                userLivro.Progresso = paginaAtual;
            }

            await _appDbContext.SaveChangesAsync();
            return Ok("Progresso salvo com sucesso.");
        }

        [HttpGet("progresso/{livroId}/{nomeUsuario}")]
        public async Task<IActionResult> GetProgresso(int livroId, string nomeUsuario)
        {
            if (string.IsNullOrEmpty(nomeUsuario))
                return BadRequest("Nome do usuário é obrigatório.");

            // valida se o id do livro existe
            var livroExistente = await _appDbContext.Livros.FindAsync(livroId);
            if (livroExistente == null)
                return BadRequest("Livro não encontrado.");

            // valida se o user existe
            var usuarioEncontrado = await _appDbContext.Users.FindAsync(nomeUsuario);
            if (usuarioEncontrado == null)
                return BadRequest("Usuário não encontrado.");

            var userLivro = await _appDbContext.UsuariosLivros
                .FirstOrDefaultAsync(ul => ul.NomeUsuario == nomeUsuario && ul.LivroId == livroId);

            if (userLivro == null)
                return NotFound("Progresso não encontrado");

            return Ok(userLivro.Progresso);
        }
    }
}