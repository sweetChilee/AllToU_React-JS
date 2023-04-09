import { Route, Routes } from "react-router-dom";
import ContactUs from "../component/contents/contactus/ContactUs";
import Content from "../component/contents/content/Content";
import InvestMent from "../component/contents/investment/Investment";
import Portfolio from "../component/contents/portfolio/Portfolio";
import Loading from "../component/test/Loading";
import Main from "./main/Main";

export default function Link({ user }) {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/kakaologin" element={<Loading />} />
      <Route path="/content" element={<Content user={user} />} />
      <Route path="/portfolio" element={<Portfolio user={user} />} />
      <Route path="/investment" element={<InvestMent user={user} />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
  );
}
