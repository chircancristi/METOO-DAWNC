using System;
using Xunit;

namespace Product.testxunit
{
    public class UnitTest1
    {
        ProductNames.Product product = new ProductNames.Product();
         ProductNames.Manager manager= new ProductNames.Manager();
         ProductNames.Arhitect arhitect = new ProductNames.Arhitect();
        [Fact]
        public void CorectTestIsValid()
        {
            this.product.StartDate= new System.DateTime(2007,5,2); 
            this.product.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test1=this.product.IsValid();
            //Assert
            Assert.True(test1,"The program should return true but it returns false");
        }
          [Fact]
         public void WrongStartDateTestIsValid() {
              // Arrange
           
            product.StartDate= new System.DateTime(2020,5,2); 
            product.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test2=product.IsValid();
            //Assert
            Assert.False(test2,"The program should return false but it returns true, the start date can be greater than the end date");
        }
          [Fact]
            public void WrongEndDateTestIsValid() {
                // Arrange
            product.EndDate=new System.DateTime(2008,3,5);
            //ACT
            bool test3=product.IsValid();
            //Assert
            Assert.False(test3,"The program should return false but it returns true, the current time can be greater than the end time");
        }
          [Fact]
              public void TestComputeVAT() {
                //Arrange
            product.Price=15.5;
            product.VAT=25;
            double expected=19.375;
            //Act
            double actual=product.ComputeVAT();
            //Assert
            bool check=expected.Equals(actual);
            Assert.True(check,"The ComputeVat returns a wrong calculation");
        }
          [Fact]
           public void TestGetFullName(){
            //Arrange
             manager.FirstName="dan";
             manager.LastName="chircan";
             string expected= "dan chircan";
            //Act
            string actual=manager.GetFullName();
            bool check=expected.Equals(actual);
            //Assert
            Assert.True(check,"The full name is wrong");
         }
          [Fact]
           public void CorectTestIsActiv() {
            // Arrange
            manager.StartDate= new System.DateTime(2007,5,2); 
            manager.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test1=manager.isActive();
            //Assert
            Assert.True(test1,"The program should return true but it returns false");
    
        }
          [Fact]
           public void WrongStartDateTestIsActiv() {
              // Arrange
            manager.StartDate= new System.DateTime(2020,5,2); 
            manager.EndDate=new System.DateTime(2019,3,5);
            //ACT
            bool test2=manager.isActive();
            //Assert
            Assert.False(test2,"The program should return false but it returns true, the start date can be greater than the end date");
        }
           [Fact]
         public void WrongEndDateTestIsActiv() {
            // Arrange
            manager.EndDate=new System.DateTime(2008,3,5);
            //ACT
            bool test3=manager.isActive();
            //Assert
            Assert.False(test3,"The program should return false but it returns true, the current time can be greater than the end time");
        }        
           [Fact]  
         public void TestGetFullNameArhitect()
        {
            //Arrange
            
            arhitect.FirstName = "dan";
            arhitect.LastName = "chircan";
            string expected = "dan chircan";
            //Act
            string actual = arhitect.GetFullName();
            //Assert
            bool check=actual.Equals(expected);
            Assert.True(check, "The full name is wrong");
        }
           [Fact]
          public void CorectTestIsActivArhitect()
        {
            // Arrange
            arhitect.StartDate = new System.DateTime(2007, 5, 2);
            arhitect.EndDate = new System.DateTime(2019, 3, 5);
            //ACT
            bool test1 = arhitect.isActive();
            //Assert
            Assert.True( test1, "The program should return true but it returns false");

        }
           [Fact]
         public void WrongStartDateTestIsActivArhitect()
        {
            // Arrange
            
            arhitect.StartDate = new System.DateTime(2020, 5, 2);
            arhitect.EndDate = new System.DateTime(2019, 3, 5);
            //ACT
            bool test2 = arhitect.isActive();
            //Assert
            Assert.False(test2, "The program should return false but it returns true, the start date can be greater than the end date");
        }
           [Fact]
          public void WrongEndDateTestIsActivArhitect()
        {
            // Arrange

            arhitect.EndDate = new System.DateTime(2008, 3, 5);
            //ACT
            bool test3 = arhitect.isActive();
            //Assert
            Assert.False( test3, "The program should return false but it returns true, the current time can be greater than the end time");
        }
    }
}
