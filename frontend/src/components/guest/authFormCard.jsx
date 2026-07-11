import google from "@assets/images/google.svg";
import logo from "@assets/images/logo.svg";
import SingInFrom from "./singInFrom";
import SingUpFrom from "./singUpFrom";
import { Link } from "react-router-dom";

export default function authFormCard({
  cardDetail = {
    page: "signin",
    subHeading: "Welcome back",
    heading: "Login to your account",
  },
}) {
  return (
    <div className="_social_login_content">
      <div className="_social_login_left_logo _mar_b28">
        <Link to="/">
          <img src={logo} alt="Image" className="_left_logo" />
        </Link>
      </div>
      <p className="_social_login_content_para _mar_b8">
        {cardDetail.subHeading}
      </p>
      <h4 className="_social_login_content_title _titl4 _mar_b50">
        {cardDetail.heading}
      </h4>
      <button type="button" className="_social_login_content_btn _mar_b40">
        <img src={google} alt="Image" className="_google_img" />{" "}
        <span>Or sign-in with google</span>
      </button>
      <div className="_social_login_content_bottom_txt _mar_b40">
        {" "}
        <span>Or</span>
      </div>

      {cardDetail.page === "signin" ? <SingInFrom /> : <SingUpFrom />}

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              {cardDetail.page === "signin" ? (
                <>
                  Don't have an account? <Link to="/sign-up">Sign up now</Link>
                </>
              ) : (
                <>
                  Have an account? <Link to="/sign-in">Sign in now</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
