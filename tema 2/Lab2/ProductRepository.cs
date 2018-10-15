using System;
using System.Collections.Generic;
namespace Lab2{
   public class ProductRepository{
        private  List<Product> products;

        public ProductRepository(params Product[] list)
        {
            products=new List<Product>();
            if (list.Length < 3){
                throw new Exception ("A minimum of 3 products required!");
            }

            foreach (Product product in list){
                this.AddProduct(product);
            }
        }
        public Product GetProductByName(String productName){
            foreach(Product product in this.products){
                if (product.Name.Equals(productName)){
                     return product;
                }
            }
            throw new Exception("No product with that name");
        }
        public List<Product> findAllProducts(){
            if (products.Count==0){ 
                throw new Exception("No products in the list");
                }
            return products;
        }
        public Product GetProductbyPosition(int index){
            if (index<0 || index>products.Count){
                throw new Exception("Index out of bounds");
            }
            return products[index-1];
        }
        public void AddProduct(Product product) {
            foreach(Product testProduct in this.products){
                if (testProduct.Name.Equals(product.Name) || testProduct.Id.Equals(product.Id)){
                     throw new Exception("There is already a product with this name or id");
                }
            }
            products.Add(product);
        }
        public void RemoveProductByName(String productName){
            bool found=false;
            foreach(Product product in this.products){
                if (product.Name.Equals(productName)){
                    products.Remove(product);
                    found=true;
                }
            }
            if (found==false){
                throw new Exception("No product with that name");
            }
        }
    }
}