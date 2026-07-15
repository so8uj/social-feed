import { useState } from "react";
import { Link } from "react-router-dom";
import FormAlerts from "../form/FormAlerts";
import { useAuth } from "../../context/AuthContext";

export default function SignUpForm() {
  const { register } = useAuth();
  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [erros, setErros] = useState({
    status: false,
    message: "",
  });

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signUpData.first_name ||
      !signUpData.last_name ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.password_confirmation
    ) {
      setErros({
        status: true,
        message: "All fields are required",
      });
      return;
    }
    if (signUpData.password !== signUpData.password_confirmation) {
      setErros({
        status: true,
        message: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    setErros({
      status: false,
      message: "",
    });
    setSuccess({
      status: false,
      message: "",
    });

    try {
      await register(signUpData);

      setSuccess({
        status: true,
        message: (
          <>
            Registration successful. Please <Link to="/sign-in">Login</Link>{" "}
            using your credentials.
          </>
        ),
      });
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
      {success.status && (
        <FormAlerts alertData={{ type: "success", message: success.message }} />
      )}
      {erros.status && (
        <FormAlerts alertData={{ type: "danger", message: erros.message }} />
      )}
      <form className="_social_registration_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                First Name
              </label>
              <input
                type="text"
                className="form-control _social_registration_input"
                name="first_name"
                value={signUpData.first_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Last Name
              </label>
              <input
                type="text"
                className="form-control _social_registration_input"
                name="last_name"
                value={signUpData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Email
              </label>
              <input
                type="email"
                className="form-control _social_registration_input"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Password
              </label>
              <input
                type="password"
                className="form-control _social_registration_input"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control _social_registration_input"
                name="password_confirmation"
                value={signUpData.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
                readOnly
              />
              <label
                className="form-check-label _social_registration_form_check_label"
                htmlFor="flexRadioDefault2"
              >
                I agree to terms & conditions
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={loading}
              >
                {loading ? "Registering..." : "Registration"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
