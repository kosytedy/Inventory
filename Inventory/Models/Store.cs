using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Inventory.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public virtual ICollection<Sales> ProductSold { get; set; }

        public Store()
        {
        }
    }
}
