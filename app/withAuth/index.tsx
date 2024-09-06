"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "../components";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      if (token) {
        setIsAuthenticated(true);
        return;
      }
    }, []);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuth;
