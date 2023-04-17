import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/signup";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("usetToken"));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {!token && (
          <>
            <Route path="/" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}

        <Route path="/addproduct" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
