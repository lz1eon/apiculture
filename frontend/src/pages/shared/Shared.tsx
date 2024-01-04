import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react"
import { TabView, TabPanel } from 'primereact/tabview';
import Page from '../Page';
import { Hive, SharedHive } from "../../models";
import { HiveComponent } from "../../components";
import { useEffect, useState } from "react";
import client from "../../api";


export const Shared = () => {
  const [mySharedHives, setMySharedHives] = useState<SharedHive[]>([]);
  const [sharedWithMe, setSharedWithMe] = useState<SharedHive[]>([]);

  useEffect(() => {
    client.getMySharedHives()
      .then((response) => setMySharedHives(response.data));

    client.getSharedWithMe()
      .then((response) => setSharedWithMe(response.data));
  }, []);

  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonText><h3>Споделени кошери</h3></IonText>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

            <TabView>
              <TabPanel header={`Кои съм споделил (${mySharedHives.length})`}>
                <p className="m-0">
                  <IonGrid className="my-shared-hives">
                    <IonRow>
                      {mySharedHives.length > 0 ?
                        mySharedHives.map((myShared, i) => {
                          return <IonCol key={i} size="4"><HiveComponent sharedHive={myShared} /></IonCol>
                        })
                        :
                        <IonCol><IonLabel>Не сте споделил кошери с никого.</IonLabel></IonCol>
                      }
                    </IonRow>
                  </IonGrid>
                </p>
              </TabPanel>

              <TabPanel header={`Споделени с мен (${sharedWithMe.length})`}>
                <p className="m-0">
                  <IonGrid className="hive-shared-with-me">
                    <IonRow>
                      {sharedWithMe.length > 0 ?
                        sharedWithMe.map((sharedHive, i) => {
                          return <IonCol key={i} size="4"><HiveComponent sharedHive={sharedHive} /></IonCol>
                        })
                        :
                        <IonCol><IonLabel>Никой не е споделил кошери с Вас.</IonLabel></IonCol>
                      }
                    </IonRow>
                  </IonGrid>

                </p>
              </TabPanel>
            </TabView>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>

  )
}