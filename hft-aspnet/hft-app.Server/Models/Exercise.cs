using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("exercises")]
    public class Exercise
    {
        [Required]
        public required string exercisename { get; set; }
        [Required]
        public required string exerciseid { get; set; }
        public string? force { get; set; }
        public string? level { get; set; }
        public string? mechanic { get; set; }
        public string? equipment { get; set; }
        public string? primaryMuscles { get; set; }
        public string? secondaryMuscles { get; set; }
        public string? instructions { get; set; }
        public string? category { get; set; }
        public string? images { get; set; }
    }
}
