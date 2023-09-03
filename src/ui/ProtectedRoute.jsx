/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { styled } from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Loading authenticated User
  const { isLoading, isAuthenticated } = useUser();

  // If no authenticated user redirected to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  // Loading a spinner while authenticating user
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // render app if user is authenticated
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
