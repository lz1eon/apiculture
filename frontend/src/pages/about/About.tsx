import { IonList, IonItem, IonLabel } from "@ionic/react"
import MainContainer from "../../components/MainContainer"

export const About = () => {
    return (
        <MainContainer>        
            <IonLabel>За Пчелинът</IonLabel>
            <IonLabel>Как Пчелинът може да Ви бъде полезен</IonLabel>
            <IonList>
                <IonItem>Бързо и лесно въвеждане на информация от полевата работа</IonItem>
                <IonItem>Споделяне на информация за пчелните семейства с цел онлайн консултация</IonItem>
                <IonItem>Споделяне на информация относно болести и пръскане с инсектициди с другите потребители</IonItem>
            </IonList>
        </MainContainer>
    )
}