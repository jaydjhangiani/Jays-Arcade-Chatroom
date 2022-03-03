import { auth } from "../firebase";
// import logo from '../assets/img/releaf.jpg'
import styled from "styled-components";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => alert(e.message));
  };

  return (
    <LoginContainer>
      {/* <LoginImg src={logo} alt="Releaf"/> */}
      {/* <h1>Welcome to the Chat Room</h1> */}
      <FormContent>
        <Form action="#">
          {/* <FormH1>Jay's Arcade Chat Room</FormH1> */}
          <FormH1>The Reto Arcade Chat Room</FormH1>
          <FormLabel htmlFor="for">Email</FormLabel>
          <FormInput
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel htmlFor="for">Password</FormLabel>
          <FormInput
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButton onClick={handleSignIn} type="submit">
            Continue
          </FormButton>
          <Text href="https://jays-arcade-2eec1.firebaseapp.com/">
            Don't have an account? Sign up!
          </Text>
        </Form>
      </FormContent>
      {/* <Button onClick={handleSignIn}>Sign In</Button> */}
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  /* display: grid; */
  height: 100vh;
  width: 100%;
  /* background-color: #7887CB; */
  background: #010101;
`;

const Text = styled.a`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;

const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  background-color: #7887cb;
  max-width: 400px;
  height: auto;
  /* width: 100%; */
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  @media screen and (max-width: 480px) {
    padding: 32px 32px;
  }
`;

const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
`;

const FormButton = styled.button`
  /* background: #01bf71; */
  background: #1a237e;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

// const Button = styled.button`
//     width: 300px;
//     background-color: #3ea4fb;
//     color: #eff2f5;
//     font-weight: 800;
//     height: 50px;
//     outline: none;
//     border: none;
//     border-radius: 5px;

//     :hover{
//         background-color: whitesmoke;
//         color: #3ea4fb;
//         border: 1px solid #3ea4fb;
//     }
// `;
