import { useRouter } from "next/navigation";
import { Navbar } from "../components";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // If the token exists, render the wrapped component
    return (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuth;
