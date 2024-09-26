"use client";

export async function APIHandlerV1({ method, url, data }: any) {
  const token=localStorage?.getItem("token");

  const combineURL = (url: string) => {
    const baseUrl = "http://localhost:3001/";
    return baseUrl + url;
  };

  const POSTObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Bearer-Token": token, // Add the custom token header
    },
    body: JSON.stringify(data),
  };

  const GETObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const PUTObject = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const DELETEObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Optional: Include `body` if your DELETE request requires data
  };

  // const methodData =
  //   method === "POST" || method === "post" ? POSTObject : GETObject;
  const methodData =
    method === "POST"
      ? POSTObject
      : method === "DELETE"
      ? DELETEObject
      : method === "PUT"
      ? PUTObject
      : GETObject;

  try {
    const response = await fetch(combineURL(url), methodData);
    const result = await response.json();
    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
}


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001/",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// interface ApiHandlerParams {
//   method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";
//   url: string;
//   data?: any;
// }

// async function getToken() {
//   try {
//     const response = await api.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/token`
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to get CSRF token");
//   }
// }

// async function APIHandlerV1({ method, url, data }: ApiHandlerParams) {
//   try {
//     const token = await getToken();
//     const response = await api({
//       method,
//       url: url,
//       data,
//       headers: {
//         "X-CSRF-TOKEN": token, // Add the token to the headers
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     return Promise.reject(error);
//   }
// }

// export { APIHandlerV1 };
