import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorWindow = () => {
  useEffect(() => {
    document.getElementById("ToHome").click();
  }, []);
  return (
    <div>
      <Link id="ToHome" to="/">
        linked
      </Link>
      Error window 404
    </div>
  );
};

export default ErrorWindow;
