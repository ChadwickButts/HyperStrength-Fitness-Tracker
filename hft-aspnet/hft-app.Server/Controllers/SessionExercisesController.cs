using hft_app.Server.Data;
using hft_app.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hft_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionExercisesController : Controller
    {
        public HftDbContext _context;
        public SessionExercisesController(HftDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionExercise>>> GetSessionExercises()
        {
            return await _context.SessionExercises.ToListAsync();
        }
    }
}
