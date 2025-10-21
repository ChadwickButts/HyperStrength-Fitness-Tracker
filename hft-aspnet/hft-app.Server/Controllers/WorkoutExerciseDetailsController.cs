using hft_app.Server.Data;
using hft_app.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hft_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutExerciseDetailsController : Controller
    {

        public HftDbContext _context;

        public WorkoutExerciseDetailsController(HftDbContext context)
        {
            _context = context;
        }

        [HttpGet("{workoutid}")]
        public async Task<ActionResult<IEnumerable<WorkoutExerciseDetails>>> Get(string workoutid)
        {
            return await _context.WorkoutExerciseDetails.Where(wed => wed.workoutid.ToString() == workoutid).ToListAsync();
        }
    }
}
