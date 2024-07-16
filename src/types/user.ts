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
