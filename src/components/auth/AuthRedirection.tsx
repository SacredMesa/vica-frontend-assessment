import {Navigate} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import React from "react";
import {store} from "../../app/store";

const AuthRedirection = () => {
  if (!store.getState().login.isAuthenticated) {
    return <Navigate to='/login' replace/>
  }
  return (
    <BaseLayout />
  )
}

export default AuthRedirection
