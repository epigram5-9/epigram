export interface HeaderProps {
  icon: 'back' | 'search' | '';
  routerPage: string;
  isLogo: boolean;
  insteadOfLogo: string;
  isProfileIcon: boolean;
  isShareIcon: boolean;
  isButton: boolean;
  textInButton: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
