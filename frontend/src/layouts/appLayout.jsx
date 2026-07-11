import Header from "../components/user/header";
import LeftSidebar from "../components/user/leftSideBar";
import MiddleLayout from "../components/user/middleLayout";
import RightSideBar from "../components/user/rightSideBar";

export default function appLayout() {
  return (
    <>
      <div className="_layout _layout_main_wrapper">
        <div classNameName="_main_layout">
          <Header />
          <div className="container _custom_container">
            <div className="_layout_inner_wrap">
              <div className="row">
                <LeftSidebar />
                <MiddleLayout />
                <RightSideBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
