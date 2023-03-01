import Layout from "@/components/Layout";
import { user } from "@/utils/auth";
import Head from "next/head";
import { useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className={`${theme.mode} py-5`}>
        <Head>
          <title>Profile</title>
        </Head>
        <Container>
          <Card className={`shadow ${theme.mode}`}>
            <Card.Img
              className={`${theme.mode} img-thumbnail shadow border-0`}
              style={{ width: "200px" }}
              src={"https://robohash.org/perferendisideveniet.png"}
            />
            <Card.Body>
              <Table className={`${theme.mode}`}>
                <tbody>
                  <tr>
                    <td className="text-capitalize">Name</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.name}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Email</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.email}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Address</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.address}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Role</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.role}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Salary</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.salary}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Department</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.department}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">Branch</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.branch}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">phone</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.phone}</td>
                  </tr>
                  <tr>
                    <td className="text-capitalize">rate</td>
                    <td className="text-capitalize">:</td>
                    <td className="text-capitalize">{user.user.rate}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
}
