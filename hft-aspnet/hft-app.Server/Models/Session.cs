using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hft_app.Server.Models
{
    [Table("sessions")]
    public class Session
    {
        [Required]
        public Guid sessionid { get; set; }
        [Required]
        public required string sessionname { get; set; }
        [Required]
        public DateTime sessiondate { get; set; }
        [Required]
        public bool tracked { get; set; }
    }
}
