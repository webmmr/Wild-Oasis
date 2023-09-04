import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />

      <LoginForm />
      <div>
        <p>For Testing</p>
        <p>Email: admin@test.com</p>
        <p>Password: password1234</p>
      </div>
    </LoginLayout>
  );
}

export default Login;
