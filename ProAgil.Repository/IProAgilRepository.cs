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
         Task<Evento> GetEventoAsyncById(int EventoId, bool includePalastrantes);
 
        //PALESTRANTE
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeEventos);
        Task<Palestrante> GetPalestrantesAsync(int PalestranteId, bool includeEventos); 


    }
}