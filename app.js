// let departments = [
//   "Physical Therapy Assistant",
//   "Physical Therapy Assistant",
//   "Accountant III",
//   "Help Desk Technician",
//   "Account Executive",
//   "Senior Cost Accountant",
//   "Editor",
//   "Web Developer II",
//   "Food Chemist",
//   "Librarian",
//   "Media Manager IV",
//   "Web Developer II",
//   "VP Product Management",
//   "Accountant IV",
//   "Geological Engineer",
//   "Nurse Practicioner",
//   "Help Desk Operator",
//   "Speech Pathologist",
//   "Sales Representative",
//   "Staff Scientist",
//   "Budget/Accounting Analyst II",
//   "VP Quality Control",
//   "Administrative Officer",
//   "Human Resources Assistant III",
//   "Recruiting Manager",
//   "VP Product Management",
//   "Technical Writer",
//   "Executive Secretary",
//   "Quality Engineer",
//   "Junior Executive",
//   "Product Engineer",
//   "Administrative Officer",
//   "Marketing Assistant",
//   "Legal Assistant",
//   "Director of Sales",
//   "Quality Engineer",
//   "Programmer Analyst II",
//   "Senior Sales Associate",
//   "Biostatistician III",
//   "Senior Developer",
//   "Financial Advisor",
//   "Administrative Officer",
//   "Developer IV",
//   "Business Systems Development Analyst",
//   "Research Assistant I",
//   "Software Consultant",
//   "Web Designer II",
//   "Programmer Analyst II",
//   "VP Accounting",
//   "Clinical Specialist",
//   "Operator",
//   "VP Product Management",
//   "Software Engineer II",
//   "Financial Advisor",
//   "Paralegal",
//   "Help Desk Operator",
//   "Quality Control Specialist",
//   "Desktop Support Technician",
//   "Environmental Specialist",
//   "Office Assistant I",
//   "Assistant Manager",
//   "Programmer I",
//   "VP Accounting",
//   "Biostatistician III",
//   "Senior Editor",
//   "Biostatistician I",
//   "Assistant Media Planner",
//   "Financial Analyst",
//   "Quality Engineer",
//   "Physical Therapy Assistant",
//   "Senior Cost Accountant",
//   "Director of Sales",
//   "Automation Specialist III",
//   "Financial Analyst",
//   "Assistant Media Planner",
//   "Environmental Specialist",
//   "Senior Quality Engineer",
//   "Civil Engineer",
//   "Speech Pathologist",
//   "Librarian",
//   "Accounting Assistant IV",
//   "General Manager",
//   "Staff Accountant III",
//   "Software Consultant",
//   "Recruiter",
//   "Registered Nurse",
//   "Database Administrator I",
//   "Legal Assistant",
//   "Sales Associate",
//   "Assistant Manager",
//   "Geological Engineer",
//   "Systems Administrator I",
//   "Assistant Manager",
//   "Financial Analyst",
//   "Help Desk Technician",
//   "Assistant Media Planner",
//   "Financial Analyst",
//   "Senior Developer",
//   "Legal Assistant",
//   "Research Associate",
// ];
// let newDepartments = new Set(departments);
// let num = 0;
// num++;

// let newdepartments = departments.map((item, index) => ({
//   id: index + 1,
//   name: item,
//   leader: "Yasser",
// }));
// console.log(newdepartments);
const isValidDate = (value) => {
  // Check if the value is a string.
  if (!typeof value === "string") {
    return false;
  }

  // Split the value into its components.
  const [year, month, day] = value.split("-");

  // Check if the year is a four-digit number.
  if (year.length !== 4) {
    return false;
  }

  // Check if the month is a number between 1 and 12.
  if (month < 1 || month > 12) {
    return false;
  }

  // Check if the day is a number between 1 and 31.
  if (day < 1 || day > 31) {
    return false;
  }

  return true;
};

// Check if the specified value conforms to the required format.
const value = "2023-08-11";
const isDateValid = isValidDate(value);

console.log(isDateValid);
