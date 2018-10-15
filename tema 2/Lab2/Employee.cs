using System;

namespace Lab2
{
    public abstract class Employee
    {
        public Employee(int id, string firstName,string lastName,DateTime startDate, DateTime endDate, int salary)
        {
            //defensive codeing to be continued
            this.Id = id;
            this.FirstName = firstName;
            this.LastName =  lastName;
            this.StartDate = StartDate;
            this.EndDate = endDate;
            this.Salary =salary;
        }
        public int Id {
            get; private set;
        }

        public string FirstName {
            get; private set;
        }

        public string LastName {
            get; private set;
        }

        public DateTime StartDate {
            get; private set;
        }

        public DateTime EndDate {
             get; private set;
        }

        public double Salary {
             get; private set;
        }
        public string GetFullName() {
            return this.FirstName + " " + this.LastName;
        }

        public bool IsActive () {
            if (this.StartDate > this.EndDate) {
                return false;
            }

            if (this.EndDate < DateTime.Now) {
                return false;
            }

            return true;
        }

        public abstract string Salutation();
    }
}
