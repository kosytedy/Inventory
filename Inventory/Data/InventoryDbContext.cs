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

        public DbSet<Customer> Customers { get; set; }
    }
}
