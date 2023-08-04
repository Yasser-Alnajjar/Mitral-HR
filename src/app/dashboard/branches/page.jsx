"use client";
import Loading from "../../../components/Loading";
import { useGetBranchesQuery } from "../../../redux/branches/branchesSlice";

export default function Branches() {
  const {
    data: branches,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBranchesQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <section className="branches">
        <div className="container">
          <div className="branches__items">
            {branches.map((item) => (
              <div key={item.id} className="branches__items__item">
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (isError) {
    content = JSON.stringify(error.message);
  }
  return content;
}
