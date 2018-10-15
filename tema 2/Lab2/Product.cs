using System;

namespace Lab2
{
public class Product
    {
                public Product(int id, string name,string description,DateTime startDate, DateTime endDate, double price, int vat)
        {
            //defensive codeing to be continued
            this.Id = id;
            this.Name = name;
            this.Description =  description;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.Price =price;
            this.VAT=vat;
        }
        public int Id {
            get;private set;
        }

        public string Name {
            get;private set;
        }

        public string Description {
            get;private set;
        }

        public DateTime StartDate {
            get; private set;
        }

        public DateTime EndDate {
            get; private set;
        }

        public double Price {
            get; private set;
        }

        public int VAT {
            get; private set;
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
}