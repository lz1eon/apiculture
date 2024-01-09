import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonText } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import mainImage from '../../../assets/images/bee.jpg';
import apiarium_3 from '../../../assets/videos/apiarium_3.mp4';
import apiarium_2 from '../../../assets/videos/apiarium_2.mp4';
import Page from '../../Page';
import './home.css';
import { checkmark } from 'ionicons/icons';
import RegisterForm from '../register/RegisterForm';

export const Home = () => {
  const { isAuthReady, user } = useAuth();

  return !isAuthReady ? '' : (
    user ? <Redirect to='/apiaries' /> : (
      <Page>
        <IonGrid className="ion-margin ion-padding">
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><h1>Пчелинът</h1></IonCardTitle>
                  <IonCardSubtitle><h3>Управлявай бързо и лесно своя пчелин!</h3></IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <video width="100%" loop={true} autoPlay={true} muted>
                          <source src={apiarium_3} type="video/mp4"></source>
                        </video>
                      </IonCol>
                      <IonCol>
                        <IonList lines='none'>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Обзорен поглед върху пчелина
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Бързо избиране на кошери по различни показатели
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Изпълняване на действие върху избраните кошери едновременно
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Редактиране на схемата на пчелина
                          </IonItem>
                        </IonList>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>


              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><IonText><h1>Споделяне</h1></IonText></IonCardTitle>
                  <IonCardSubtitle><IonText><h3>Потърси помощ от приятел или специалист</h3></IonText></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonList lines='none'>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Сподели данните за кошера с приятел 
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Добавяй коментар по споделените кошери
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Спри споделянето по всяко време
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Анонимно споделяне с хора извън Пчелинът
                          </IonItem>
                        </IonList>
                      </IonCol>
                      <IonCol>
                        <video width="100%" loop={true} autoPlay={true} muted>
                          <source src={apiarium_2} type="video/mp4"></source>
                        </video>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><IonText><h1>Създай акаунт</h1></IonText></IonCardTitle>
                  {/* <IonCardSubtitle><IonText><h3>Пчелинът е безплатен за до 10 кошера</h3></IonText></IonCardSubtitle> */}
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonList lines='none'>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Завинаги безплатен до 10 кошера
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            1 месец пробен период за неограничен брой кошери
                          </IonItem>
                          <IonItem>
                            <IonIcon src={checkmark} color='success' />
                            Изтеглете данните си и закрийте акаунта си по всяко време
                          </IonItem>
                        </IonList>
                      </IonCol>
                      <IonCol>
                        <IonButton color="success">Създай безплатен акаунт</IonButton>
                        <IonButton>Бързо пробване с демо акаунт</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>

            </IonCol>
          </IonRow>
        </IonGrid>
      </Page>
    )
  )
};