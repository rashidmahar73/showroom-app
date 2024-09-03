export async function APIHandlerV1({ method, url, data }: any) {
  const combineURL = (url: string) => {
    const baseUrl = "http://localhost:3001/";
    return baseUrl + url;
  };

  const POSTObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const GETObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
