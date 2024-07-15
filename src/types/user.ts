export interface UserInfo {
  nickname: string;
  image: string;
  id: number;
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
}

export interface UserProfileProps {
  profileImage: string;
  nickname: string;
}

export interface UserProfileEditProps {
  initialValues: {
    profileImage: string;
    nickname: string;
  };
  onModalClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UserFormikValues {
  profileImage: string;
  nickname: string;
  file: File | null;
}
