using System;
using Inventory.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<Inventory.Models.Sales> Sales { get; set; }

        public DbSet<Inventory.Models.Customer> Customer { get; set; }
    }
}
