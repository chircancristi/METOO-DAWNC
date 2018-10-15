using System;

namespace Lab2
{
    public class Architect:Employee
    {
     
        public Architect(int id, string firstName,string lastName,DateTime startDate, DateTime endDate, int salary):base(id, firstName,lastName,startDate,endDate,salary){

        }
        public override string Salutation() {
            return "Hello architect: " + this.GetFullName();
        }
    }
}
