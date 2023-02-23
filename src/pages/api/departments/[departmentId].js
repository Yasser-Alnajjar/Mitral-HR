import { departments } from "database/departments";

export default function handler(req, res) {
  const { departmentId } = req.query;
  if (req.method === "GET" || req.method === "get") {
    const department = departments.find(
      (item) => item.id === parseInt(departmentId)
    );
    res.status(200).json(department);
  } else if (req.method === "DELETE" || req.method === "delete") {
    const deletedDepartment = departments.find(
      (depart) => depart.id === parseInt(departmentId)
    );
    const index = branches.findIndex(
      (branch) => branch.id === parseInt(branchId)
    );
    branches.splice(index, 1);
    res.status(200).json(deletedDepartment);
  }
}
