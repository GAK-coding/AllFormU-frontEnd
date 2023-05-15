import React, { ChangeEvent, useCallback, useEffect } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { Form, LoginBtn, LoginLine, PageInfo } from '../SignUp/styles';
import Input from '../../components/ui/Input';
import { signInInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';
import { userInfo, signInUserInfo } from '../../recoil/User/atom';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { useMutation } from 'react-query';
import { signIn } from '../../api/user';

export default function SignIn() {
  const { blue } = useRecoilValue(color);
  const [userInput, setUserInput] = useRecoilState(signInUserInfo);
  const { email, password } = useRecoilValue(signInUserInfo);
  const setUserInfo = useSetRecoilState(userInfo);
  const setUser = useRecoilValue(userInfo);
  const navigate = useNavigate();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...userInput };
      temp[value] = e.target.value;

      setUserInput(temp);
    },
    [userInput]
  );

  const { mutate, data, isSuccess } = useMutation(signIn, {
    onSuccess: (data) => {
      const infoList = { id: data.id, nickname: data.nickname, email: data.email, password: data.password };
      setUserInfo(infoList);
      // console.log(setUser.id);
      // console.log(setUser.nickname);
      // console.log(setUser.email);
    },
  });

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate({ email, password });
    },
    [email, password]
  );

  useEffect(() => {
    if (isSuccess) {
      const infoList = { id: data.id, nickname: data.nickname, email: data.email, password: data.password };
      setUserInfo(infoList);
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <BaseBgBox>
      <PageInfo>
        <div>Sign In</div>
        <div>
          <img src="/images/logo.png" alt="logo" />
          <span>All Form U</span>
        </div>
      </PageInfo>
      <Form onSubmit={onClick}>
        <LoginLine>
          <span>Email</span>
          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={'50%'}
            height={2}
            size={1.5}
          />
        </LoginLine>
        <LoginLine>
          <span>Password</span>

          <Input
            type={'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
            placeholder={'비밀번호'}
            width={'50%'}
            height={2}
            size={1.5}
          />
        </LoginLine>
        <LoginLine>
          <div onClick={() => navigate('/signin/findpassword')}>비밀번호 찾기</div>
        </LoginLine>
        <LoginBtn>
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={11} height={4}>
            로그인
          </Button>

          {/* <GoogleAuth clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} /> */}

          <Button
            onClick={() => navigate('/signup')}
            type={'button'}
            color={'black'}
            bgColor={blue}
            fontSize={1.5}
            width={15}
            height={4}
          >
            회원가입
          </Button>
        </LoginBtn>
      </Form>
    </BaseBgBox>
  );
}
