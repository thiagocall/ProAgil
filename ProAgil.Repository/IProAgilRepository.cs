using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;

         Task<bool> SaveChangesAsync();

         //EVENTOS
         Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalastrantes);
         Task<Evento[]> GetAllEventosAsync(bool includePalastrantes);
         Task<Evento> GetAllEventosAsyncById(int EventoId, bool includePalastrantes);
 
        //PALESTRANTE
        Task<Evento> GetAllPalestrantesAsyncByName(bool includePalastrantes);
        Task<Evento> GetAllPalestrantesAsync(int PalestranteId, bool includePalastrantes); 


    }
}