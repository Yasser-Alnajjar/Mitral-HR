import { branches } from "database/branches";

export default function handler(req, res) {
  const { branchId } = req.query;
  if (req.method === "GET" || req.method === "get") {
    const branch = branches.find((branch) => branch.id === parseInt(branchId));
    res.status(200).json(branch);
  } else if (req.method === "DELETE" || req.method === "delete") {
    
    const deletedBranch = branches.find(
      (branch) => branch.id === parseInt(branchId)
    );
    const index = branches.findIndex(
      (branch) => branch.id === parseInt(branchId)
    );
    branches.splice(index, 1);
    res.status(200).json(deletedBranch);
  }
}
