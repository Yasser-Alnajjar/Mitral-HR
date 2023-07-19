import { employee } from "database/employee";

export default function handler(req, res) {
  res.status(200).json(employee);
}
