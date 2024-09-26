"use client";

import { Navbar } from "../components";
import { useUser } from "../providers";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { userData } = useUser();

    if (userData?.status !== 200) {
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
