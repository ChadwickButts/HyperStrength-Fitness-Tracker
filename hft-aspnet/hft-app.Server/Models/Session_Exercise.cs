using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("session_exercises")]
    [Keyless]
    public class SessionExercise
    {
        [Required]
        public required Guid session_id { get; set; }
        [Required]
        public required string exercise_id { get; set; }
    }
}
