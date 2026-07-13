import Header from "../components/user/header";
import LeftSidebar from "../components/user/leftSideBar";
import RightSideBar from "../components/user/rightSideBar";
import { Outlet } from "react-router-dom";

export default function appLayout() {
  return (
    <>
      <div className="_layout _layout_main_wrapper">
        <div className="_main_layout">
          <Header />
          <div className="container _custom_container">
            <div className="_layout_inner_wrap">
              <div className="row">
                <LeftSidebar />
                <Outlet />
                <RightSideBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
