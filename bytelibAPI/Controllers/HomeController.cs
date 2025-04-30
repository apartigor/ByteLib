using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bytelibAPI.Controllers
{
    [ApiController]
    [Route("")]  // Agora a rota para o HomeController será /home
    public class HomeController : ControllerBase
    {
        // private readonly AppDbContext _appDbContext;

        // public HomeController(AppDbContext appDbContext)
        // {
        //     _appDbContext = appDbContext;
        // }
        // Responde a uma requisição GET para /home
        [HttpGet]
        public IActionResult Index()
        {
            return Ok("Bem-vindo à API do ByteLib");
        }
    }
}
