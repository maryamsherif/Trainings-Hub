import { Outlet } from "react-router-dom";
import Header from "../reusable/layout/Header";

export default function Root() {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}
