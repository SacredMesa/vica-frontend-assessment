import {Navigate, Route, Routes} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {checkSession} from "./loginSlice";
import {Counter} from "../counter/Counter";
import UserManagement from "../user-management/UserManagement";

const AuthRedirection = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession())
    // if(isAuthenticated) return navigate('/home')
  },[dispatch])

  if (!sessionStorage.getItem('username') && !sessionStorage.getItem('persona')) {
    return <Navigate to='/login' replace/>
  }
  return (
    <BaseLayout>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/books" element={<>books</>} />
        <Route path="/analytics" element={<>analytics</>} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </BaseLayout>
  )
}

export default AuthRedirection
