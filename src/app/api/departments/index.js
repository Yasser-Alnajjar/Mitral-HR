import { departments } from "database/departments";

export default function handler(req, res) {
  if (req.method === "GET" || req.method === "get") {
    res.status(200).json(departments);
  } else if (req.method === "POST" || req.method === "post") {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const newDepartment = {
      id: departments.length + 1,
      title,
      subtitle,
      manager,
      employees,
    };
    departments.push(newDepartment);
    res.status(201).json(newDepartment);
  }
}
