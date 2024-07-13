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
  profileImage: string;
  nickname: string;
  onModalClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
