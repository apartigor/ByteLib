using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bytelibAPI.Data;

namespace bytelibAPI.Controllers
{
    [ApiController]
    [Route("")] 
    public class HomeController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public HomeController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        // Responde a uma requisição GET para /home
        [HttpGet]
        public IActionResult Index()
        {
            return Ok("Bem-vindo à API do ByteLib");
        }
    }
}
