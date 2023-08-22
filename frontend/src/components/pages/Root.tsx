import { Outlet } from "react-router-dom";
import Header from "../reusable/layout/Header";
import Footer from "../reusable/layout/Footer";

export default function Root() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
