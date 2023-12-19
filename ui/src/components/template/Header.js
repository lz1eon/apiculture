import { ButtonAppBar } from "./CustomAppBar";
import { UserAppBar } from "./UserAppBar";
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { user } = useAuth();
  return user ? <UserAppBar/> : <ButtonAppBar/>;
}
