import { IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonList, IonToolbar } from "@ionic/react";
import { colorPalette, settings } from "ionicons/icons";
import { useAuth } from "../../hooks/useAuth";
import PageHeaderTitle from "./ToolbarTitle";
import { useRef } from "react";
import { Menu } from "primereact/menu";

const UserToolbar = () => {
  const { logoutUser } = useAuth();
  const menuPalette = useRef(null);

  const handleLogout = () => {
    logoutUser();
  }

  function changeTheme(theme: string) {
    console.log(theme)
  }

  function itemTemplate(color: string, label: string) {
    return (
      <IonList lines="none">
        <IonItem style={{ cursor: 'pointer' }} onClick={() => changeTheme(color)}>
          <IonIcon className="ion-margin" size="large" icon={colorPalette} style={{ color: color }}></IonIcon>
          <IonLabel>{label}</IonLabel>
        </IonItem>
      </IonList>
    )
  }

  const themes = [
    { template: () => { return itemTemplate('blue', 'Синя') } },
    { template: () => { return itemTemplate('green', 'Зелена') } },
    { template: () => { return itemTemplate('orange', 'Жълта') } },
  ]

  const togglePaletteMenu = (event: React.MouseEvent<HTMLElement>) => {
    const node = menuPalette.current;
    if (node) node.toggle(event)
  }

  return (
    <>
      <IonToolbar className="toolbar" color="primary">
        <PageHeaderTitle />
        <IonButtons slot="start">
          <IonButton routerLink="/apiaries">Пчелини</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton routerLink="/admin">Админ</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton
            id="palette-button"
            aria-controls="palette-menu"
            aria-haspopup
            onClick={togglePaletteMenu}
          >
            <IonIcon slot="icon-only" icon={colorPalette}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton onClick={handleLogout}>Изход</IonButton>
        </IonButtons>
      </IonToolbar>

      <Menu ref={menuPalette} id='palette-menu' model={themes} popup />

    </>
  )
}

export default UserToolbar;