import MainTitle from "@/components/Shared/MainTitle";

import FormEditprofile from "@/components/profile/FormEditprofile";
import Layout from "@/components/Layout";
export default function Editprofile() {
  return (
    <Layout>
      <div className="py-5">
        <MainTitle title={"Edit Profile"} classes={"pb-4"} />
        <FormEditprofile />
      </div>
    </Layout>
  );
}
