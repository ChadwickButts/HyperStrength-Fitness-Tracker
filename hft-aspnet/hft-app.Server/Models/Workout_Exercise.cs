using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("workout_exercises")]
    [Keyless]
    public class WorkoutExercise
    {
        [Required]
        public required Guid workout_id { get; set; }
        [Required]
        public required string exercise_id { get; set; }
    }
}
