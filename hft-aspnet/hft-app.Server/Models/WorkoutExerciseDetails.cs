using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("workout_exercise_details")]
    [Keyless]
    public class WorkoutExerciseDetails
    {
        public required Guid workoutid { get; set; }
        public string? workoutname { get; set; }
        public DateTime date { get; set; }
        public bool tracked { get; set; }
        public required string exercisename { get; set; }
        public required string exerciseid { get; set; }
        public string? force { get; set; }
        public string? level { get; set; }
        public string? mechanic { get; set; }
        public string? equipment { get; set; }
        public string? primaryMuscles { get; set; }
        public string? secondaryMuscles { get; set; }
        public string? instructions { get; set; }
        public string? category { get; set; }
        public string? images { get; set; } }
}
