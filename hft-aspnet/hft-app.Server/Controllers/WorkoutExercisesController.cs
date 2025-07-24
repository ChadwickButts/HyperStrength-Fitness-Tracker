using hft_app.Server.Data;
using hft_app.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hft_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutExercisesController : Controller
    {
        public HftDbContext _context;
        public WorkoutExercisesController(HftDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutExercise>>> GetWorkoutExercises()
        {
            return await _context.WorkoutExercises.ToListAsync();
        }
    }
}
