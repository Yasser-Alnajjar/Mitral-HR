// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { branches } from "database/branches";

export default function handler(req, res) {
  if (req.method === "GET" || req.method === "get") {
    res.status(200).json(branches);
  } else if (req.method === "POST" || req.method === "post") {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const newBranch = {
      id: branches.length + 1,
      title,
      subtitle,
    };
    branches.push(newBranch);
    res.status(201).json(newBranch);
  }
}
