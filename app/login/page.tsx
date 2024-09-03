"use client";

import { Form } from "./form";

function Login() {
  async function dataCarrier(userData: any) {
    const userDataDetails = {
      email: userData.email,
      // phonenumber:Number(userData.phonenumber),
      password: userData.password,
    };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataDetails),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message); // "User created successfully"
        // Handle success, like redirecting the user or showing a success message
      } else {
        console.error("Signup failed:", result);
        // Handle error, like showing an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors
    }
  }

  return <Form dataCarrier={dataCarrier} />;
}

export default Login;
