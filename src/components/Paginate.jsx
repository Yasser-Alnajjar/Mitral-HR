import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import TableEmployees from "./tables/TableEmployees";
export default function PaginatedItems({ itemsPerPage, items, refetch }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };
  return (
    <>
      <TableEmployees users={currentItems} refetch={refetch} />
      <div className="paginate mt-md">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineArrowRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          className="paginate_list"
          previousLabel={<AiOutlineArrowLeft />}
          renderOnZeroPageCount={null}
          disabledClassName="disabled_btn"
          activeClassName="active"
        />
      </div>
    </>
  );
}
