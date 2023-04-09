import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Loading() {
  const location = useLocation();
  const navi = useNavigate();

  useEffect(() => {
    const KAKAO_CODE = window.location.search.split("=")[1];
    const IP = "https://port-0-auth-6g2llfxqu2r0.sel3.cloudtype.app";

    if (!localStorage.getItem("token") && KAKAO_CODE != null) {
      fetch(`${IP}/join?code=${KAKAO_CODE}`, {
        method: "GET",
      })
        .then((res) => {
          return res.headers.get("Authorization");
        })
        .then((token) => {
          localStorage.setItem("token", token);
          navi("/");
          window.location.reload();
        });
    }
  }, []);
  return <h1>Loading...</h1>;
}
