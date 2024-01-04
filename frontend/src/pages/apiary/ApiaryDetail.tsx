import { IonAccordionGroup, IonButton, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import { ChipsFilter } from '../../components/inputs/ChipsFilter';
import { HiveModels, HiveModelsLabels, HiveTypes, HiveTypesLabels } from '../../models';
import Page from '../Page';
import { ApiaryPlan } from './plan/ApiaryPlan';
import { ActionItem, Drone } from '../../components/common/Drone';
import { arrowDown, arrowDownCircle, arrowDownCircleOutline, arrowDownOutline, arrowDownSharp, arrowUp, chevronDownOutline, chevronUpOutline, closeCircle, closeCircleOutline } from 'ionicons/icons';

export const ApiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [apiary, setApiary] = useState<any>({});
  const [typeFilter, setTypeFilter] = useState<number | null>(null);
  const [motherFilter, setMotherFilter] = useState<boolean | null>(null);
  const [superFilter, setSuperFilter] = useState<boolean | null>(null);
  const [modelFilter, setModelFilter] = useState<number | null>(null);
  const [advices, setAdvices] = useState<ActionItem[]>([]);

  const hiveTypes = Object.keys(HiveTypes);
  const hiveModels = Object.keys(HiveModels);


  function toggleFilters() {

  }

  function clearFilters() {
    setTypeFilter(null);
    setMotherFilter(null);
    setSuperFilter(null);
    setModelFilter(null);
  }

  useEffect(() => {
    client.getApiary(id)
      .then((response) => {
        setApiary(response.data);
      });
  }, []);

  useEffect(() => {
    const advices = [];

    if (motherFilter == false) {
      advices.push({ text: 'Добави майка на избраните', action: () => { } });
      advices.push({ text: 'Създай задача за поставяне на майка', action: () => { } });
    }

    if (superFilter == false) {
      advices.push({ text: 'Добави магазин на избраните', action: () => { } });
      advices.push({ text: 'Създай задача за поставяне на магазин', action: () => { } });
    } else if (superFilter == true) {
      advices.push({ text: 'Свали магазините на избраните', action: () => { } });
      advices.push({ text: 'Създай задача за сваляне на магазините', action: () => { } });
    }

    setAdvices(advices);

  }, [motherFilter, superFilter]);

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
        <Drone advices={advices}></Drone>

        <IonGrid>
          <IonRow>
            <IonCol>
              <h1><IonText style={{ userSelect: 'none' }}>{apiary.name}</IonText></h1>
              {/* <IonMenuToggle>
                <IonButton>Click to open the menu</IonButton>
              </IonMenuToggle> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="auto">
              <div className="apis-filters-controls">
                <IonButton
                  size="small"
                  fill='outline'
                  style={{ float: 'left' }}
                  onClick={clearFilters}
                >
                  <IonIcon
                    title='Изчисти филтрите'
                    src={closeCircleOutline}
                  >
                  </IonIcon>
                </IonButton>
              </div>

              <IonAccordionGroup value={null} multiple={true} style={{ width: "250px" }}>
                <ChipsFilter
                  title='Вид'
                  filterValue={typeFilter}
                  setFilterValue={setTypeFilter}
                  items={hiveTypes.map((key, i) => {
                    return {
                      key: HiveTypesLabels[key], value: HiveTypes[key]
                    }
                  })}
                />

                <ChipsFilter
                  title='Майка'
                  filterValue={motherFilter}
                  setFilterValue={setMotherFilter}
                  items={[{ key: 'Без майка', value: 0 }, { key: 'С майка', value: 1 }]}
                />

                <ChipsFilter
                  title='Магазин'
                  filterValue={superFilter}
                  setFilterValue={setSuperFilter}
                  items={[{ key: 'Без магазин', value: 0 }, { key: 'С магазин', value: 1 }]}
                />

                <ChipsFilter
                  title='Модел'
                  filterValue={modelFilter}
                  setFilterValue={setModelFilter}
                  items={hiveModels.map((key, i) => {
                    return { key: HiveModelsLabels[key], value: HiveModels[key] }
                  })}
                />
              </IonAccordionGroup>
            </IonCol>
            <IonCol>
              <ApiaryPlan
                apiary={apiary}
                filters={[
                  { prop: 'type', value: typeFilter },
                  { prop: 'mother', value: motherFilter },
                  { prop: 'super', value: superFilter },
                  { prop: 'model', value: modelFilter }
                ]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </Page>
    </>
  )
}