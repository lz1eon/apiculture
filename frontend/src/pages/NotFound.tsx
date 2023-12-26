import { IonButton } from "@ionic/react";
import { MainContainer } from '../components';
import Page from './Page';

export const NotFound = () => {
    return (
        <Page>
            <h1 className={'text-7xl font-bold'}>404</h1>
            <p className={'md:text-lg text-center mt-6'}>Страницата, която търсите не съществува.</p>
            <IonButton routerLink='/'>Начало</IonButton>
        </Page>
    )
}