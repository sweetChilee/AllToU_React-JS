import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import Link from "./screen/Link";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("https://port-0-auth-6g2llfxqu2r0.sel3.cloudtype.app/getuser", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setUser(res.data));
    }
  }, []);

  console.log("앱 유저", user);
  return (
    <BrowserRouter>
      <Header user={user} />
      <Link user={user} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
