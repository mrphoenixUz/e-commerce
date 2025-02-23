'use client';
import { store } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        router.push("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        console.log("isExpired", isExpired);
        console.log("payload", payload)
        if (isExpired) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");
      }
    }
  }, [router]);

  if (!isAuthenticated) return null;
  return <Provider store={store}>{children}</Provider>;
}