import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import { Service } from "../../services";
import ErrorPopup from "../error-popup";
import { BASE_URL, URL_LOGIN } from "../../constants/apiUrls";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  username: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  const onSubmit = async (data) => {
    const resp = await Service.send({
      baseurl: BASE_URL,
      url: URL_LOGIN,
      method: "POST",
      obj: data,
      isRawData: true,
    });

    if (resp.status === 200) {
      localStorage.setItem("userData", JSON.stringify(resp.data));
      dispatch(setUserData(resp.data));
      
    } else {
      setErrorMessage(resp?.data?.message || "Error occured");
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label>User Name*</label>
          <input
            type="text"
            {...register("username")}
            placeholder="Enter user name here..."
          />
          <p>{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password here..."
          />
          <p>{errors.password?.message}</p>
        </div>
      </div>
      {showErrorPopup && (
        <ErrorPopup
          errorMessage={errorMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
