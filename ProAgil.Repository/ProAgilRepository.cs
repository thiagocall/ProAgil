using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public class ProAgilRepository : IProAgilRepository
    {
        private ProAgilContext _context { get; }

        public ProAgilRepository(ProAgilContext context)
        {
            this._context = context;
        }
        
        //GERAIS
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //EVENTO
        public async Task<Evento[]> GetAllEventosAsync(bool includePalastrantes = false)
        {
            IQueryable<Evento> query = this._context.Eventos
            .Include(c => c.Lotes)
            .Include(c => c.RedesSociais);


            if (includePalastrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos) // Traz 1ª Relação
                    .ThenInclude(p => p.Palestrante); // Traz 2ª relação do objeto
            }

            query = query.OrderByDescending(c => c.DataEvento);

            return await query.ToArrayAsync();

        }
        public async Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalastrantes)
        {
            IQueryable<Evento> query = this._context.Eventos
            .Include(c => c.Lotes)
            .Include(c => c.RedesSociais);

            if (includePalastrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos) // Traz 1ª Relação
                    .ThenInclude(p => p.Palestrante); // Traz 2ª relação do objeto
            }

            query = query.OrderByDescending(c => c.DataEvento)
                       .Where(p => p.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoAsyncById(int EventoId, bool includePalastrantes)
        {
            IQueryable<Evento> query = this._context.Eventos
            .Include(c => c.Lotes)
            .Include(c => c.RedesSociais);


            if (includePalastrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos) // Traz 1ª Relação
                    .ThenInclude(p => p.Palestrante); // Traz 2ª relação do objeto
            }

            query = query.OrderByDescending(c => c.DataEvento)
                        .Where(c => c.Id == EventoId);

            return await query.FirstOrDefaultAsync();
        }

        //PALESTRANTE
        public async Task<Palestrante> GetPalestrantesAsync(int PalestranteId, bool includeEventos =  false)
        {
             IQueryable<Palestrante> query = this._context.Palestrantes
                .Include(c => c.RedesSociais);


            if (includeEventos)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos) // Traz 1ª Relação
                    .ThenInclude(e => e.Evento); // Traz 2ª relação do objeto
            }

            query = query.OrderBy(p => p.Nome)
                    .Where(p => p.Id == PalestranteId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includePalastrantes = false)
        {
             IQueryable<Palestrante> query = this._context.Palestrantes
                .Include(c => c.RedesSociais);


            if (includePalastrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos) // Traz 1ª Relação
                    .ThenInclude(e => e.Evento); // Traz 2ª relação do objeto
            }

            query = query.Where(p => p.Nome.ToLower().Contains(name.ToLower()));

            return await query.ToArrayAsync();
        }


    }
}