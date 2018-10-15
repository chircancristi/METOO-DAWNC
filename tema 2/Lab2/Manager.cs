using System;

namespace Lab2
{
    public class Manager:Employee
    {
         public Manager(int id, string firstName,string lastName,DateTime startDate, DateTime endDate, int salary):base(id, firstName,lastName,startDate,endDate,salary){

        }
        public override string Salutation() {
            return "Hello manager: " + this.GetFullName();
        }
    }
}
