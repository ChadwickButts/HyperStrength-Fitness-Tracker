using hft_app.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace hft_app.Server.Data
{
    public class HftDbContext : DbContext
    {
        public HftDbContext(DbContextOptions<HftDbContext> options) : base(options)
        {
        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
        public DbSet<WorkoutExerciseDetails> WorkoutExerciseDetails { get; set; }
    }
}
