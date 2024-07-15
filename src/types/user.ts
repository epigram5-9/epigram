export interface UserInfo {
  nickname: string;
  image: string;
  id: number;
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
}

export interface UserProfileProps {
  image: string;
  nickname: string;
}

export interface UserProfileEditProps {
  initialValues: {
    image: string;
    nickname: string;
  };
  onModalClose: () => void;
}

export interface UserFormikValues {
  image: string;
  nickname: string;
  file: File | null;
}
