import React from "react";
import { useUserAuth } from "../../contexts/useUserAuth";

const LoginPage = () => {
  const { login } = useUserAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => login()}
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
