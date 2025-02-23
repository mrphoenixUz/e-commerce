'use client';
import { store } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [router]);

  return <Provider store={store}>{children}</Provider>;
}