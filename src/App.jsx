import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sOrder, setSOrder] = useState("ASC")

  useEffect(() => {
    fetchData({ page, sOrder });
  }, [page,sOrder]);

  const fetchData = async ({ page, sOrder }) => {
    setLoading(true)
    axios({
      method: "GET",
      url: "https://json-server-mocker-masai.herokuapp.com/candidates",
      params: {
        _page: page,
        _limit: 5,
        _sort : "salary",
        _order : sOrder,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .then((err) => {
        console.log(err);
        setLoading(false);
      });
  };


  return (
    <div className="App">
      <div>
        <div id="loading-container">
          {loading == true ? "...Loading" : null}
        </div>
        <Button onClick={() => setSOrder(sOrder == "ASC" ? "DESC" : "ASC")} id="SORT_BUTTON" title={sOrder == "ASC" ? "Sort by Descending Salary" : "Sort by Ascending Salary"} />
        <Button disabled={page == 1} onClick={() => setPage(page - 1)} title="PREV" id="PREV" />
        <Button onClick={() => setPage(page + 1)} id="NEXT" title="NEXT" />
      </div>
      {data.map((item) => (
        <CandidateCard key={item.id} {...item} />
      ))}
    </div>
  );
}
