import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  }, []);

  return null;
  
}

export default Logout;
