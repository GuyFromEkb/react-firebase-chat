import { User } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  user: User | null;
  outlet: JSX.Element;
}

export const ProtectedRouteV2: FC<IProtectedRoute> = ({ user, outlet }) => {
  if (user) {
    return outlet;
  }

  return <Navigate to="/login" />;
};

export default observer(ProtectedRouteV2);
