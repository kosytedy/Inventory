using System;
using Inventory.Models;

namespace Inventory.Data
{
    public class DbInitializer
    {
        public static void Initialize(InventoryDbContext context)
        {
            context.Database.EnsureCreated();

        }
    }
}
