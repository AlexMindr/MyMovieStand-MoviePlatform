import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element;
};

const PageRedirect = ({ children }: Props) => {
  //   const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const user = false;
  const toRedirect = location.state?.from?.pathname || "/";
  if (user) {
    return <Navigate to={toRedirect} replace />;
  }

  return children;
};

export default PageRedirect;
