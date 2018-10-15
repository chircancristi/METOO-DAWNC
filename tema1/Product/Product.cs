using System;

namespace ProductNames
{
    public class Product
    {
        public int Id {
            get; set;
        }

        public string Name {
            get; set;
        }

        public string Description {
            get; set;
        }

        public DateTime StartDate {
            get; set;
        }

        public DateTime EndDate {
            get; set;
        }

        public double Price {
            get; set;
        }

        public int VAT {
            get; set;
        }

        public bool IsValid () {
            if (this.StartDate > this.EndDate) {
                return false;
            }

            if (this.EndDate < DateTime.Now) {
                return false;
            }

            return true;
        }

        public double ComputeVAT () {
            return this.Price + this.Price * this.VAT / 100;
        }
    }
    public abstract class Employee{
           public int Id {
            get; set;
        }

        public string FirstName {
            get; set;
        }

        public string LastName {
            get; set;
        }

        public DateTime StartDate {
            get; set;
        }

        public DateTime EndDate {
            get; set;
        }

        public double Salary {
            get; set;
        }
        abstract public string GetFullName();
       abstract public bool isActive();
        
           
    }
    public class Manager:Employee{
        
        public override string GetFullName()
        {
            string FullName=this.FirstName+" "+this.LastName;
            return FullName;
        }
        public override bool isActive()
        {    
            if (this.StartDate > this.EndDate) {
                return false;
            }

            if (this.EndDate < DateTime.Now) {
                return false;
            }

            return true;
        }

    }
     public class Arhitect:Employee{
        
        public override string GetFullName()
        {
            string FullName=this.FirstName+" "+this.LastName;
            return FullName;
        }
        public override bool isActive()
        {    
            if (this.StartDate > this.EndDate) {
                return false;
            }

            if (this.EndDate < DateTime.Now) {
                return false;
            }

            return true;
        }

    }

     
}

