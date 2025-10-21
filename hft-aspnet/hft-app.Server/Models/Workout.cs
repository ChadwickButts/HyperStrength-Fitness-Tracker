using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("workouts")]
    public class Workout
    {
        [Required]
        public Guid workoutid { get; set; }
        [Required]
        public required string workoutname { get; set; }
        [Required]
        public DateTime date { get; set; }
        [Required]
        public bool tracked { get; set; }
        public int userid { get; set; }
    }
}
