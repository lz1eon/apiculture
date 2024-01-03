import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRadio, IonRadioGroup, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import Page from '../Page';
import { ApiaryPlan } from './plan/ApiaryPlan';
import { HiveTypes, HiveTypesLabels, HiveModels, HiveModelsLabels } from '../../models';
import { ChipsFilter } from '../../components/inputs/ChipsFilter';

export const ApiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [apiary, setApiary] = useState<any>({});
  const [typeFilter, setTypeFilter] = useState<number | null>(null);
  const [motherFilter, setMotherFilter] = useState<boolean | null>(null);
  const [superFilter, setSuperFilter] = useState<boolean | null>(null);
  const [modelFilter, setModelFilter] = useState<number | null>(null);

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
                <ChipsFilter 
                  title='Вид'
                  filterValue={typeFilter}
                  setFilterValue={setTypeFilter}
                  items={hiveTypes.map((key, i) => {
                    return {key: HiveTypesLabels[key], value: HiveTypes[key]
                  }})}
                />

                <ChipsFilter 
                  title='Майка' 
                  filterValue={motherFilter}
                  setFilterValue={setMotherFilter}
                  items={[{key: 'Без майка', value: 0}, {key: 'С майка', value: 1}]}
                />
            
                <ChipsFilter 
                  title='Магазин' 
                  filterValue={superFilter}
                  setFilterValue={setSuperFilter}
                  items={[{key: 'Без магазин', value: 0}, {key: 'С магазин', value: 1}]}
                />
                        
                <ChipsFilter 
                  title='Модел' 
                  filterValue={modelFilter}
                  setFilterValue={setModelFilter}
                  items={hiveModels.map((key, i) => {
                    return {key: HiveModelsLabels[key], value: HiveModels[key]}
                  })}
                />
              </IonAccordionGroup>
            </IonCol>
            <IonCol>
              <ApiaryPlan 
                apiary={apiary} 
                filters={[
                  {prop: 'type', value: typeFilter}, 
                  {prop: 'mother', value: motherFilter},
                  {prop: 'super', value: superFilter}, 
                  {prop: 'model', value: modelFilter}
                ]} 
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </Page>
    </>
  )
}