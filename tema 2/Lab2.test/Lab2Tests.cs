using Microsoft.VisualStudio.TestTools.UnitTesting;

using Lab2;

namespace Lab2.test
{
    [TestClass]
    public class Lab2Test
    {
        [TestMethod]
        public void SalutationTestGivenValidInput()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2010, 4, 6), new System.DateTime(2015, 4, 6), 2);
            Assert.AreEqual(manager.Salutation(), "Hello manager: " + "Angel" + " " + "Ardeleanu", "Salutation method fail for valid!");
        }

        [TestMethod]
        public void SalutationTestGivenInvalidInput()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2010, 4, 6), new System.DateTime(2015, 4, 6), 2);
            Assert.AreNotEqual(manager.Salutation(), "Hello manager: " + "Angel" + "" + "Ardeleanu", "Salutation method fail for invalid!");
        }

        [TestMethod]
        public void TestIsValidGivenCorrectData()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Assert.AreEqual(product.IsValid(), true, "This should be true");
        }

        [TestMethod]
        public void TestIsValidGivenEndDateBeforeStart()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2020, 12, 14), new System.DateTime(2019, 12, 13), 20, 30);
            Assert.AreEqual(product.IsValid(), false, "This should be false");

        }

        [TestMethod]
        public void TestIsValidGivenEndDateBefortToday()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2017, 12, 14), 20, 30);
            Assert.AreEqual(product.IsValid(), false, "This should be false");
        }

        [TestMethod]
        public void TestComputeVATGivenValidData()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 15.5, 25);
            Assert.AreEqual(product.ComputeVAT(), 19.375, "This should be equal");
        }

        [TestMethod]
        public void TestComputeVATForInvalidOutput()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 15.5, 25);
            Assert.AreNotEqual(product.ComputeVAT(), 19, "This shouldn't be equal");
        }

        [TestMethod]
        public void TestGetFullNameForValidOutput()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2010, 4, 6), new System.DateTime(2015, 4, 6), 2);

            Assert.AreEqual(manager.GetFullName(), "Angel Ardeleanu", "This should be equal");
        }

        [TestMethod]
        public void TestGetFullNameForInvalidOutput()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2010, 4, 6), new System.DateTime(2015, 4, 6), 2);

            Assert.AreNotEqual(manager.GetFullName(), "Ardeleanu Angel", "This shouldn't be equal");
        }

        [TestMethod]
        public void TestIsActiveForAnActiveManager()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2009, 6, 4), new System.DateTime(2019, 6, 4), 2);

            Assert.AreEqual(manager.IsActive(), true, "This should be equal");
        }
        [TestMethod]
        public void TestIsActiveForAnInactiveManager()
        {
            Lab2.Manager manager = new Lab2.Manager(1, "Angel", "Ardeleanu", new System.DateTime(2009, 6, 4), new System.DateTime(2012, 6, 4), 2);

            Assert.AreEqual(manager.IsActive(), false, "This should be equal");
        }

        [TestMethod]
        public void TestGetFullNameForValidOutputArchitect()
        {
            Lab2.Architect architect = new Lab2.Architect(1, "Angel", "Ardeleanu", new System.DateTime(2009, 6, 4), new System.DateTime(2019, 6, 4), 2);

            Assert.AreEqual(architect.GetFullName(), "Angel Ardeleanu", "This should be equal");
        }

        [TestMethod]
        public void TestGetFullNameForInvalidOutputArchitect()
        {
            Lab2.Architect architect = new Lab2.Architect(1, "Angel", "Ardeleanu", new System.DateTime(2009, 6, 4), new System.DateTime(2019, 6, 4), 2);
            Assert.AreNotEqual(architect.GetFullName(), "Ardeleanu Angel", "This shouldn't be equal");
        }
        [TestMethod]
        public void TestProductRepositoryConstructor()
        {
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
        }
        [TestMethod]
        public void TestGetProductByName(){
        
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
            Assert.AreEqual(product.Id,productRepository.GetProductByName("ceapa").Id,"Wrong product returned");
        }
        [TestMethod]
        public void TestAddProduct(){
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
            Lab2.Product product4 = new Lab2.Product(4, "gelu", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            productRepository.AddProduct(product4);
            Assert.AreEqual(product4,productRepository.GetProductByName("gelu"),"Product not added");
        }
        [TestMethod]
        public void TestGetProductByPosition(){
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
            Assert.AreEqual(product,productRepository.GetProductbyPosition(1),"Wrong product returned");
        }
        [TestMethod]
        public void TestfindAllProducts(){
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
            Assert.AreEqual(3,productRepository.findAllProducts().Count,"List of products incomplete");
        }
        public void TestRemoveProductByname(){
            Lab2.Product product = new Lab2.Product(1, "ceapa", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product2 = new Lab2.Product(2, "strugure", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.Product product3 = new Lab2.Product(3, "albina", "de mancat", new System.DateTime(2011, 12, 13), new System.DateTime(2019, 12, 14), 20, 30);
            Lab2.ProductRepository productRepository = new Lab2.ProductRepository(product, product2,product3);
            productRepository.RemoveProductByName("albina");
            Assert.AreEqual(2,productRepository.findAllProducts().Count,"Product not removed");

        }
    }
}
