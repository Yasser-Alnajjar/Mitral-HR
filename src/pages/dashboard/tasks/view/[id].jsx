import { useRouter } from "next/router";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;
  return <div>View - {id}</div>;
}
