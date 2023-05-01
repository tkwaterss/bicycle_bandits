import React, { useState } from "react";
import axios from "axios";

const useAxios = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { method, address, headers, body } = requestConfig;


  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    axios[method](address, headers)
      .then((res) => {
        console.log(res.data);
        applyData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useAxios;

//hit get tickets end point
  // let requestConfig = {
  //   method: "get",
  //   address: "http://localhost:4040/tickets",
  //   headers: {
  //     headers: {
  //       authorization: token,
  //     },
  //   },
  // };
  // const displayTickets = (data) => {
  //   setTickets(data);
  // };
  // const { sendRequest, isLoading, error } = useAxios(
  //   requestConfig,
  //   displayTickets
  // );

  // useEffect(() => {
  //   sendRequest(requestConfig, displayTickets);
  // }, []);