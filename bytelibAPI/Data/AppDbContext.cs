using Microsoft.EntityFrameworkCore;
using bytelibAPI.Models;

namespace bytelibAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Livro> Livros { get; set; }
        public DbSet<UserLivro> UsuariosLivros { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
            .HasKey(u => u.NomeUsuario); // Chave primária com NomeUsuario

            modelBuilder.Entity<UserLivro>()
                .HasKey(ul => new { ul.NomeUsuario, ul.LivroId }); // Mapeia a relação de muitos pra muitos

            modelBuilder.Entity<UserLivro>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.UsersLivros)
                .HasForeignKey(ul => ul.NomeUsuario);

            modelBuilder.Entity<UserLivro>()
                .HasOne(ul => ul.Livro)
                .WithMany(l => l.UsersLivros)
                .HasForeignKey(ul => ul.LivroId);

        }
    }
}