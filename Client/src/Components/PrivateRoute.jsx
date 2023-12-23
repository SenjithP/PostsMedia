import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function PrivateRoute({ children }) {

  const { userInfo } = useSelector( (state) => state.authentication );
  return userInfo ? <>{children}</> : <Navigate to="/userLogin" />;
}

export default PrivateRoute;