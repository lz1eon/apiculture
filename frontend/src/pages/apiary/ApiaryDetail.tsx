import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRadio, IonRadioGroup, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import Page from '../Page';
import { ApiaryPlan } from './plan/ApiaryPlan';
import { HiveTypes, HiveTypesLabels, HiveModels, HiveModelsLabels } from '../../models';
import { ChipsGroup } from '../../components/inputs/ChipsGroup';

export const ApiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [apiary, setApiary] = useState<any>({});

  const hiveTypes = Object.keys(HiveTypes);
  const hiveModels = Object.keys(HiveModels);

  useEffect(() => {
    client.getApiary(id)
      .then((response) => {
        setApiary(response.data);
      });
  }, []);

  return (
    <>
      {/* <IonMenu contentId="apiary-plan">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu> */}

      <Page>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1><IonText>{apiary.name}</IonText></h1>
              {/* <IonMenuToggle>
                <IonButton>Click to open the menu</IonButton>
              </IonMenuToggle> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="auto">
              <IonAccordionGroup multiple={true} style={{width: "250px"}}>
                <IonAccordion value='first'>
                  <IonItem slot="header">
                    <IonLabel color="primary">Вид</IonLabel>
                  </IonItem>
                  <IonItem slot='content'>
                    <ChipsGroup items={hiveTypes.map((key, i) => {return {key: HiveTypesLabels[key], value: HiveTypes[key]}})}></ChipsGroup>
                  </IonItem>
                </IonAccordion>
                
                <IonAccordion value='second'>
                  <IonItem slot="header">
                    <IonLabel color="primary">Модел</IonLabel>
                  </IonItem>
                  <IonItem slot='content'>
                    <ChipsGroup items={hiveModels.map((key, i) => {return {key: HiveModelsLabels[key], value: HiveModels[key]}})}></ChipsGroup>
                  </IonItem>
                </IonAccordion>
              </IonAccordionGroup>
            </IonCol>
            <IonCol>
              <ApiaryPlan apiary={apiary} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </Page>
    </>
  )
}