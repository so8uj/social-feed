import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import FormAlerts from "../form/FormAlerts";

export default function SignInForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setErros] = useState({
    status: false,
    message: "",
  });

  const { login } = useAuth();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const resetSuccessError = () => {
    setErros({
      status: false,
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signInData.email || !signInData.password) {
      setErros({
        status: true,
        message: "All fields are required",
      });
      return;
    }

    setLoading(true);
    resetSuccessError();

    try {
      await login(signInData);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErros({
        status: true,
        message: err.response?.data?.message || "Invalid email or password.",
      });
    }
  };

  return (
    <>
      {error.status && (
        <FormAlerts alertData={{ type: "danger", message: error.message }} />
      )}
      <form className="_social_login_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Email</label>
              <input
                type="email"
                className="form-control _social_login_input"
                name="email"
                value={signInData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Password</label>
              <input
                type="password"
                className="form-control _social_login_input"
                name="password"
                value={signInData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                defaultChecked
              />
              <label
                className="form-check-label _social_login_form_check_label"
                htmlFor="flexRadioDefault2"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para">Forgot password?</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1 d-flex"
                disabled={loading}
              >
                {loading ? "Loggin..." : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
