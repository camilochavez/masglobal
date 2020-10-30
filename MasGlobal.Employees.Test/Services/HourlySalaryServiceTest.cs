using MasGlobal.Employees.DTO;
using MasGlobal.Employees.Services;
using NUnit.Framework;
using System;
using System.Diagnostics.CodeAnalysis;

namespace MasGlobal.Employees.Test.Services
{
    [ExcludeFromCodeCoverage]
    public class HourlySalaryServiceTest
    {
        private ISalaryService _salaryService;


        [SetUp]
        public void SetUp()
        {
            _salaryService = new HourlySalaryService();
        }

        [Test]
        public void GivenAnEmployee_WhenCalculateAnnualSalary_ThenGetsAnnualSalary()
        {
            //given
            Employee employee = new HourlySalaryEmployee
            {
                HourlySalary = 10
            };

            //when
            var result = _salaryService.CalculateAnnualSalary(employee);

            //Then
            Assert.AreEqual(14400, result);
        }

        [Test]
        public void GivenANullEmployee_WhenCalculateAnnualSalary_ThenThrows()
        {
            //given
            Employee employee = null;

            //when then
            Assert.Throws<NullReferenceException>(() => _salaryService.CalculateAnnualSalary(employee));
        }
    }
}
