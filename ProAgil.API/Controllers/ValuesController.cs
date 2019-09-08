﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public readonly ProAgilContext _context;

        public ValuesController(ProAgilContext context)
        {
            this._context = context;
        }



        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
              /* var testeRange = Enumerable.Range(1,250000000);

            Parallel.ForEach(testeRange, (int t) =>{

                double i1 = Math.Sqrt(t);
                double i2 = Math.Pow(i1,2);

            }); */
            try
            {
                var results = await _context.Eventos.ToListAsync();
                
                return Ok(results);
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O procedimento falhou!");
            }    

        
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
         
             try
            {
                var results = await _context.Eventos.FirstOrDefaultAsync(x => x.EventoId == id);
                
                return Ok(results);
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O procedimento falhou!");
            }    
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
