using System.ComponentModel.DataAnnotations;

namespace Talent.Services.Profile.Models.Profile
{
    public class AvailabilityViewModel
    {
        [Required]
        public int AvailabilityType { get; set; }
        [Required]
        public int AvailableHours { get; set; }
        [Required]
        public int EarnTarget { get; set; }
    }
}
