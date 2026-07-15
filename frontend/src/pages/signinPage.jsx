import login from "@assets/images/login.png";
import AuthPageLeft from "../components/guest/AuthPageLeft";
import AuthFormCard from "../components/guest/AuthFormCard";

export default function SigninPage() {
  return (
    <div className="_social_login_wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <AuthPageLeft leftImage={login} />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <AuthFormCard
              cardDetail={{
                page: "signin",
                subHeading: "Welcome back",
                heading: "Login to your account",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
