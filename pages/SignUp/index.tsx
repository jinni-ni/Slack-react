import useInput from '@hooks/useinput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from './styles';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  // const onChangeEmail = useCallback((e) => {
  //   setEmail(e.target.value);
  // }, []);
  //
  // const onChangeNickname = useCallback((e) => {
  //   setNickname(e.target.value);
  // }, []);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, nickname, password, passwordCheck);
      if (!mismatchError) {
        console.log('sign up to server');
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>????????? ??????</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>?????????</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>????????????</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>???????????? ??????</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
          {!nickname && <Error>???????????? ??????????????????.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
        </Label>
        <Button type="submit">????????????</Button>
      </Form>
      <LinkContainer>
        ?????? ???????????????????&nbsp;
        <Link to="/login">????????? ????????????</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
