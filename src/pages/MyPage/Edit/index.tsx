import { useRecoilState, useRecoilValue } from 'recoil';
import { EditPageWrapper, InputWrapper, SetUserImage, BtnBox, StopUser, Line } from './styles';
import { color } from '../../../recoil/Color/atom';
import Button from '../../../components/ui/Button';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import Input from '../../../components/ui/Input';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { userInfo } from '../../../recoil/User/atom';
import { changeImg, changeNickname, changePwd, changeUrl, setDormant, setWithdrawal } from '../../../api/user';
import { useMutation } from 'react-query';
import { Match, MisMatch } from '../../SignUp/styles';
import { useMessage } from '../../../hooks/useMessage';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';

interface ChangeInfo {
  newNickname: string;
  newPassword: string;
  checkPassword: string;
}

export default function Edit() {
  const { blue, lightPurple } = useRecoilValue(color);
  const { showMessage, contextHolder } = useMessage();

  const info = useRecoilValue(userInfo);
  const [newInfo, setNewInfo] = useRecoilState(userInfo);

  const [checkPw, setCheckPw] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const maxNumber = 1;
  const [changeInfo, setChangeInfo] = useState<ChangeInfo>({
    newNickname: '',
    newPassword: '',
    checkPassword: '',
  });

  const navigate = useNavigate();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof ChangeInfo) => {
      const temp = { ...changeInfo };
      temp[value] = e.target.value;

      if (value === 'newPassword') {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
        setIsValid(passwordRegex.test(e.target.value));
      }

      setChangeInfo(temp);
    },
    [changeInfo]
  );

  // 비밀번호 확인
  useEffect(() => {
    if (changeInfo.newPassword === changeInfo.checkPassword) {
      setCheckPw(true);
    } else setCheckPw(false);
  }, [changeInfo.newPassword, changeInfo.checkPassword]);

  // axios 통신
  const {
    mutate: sendNewNickname,
    data: newNicknameData,
    isSuccess: isNewNicknameSuccess,
  } = useMutation(changeNickname);

  const { mutate: sendNewPwd, data: newPasswordData, isSuccess: isNewPasswordSuccess } = useMutation(changePwd);

  const {
    mutate: changeImgMutate,
    data: imgUrl,
    isSuccess: isChangeUrlSuccess,
  } = useMutation(changeUrl, {
    onSuccess: () => setImages([]),
  });

  const { mutate: changeImage, data: newImageUrl, isSuccess: isChangeImageSuccess } = useMutation(changeImg);
  const onChangeImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
  };

  useEffect(() => {
    if (isNewNicknameSuccess && newNicknameData) {
      setNewInfo((prevInfo) => ({
        ...prevInfo,
        nickname: newNicknameData.nickname,
      }));
      showMessage('success', '닉네임이 변경되었습니다.');
    }
  }, [isNewNicknameSuccess, newNicknameData]);

  useEffect(() => {
    if (isNewPasswordSuccess && newPasswordData) {
      setNewInfo((prevInfo) => ({
        ...prevInfo,
        password: newPasswordData.password,
      }));
      showMessage('success', '비밀번호가 변경되었습니다.');
    }
  }, [isNewPasswordSuccess, newPasswordData]);

  useEffect(() => {
    if (isChangeUrlSuccess) {
      changeImage({ id: info.id, newImage: imgUrl.url });
    }
  }, [isChangeUrlSuccess]);

  useEffect(() => {
    if (isChangeImageSuccess) {
      setNewInfo((prevInfo) => ({
        ...prevInfo,
        image: newImageUrl.image,
      }));
      showMessage('success', '프로필 사진이 변경되었습니다.');
    }
  }, [isChangeImageSuccess]);

  const sendInfo = useCallback(() => {
    // console.log('유저 id' + info.id);

    if (images.length !== 0) {
      changeImgMutate({ image: images[0].file as File });
    }

    if (changeInfo.newNickname !== '') {
      sendNewNickname({ id: info.id, newNickname: changeInfo.newNickname });
    }

    if (changeInfo.newPassword !== '') {
      if (!checkPw) {
        showMessage('error', '비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!isValid) {
        showMessage('warning', '비밀번호 조건이 일치하지 않습니다.');
        return;
      } else {
        sendNewPwd({ id: info.id, password: info.password, newPwd: changeInfo.newPassword });
      }
    }
  }, [isValid, checkPw, changeInfo, newInfo, images]);

  const { mutate: dormantUser } = useMutation(setDormant, {
    onSuccess: () => {
      navigate('/signin');
    },
  });

  const { mutate: withDrawalUser } = useMutation(setWithdrawal, {
    onSuccess: () => {
      navigate('/signin');
    },
  });

  const onChangeStatus = useCallback((action: '휴면계정' | '회원탈퇴') => {
    if (action === '휴면계정') {
      const result = window.confirm('휴면계정으로 전환하시겠습니까?');

      if (result) {
        showMessage('success', '휴면계정 전환 완료');
        dormantUser(info.id);
        setNewInfo({ id: -1, nickname: '', email: '', password: '', image: '/images/userProfile.png' });
        localStorage.removeItem('accessToken');
      }

      // 휴면계정 전환 상태 처리
    } else if (action === '회원탈퇴') {
      const result = window.confirm('회원탈퇴 하시겠습니까?');

      if (result) {
        showMessage('success', '회원탈퇴 완료');
        withDrawalUser(info.id);
        setNewInfo({ id: -1, nickname: '', email: '', password: '', image: '/images/userProfile.png' });
        localStorage.removeItem('accessToken');
      }
      // 회원탈퇴 상태 처리
    }
  }, []);

  return (
    <EditPageWrapper>
      {contextHolder}
      <BaseBgBox>
        <SetUserImage>
          <div>프로필 수정</div>

          <ImageUploading
            acceptType={['jpg', 'jpeg', 'png']}
            value={images}
            onChange={onChangeImg}
            maxNumber={maxNumber}
          >
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
              <div>
                <img src={images.length >= 1 ? images[0].dataURL : info.image} alt="userProfile" />
                <Button
                  color={'#696969'}
                  bgColor={blue}
                  fontSize={1.3}
                  width={11}
                  height={3.5}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  사진 업로드
                </Button>
              </div>
            )}
          </ImageUploading>
        </SetUserImage>

        <InputWrapper>
          <BtnBox>
            <Button onClick={sendInfo} color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
              완료
            </Button>
          </BtnBox>

          <div>
            <span>이름</span>
            <Input
              type={'name'}
              value={changeInfo.newNickname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'newNickname')}
              placeholder={'새로운 닉네임'}
              width={25}
              height={2}
              size={1.3}
            />
          </div>

          <div>
            <span>비밀번호</span>
            <Input
              type={'password'}
              value={changeInfo.newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'newPassword')}
              placeholder={'새로운 비밀번호'}
              width={25}
              height={2}
              size={1.3}
            />
          </div>
          <Line>
            {changeInfo.newPassword &&
              (isValid ? (
                <Match>
                  <div />
                  사용가능한 비밀번호입니다.
                </Match>
              ) : (
                <MisMatch>
                  <div />
                  비밀번호는 8~15자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.
                </MisMatch>
              ))}
          </Line>

          <div>
            <span>비밀번호 확인</span>
            <Input
              type={'password'}
              value={changeInfo.checkPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'checkPassword')}
              placeholder={'비밀번호 확인'}
              width={25}
              height={2}
              size={1.3}
            />
          </div>
          <Line>
            {changeInfo.newPassword &&
              changeInfo.checkPassword &&
              (checkPw ? (
                <Match>
                  <div />
                  비밀번호가 일치합니다.
                </Match>
              ) : (
                <MisMatch>
                  <div />
                  비밀번호가 불일치합니다.
                </MisMatch>
              ))}
          </Line>

          <StopUser>
            <Button
              onClick={() => onChangeStatus('휴면계정')}
              color={'#696969'}
              bgColor={lightPurple}
              fontSize={1.3}
              width={12}
              height={3.5}
            >
              휴면계정 전환
            </Button>
            <Button
              onClick={() => onChangeStatus('회원탈퇴')}
              color={'#696969'}
              bgColor={lightPurple}
              fontSize={1.3}
              width={12}
              height={3.5}
            >
              회원탈퇴
            </Button>
          </StopUser>
        </InputWrapper>
      </BaseBgBox>
    </EditPageWrapper>
  );
}
