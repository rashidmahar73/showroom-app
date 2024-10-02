"use client";

// export async function APIHandlerV1({ method, url, data }: any) {
//   const token = localStorage?.getItem("token");

//   const combineURL = (url: string) => {
//     const baseUrl = "http://localhost:3001/";
//     return baseUrl + url;
//   };

//   const POSTObject = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   };

//   const GETObject = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const PUTObject = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   const DELETEObject = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   const methodData =
//     method === "POST"
//       ? POSTObject
//       : method === "DELETE"
//       ? DELETEObject
//       : method === "PUT"
//       ? PUTObject
//       : GETObject;

//   try {
//     const response = await fetch(combineURL(url), methodData);
//     const result = await response.json();
//     if (result) {
//       return result;
//     }
//   } catch (error) {
//     return error;
//   }
// }

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiHandlerParams {
  method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";
  url: string;
  data?: any;
}

async function APIHandlerV1({ method, url, data }: ApiHandlerParams) {
  try {
    const token = localStorage?.getItem("token");
    const response = await api({
      method,
      url: url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response);
  }
}

export { APIHandlerV1 };
