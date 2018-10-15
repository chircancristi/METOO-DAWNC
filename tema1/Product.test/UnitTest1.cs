using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProductNames;

namespace Product.test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void CorectTestIsValid() {
            // Arrange
            ProductNames.Product product = new ProductNames.Product();
            product.StartDate= new System.DateTime(2007,5,2); 
            product.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test1=product.IsValid();
            //Assert
            Assert.AreNotEqual(false,test1,"The program should return true but it returns false");
    
        }
        [TestMethod]
        public void WrongStartDateTestIsValid() {
              // Arrange
            ProductNames.Product product = new ProductNames.Product();
            product.StartDate= new System.DateTime(2020,5,2); 
            product.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test2=product.IsValid();
            //Assert
            Assert.AreNotEqual(true,test2,"The program should return false but it returns true, the start date can be greater than the end date");
        }
        [TestMethod]
         public void WrongEndDateTestIsValid() {
                // Arrange
            ProductNames.Product product = new ProductNames.Product();
            product.EndDate=new System.DateTime(2008,3,5);
            //ACT
            bool test3=product.IsValid();
            //Assert
            Assert.AreNotEqual(true,test3,"The program should return false but it returns true, the current time can be greater than the end time");
        }
        [TestMethod]
        public void TestComputeVAT() {
                //Arrange
            ProductNames.Product product=new ProductNames.Product();
            product.Price=15.5;
            product.VAT=25;
            double expected=19.375;
            //Act
            double actual=product.ComputeVAT();
            //Assert
            Assert.AreEqual(expected,actual,"The ComputeVat returns a wrong calculation");
        }
         [TestMethod]
         public void TestGetFullName(){
            //Arrange
             ProductNames.Manager manager= new ProductNames.Manager();
             manager.FirstName="dan";
             manager.LastName="chircan";
             string expected= "dan chircan";
            //Act
            string actual=manager.GetFullName();
            //Assert
            Assert.AreEqual(expected,actual,"The full name is wrong");
         }
          public void CorectTestIsActiv() {
            // Arrange
            ProductNames.Manager manager = new ProductNames.Manager();
            manager.StartDate= new System.DateTime(2007,5,2); 
            manager.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test1=manager.isActive();
            //Assert
            Assert.AreNotEqual(false,test1,"The program should return true but it returns false");
    
        }
        [TestMethod]
        public void WrongStartDateTestIsActiv() {
              // Arrange
            ProductNames.Manager manager = new ProductNames.Manager();
            manager.StartDate= new System.DateTime(2020,5,2); 
            manager.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test2=manager.isActive();
            //Assert
            Assert.AreNotEqual(true,test2,"The program should return false but it returns true, the start date can be greater than the end date");
        }
        [TestMethod]
         public void WrongEndDateTestIsActiv() {
                // Arrange
            ProductNames.Manager manager = new ProductNames.Manager();
            manager.EndDate=new System.DateTime(2008,3,5);
            //ACT
            bool test3=manager.isActive();
            //Assert
            Assert.AreNotEqual(true,test3,"The program should return false but it returns true, the current time can be greater than the end time");
        }
          [TestMethod]
        public void TestGetFullNameArhitect()
        {
            //Arrange
            ProductNames.Arhitect arhitect = new ProductNames.Arhitect();
            arhitect.FirstName = "dan";
            arhitect.LastName = "chircan";
            string expected = "dan chircan";
            //Act
            string actual = arhitect.GetFullName();
            //Assert
            Assert.AreEqual(expected, actual, "The full name is wrong");
        }
          [TestMethod]
        public void CorectTestIsActivArhitect()
        {
            // Arrange
            ProductNames.Arhitect arhitect = new ProductNames.Arhitect();
            arhitect.StartDate = new System.DateTime(2007, 5, 2);
            arhitect.EndDate = new System.DateTime(2019, 3, 5);
            //ACT
            bool test1 = arhitect.isActive();
            //Assert
            Assert.AreNotEqual(false, test1, "The program should return true but it returns false");

        }
        [TestMethod]
        public void WrongStartDateTestIsActivArhitect()
        {
            // Arrange
             ProductNames.Arhitect arhitect = new ProductNames.Arhitect();
            arhitect.StartDate = new System.DateTime(2020, 5, 2);
            arhitect.EndDate = new System.DateTime(2019, 3, 5);
            //ACT
            bool test2 = arhitect.isActive();
            //Assert
            Assert.AreNotEqual(true, test2, "The program should return false but it returns true, the start date can be greater than the end date");
        }
        [TestMethod]
        public void WrongEndDateTestIsActivArhitect()
        {
            // Arrange
            ProductNames.Arhitect arhitect = new ProductNames.Arhitect();
            arhitect.EndDate = new System.DateTime(2008, 3, 5);
            //ACT
            bool test3 = arhitect.isActive();
            //Assert
            Assert.AreNotEqual(true, test3, "The program should return false but it returns true, the current time can be greater than the end time");
        }
    }
}
