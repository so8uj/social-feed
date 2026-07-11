import { Outlet } from "react-router-dom";
import shape1 from "@assets/images/shape1.svg";
import shape2 from "@assets/images/shape2.svg";
import shape3 from "@assets/images/shape3.svg";
import dark_shape from "@assets/images/dark_shape.svg";
import dark_shape1 from "@assets/images/dark_shape1.svg";
import dark_shape2 from "@assets/images/dark_shape2.svg";

export default function guestLayout() {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src={shape1} alt="" className="_shape_img" />
        <img src={dark_shape} alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src={shape2} alt="" className="_shape_img" />
        <img
          src={dark_shape1}
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <img src={shape3} alt="" className="_shape_img" />
        <img
          src={dark_shape2}
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <Outlet />
    </section>
  );
}
