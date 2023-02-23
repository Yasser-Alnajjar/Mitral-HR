import { Card, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Profile() {
  const { theme, user } = useSelector((state) => state);
  return (
    <div className={`${theme.mode} py-5`}>
      <Container>
        <Card className={`shadow ${theme.mode}`}>
          <Card.Img
            className={`${theme.mode} img-thumbnail shadow border-0`}
            style={{ width: "200px" }}
            src={user.user.image}
          />
          <Card.Body>
            <Table variant={`${theme.mode}`}>
              <tbody>
                <tr>
                  <td className="text-capitalize">Name</td>
                  <td className="text-capitalize">:</td>
                  <td className="text-capitalize">
                    {user.user.firstName} {user.user.maidenName}{" "}
                    {user.user.lastName}
                  </td>
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
                  <td className="text-capitalize">Age</td>
                  <td className="text-capitalize">:</td>
                  <td className="text-capitalize">{user.user.age}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">Gender</td>
                  <td className="text-capitalize">:</td>
                  <td className="text-capitalize">{user.user.gender}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">phone</td>
                  <td className="text-capitalize">:</td>
                  <td className="text-capitalize">{user.user.phone}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">Birth Date</td>
                  <td className="text-capitalize">:</td>
                  <td className="text-capitalize">{user.user.birthDate}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
