export interface user {
  id: number;
  nickname: string;
  email: string;
  password: string;
  image: string;
}

export interface signInInfo extends Pick<user, 'email'> {
  password: string;
}

export interface signUpInfo extends signInInfo {
  // email, password, name이 들어감
  nickname: string;
  image: string;
}

export interface sendEmail extends Pick<user, 'email'> {
  num?: number;
}

export interface newInfo extends Pick<user, 'id'> {
  newNickname?: string;
  password?: string;
  newPwd?: string;
  newImage?: string;
}
