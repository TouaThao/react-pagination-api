import logo from "./logo.svg";
import "./App.css";
import { hot } from "react-hot-loader/root";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(12);
  useEffect(() => {
    const getComment = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await response.json();
      const total = response.headers.get("x-total-count");
      setPageCount(Math.ceil(total / limit));
      setItem(data);
    };
    getComment();
  }, []);

  const fetchComment = async (currentPage) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await response.json();
    return data;
  };

  console.log("item", item);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const fetchCommentFromServer = await fetchComment(currentPage);
    setItem(fetchCommentFromServer);
  };
  return (
    <div>
      <div className={"row m-2"}>
        {item.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.id} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-item active"}
      />
    </div>
  );
}

export default hot(App);
