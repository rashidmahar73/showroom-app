"use client";

import { useContext, useState, ReactNode, useEffect } from "react";
import { UseApiCall } from "../../hooks";
import { UserContext } from "../context";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<null | { userID: number }>(null);
  const router = useRouter();

  const {
    data: userData = { status: 0 },
    isLoading,
    refetch,
  } = UseApiCall({
    url: "users/getUserDetails",
    method: "POST",
    paramsData: { userID: user?.userID },
  });

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");

    if (!storedUserID) return router.push("/login");

    setUser({ userID: Number(storedUserID) });
  }, []);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, userData, setUser, isLoading, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
}
