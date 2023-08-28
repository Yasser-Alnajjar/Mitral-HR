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
          <caption>Clients</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">client</th>
              <th className="table__head__tr__th">contact Person</th>
              <th className="table__head__tr__th">phone</th>
              <th className="table__head__tr__th">email</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {clients.map((client, index) => (
              <tr className="table__body__tr" key={client.id}>
                <td data-label={"#"} className="capitalize table__body__tr__td">
                  {index + 1}
                </td>
                <td
                  data-label={"Name"}
                  className="capitalize table__body__tr__td"
                >
                  {client.name}
                </td>
                <td
                  data-label={"Contact"}
                  className="capitalize table__body__tr__td"
                >
                  {client.contact}
                </td>
                <td
                  data-label={"Phone"}
                  className="capitalize table__body__tr__td"
                >
                  {client.phone}
                </td>
                <td
                  data-label={"Email"}
                  className="capitalize table__body__tr__td"
                >
                  {client.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (isError) toast.error(error.data);
  return content;
}
