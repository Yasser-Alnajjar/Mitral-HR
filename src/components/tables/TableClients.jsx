"use client";
import React from "react";
import { useGetClientsQuery } from "../../redux/clients/clientSlice";
import { toast } from "react-hot-toast";

export default function TableClients() {
  const { data: clients, isSuccess, isError, error } = useGetClientsQuery();
  let content;
  if (isSuccess) {
    content = (
      <div className="table-container mt-lg mb-lg p-lg">
        <table className="table text-start mt-lg">
          <thead className="table__head">
            <tr>
              <th className="p-lg">#</th>
              <th className="p-lg">client</th>
              <th className="p-lg">contact Person</th>
              <th className="p-lg">phone</th>
              <th className="p-lg">email</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {clients.map((client, index) => (
              <tr className="" key={client.id}>
                <td>{index + 1}</td>
                <td className="capitalize p-lg">{client.name}</td>
                <td className="capitalize p-lg">{client.contact}</td>
                <td className="capitalize p-lg">{client.phone}</td>
                <td className="capitalize p-lg">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (isError) toast.error(error.data);
  return content;
}
