import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react"
import { TabView, TabPanel } from 'primereact/tabview';
import Page from '../Page';
import { Hive } from "../../models";
import { HiveComponent } from "../../components";
import { useEffect, useState } from "react";
import client from "../../api";


export const Shared = () => {
  const [mySharedHives, setMySharedHives] = useState<Hive[]>([]);
  const [sharedWithMe, setSharedWithMe] = useState<Hive[]>([]);

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
              <TabPanel header="Кои съм споделил">
                <p className="m-0">

                  {mySharedHives.length > 0 ?
                    mySharedHives.map((myHive, i) => {
                      return <HiveComponent key={i} hive={myHive} />
                    })
                    :
                    <IonLabel>Не сте споделил кошери с никого.</IonLabel>
                  }
                </p>
              </TabPanel>
              <TabPanel header="Споделени с мен">
                <p className="m-0">
                  {sharedWithMe.length > 0 ?
                    sharedWithMe.map((sharedHive, i) => {
                      return <HiveComponent key={i} hive={sharedHive} />
                    })
                    :
                    <IonLabel>Никой не е споделил кошери с Вас.</IonLabel>
                  }
                </p>
              </TabPanel>
            </TabView>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>

  )
}