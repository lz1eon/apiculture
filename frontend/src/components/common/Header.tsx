import { IonHeader } from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import AnonymousToolbar from "./AnonymousToolbar";
import UserToolbar from "./UserToolbar";

export const Header = () => {
  const { user } = useAuth();

  return (
    <IonHeader className="main">
      { user ? <UserToolbar /> : <AnonymousToolbar /> } 
    </IonHeader>
  );
}