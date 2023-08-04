"use client";
import { useRouter } from "next/navigation";
import { useGetUsersQuery } from "../../redux/users/usersSlice";

const Dashboard = () => {
  const router = useRouter();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <code>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </code>
    );
  } else if (isError) {
    content = <p>{error.message}</p>;
  }
  return (
    <section>
      <h2>Hello</h2>
      {content}
      <button onClick={() => router.push("/")}>Go to Home</button>
    </section>
  );
};

export default Dashboard;
