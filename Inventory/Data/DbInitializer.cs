using System;
using Inventory.Models;

namespace Inventory.Data
{
    public class DbInitializer
    {
        public static void Initialize(InventoryDbContext context)
        {
            context.Database.EnsureCreated();

            var users = new User[]
            {
                new User{Id=1,FirstName="Carson",LastName="Alexander",Email="test@email.com"},
                new User{Id=2,FirstName="Meredith",LastName="Alonso",Email="test@email.com"},
                new User{Id=3,FirstName="Arturo",LastName="Anand",Email="test@email.com"},
                new User{Id=4,FirstName="Gytis",LastName="Barzdukas",Email="test@email.com"},
                new User{Id=5,FirstName="Yan",LastName="Li",Email="test@email.com"},
                new User{Id=6,FirstName="Peggy",LastName="Justice",Email="test@email.com"},
                new User{Id=7,FirstName="Laura",LastName="Norman",Email="test@email.com"},
                new User{Id=8,FirstName="Nino",LastName="Olivetto",Email="test@email.com"}
            };

            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();
        }
    }
}
