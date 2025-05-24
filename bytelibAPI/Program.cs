using Microsoft.EntityFrameworkCore;
using bytelibAPI.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors(); 
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();

// query SQL inicial para adicionar os pdfs
using (var scope = app.Services.CreateScope())
{
    var appDbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // aplica as migrations pendentes
    await appDbContext.Database.MigrateAsync();

    // valida se o banco estiver vazio
    if (!appDbContext.Livros.Any())
    {
        var querysql = @"
            INSERT INTO livros (Titulo, Autor, PDF_Url, TotalPaginas, Capa_Url, Descricao) VALUES
            ('Manual Proibido - Como Conquistar Qualquer Pessoa Em 60 Segundos', 'Felipe Alves', 'pdfs/o_manual_proibido.pdf', 215, 'capas/capa_manualproibido.webp', 'Um manual sobre a arte de seduzir, prometendo transformar o leitor em uma pessoa magnética em apenas 60 segundos.'),
            ('Engenharia de Software Moderna', 'Marco Tulio Valente', 'pdfs/engenharia_de_software_moderna.pdf', 339, 'capas/capa_engsofmoderna.jpg', 'Engenharia de Software Moderna é um livro-texto destinado a alunos de cursos de graduação em Computação.'),
            ('Diário De Um Banana 2: Rodrick É O Cara', 'Jeff Kinney', 'pdfs/diario_de_um_banana_2.pdf', 227, 'capas/capa_diario_banana_2.jpg', 'De volta às aulas, Greg está ansioso para enterrar de vez os últimos três meses... e um acontecimento em particular. Mas seu irmão mais velho, Rodrick, não vai deixar que as coisas caiam no esquecimento assim tão fácil. Ele é testemunha de um ''pequeno'' incidente que Greg quer manter em sigilo.');
        ";

        await appDbContext.Database.ExecuteSqlRawAsync(querysql);
    }

}

app.Run();
