import { IonAccordion, IonAccordionGroup, IonButton, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api';

import { closeCircleOutline } from 'ionicons/icons';
import { ActionItem, Drone } from '../../components/common/Drone';
import { ChipsFilter } from '../../components/inputs/ChipsFilter';
import { HiveSelectionContext } from '../../contexts/HiveSelectionContext';
import { Apiary, HiveModels, HiveModelsLabels, HiveStrengths, HiveStrengthsLabels, HiveTypes, HiveTypesLabels, emptyApiary } from '../../models';
import Page from '../Page';
import { ApiaryPlan, Highlight } from './plan/ApiaryPlan';


export const ApiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [apiary, setApiary] = useState<Apiary>(emptyApiary());
  const [typeFilter, setTypeFilter] = useState<number | null>(null);
  const [motherFilter, setMotherFilter] = useState<boolean | null>(null);
  const [broodFilter, setBroodFilter] = useState<boolean | null>(null);
  const [strengthFilter, setStrengthFilter] = useState<number | null>(null);
  const [superFilter, setSuperFilter] = useState<boolean | null>(null);
  const [modelFilter, setModelFilter] = useState<number | null>(null);
  const [sharedFilter, setSharedFilter] = useState<boolean | null>(null);
  const [currentHighlight, setCurrentHighlight] = useState<Highlight | null>(null);
  const [advices, setAdvices] = useState<ActionItem[]>([]);
  const [selectedHivesCount, setSelectedHivesCount] = useState(0);

  const highlightStrength = {
    prop: 'strength',
    colors: {
      0: 'red',
      1: 'orange',
      2: 'green'
    }
  }
  const hiveTypes = Object.keys(HiveTypes);
  const hiveModels = Object.keys(HiveModels);
  const hiveStrengths = Object.keys(HiveStrengths);


  function toggleHighlight(highlight: Highlight) {
    if (currentHighlight?.prop === highlight.prop) setCurrentHighlight(null);
    else setCurrentHighlight(highlight);
  }

  function clearFilters() {
    setTypeFilter(null);
    setMotherFilter(null);
    setBroodFilter(null);
    setStrengthFilter(null);
    setSuperFilter(null);
    setModelFilter(null);
    setSharedFilter(null);
    setCurrentHighlight(null);
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

    if (sharedFilter == true) {
      advices.push({ text: 'Прекрати споделянето на всички избрани', action: () => { } });
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
        <HiveSelectionContext.Provider value={{ selectedHivesCount, setSelectedHivesCount }}>
          <Drone advices={advices} selectedHivesCount={selectedHivesCount}></Drone>

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

                  <IonButton size="default" fill="clear">Избрани: {selectedHivesCount}</IonButton>
                </div>

                <IonAccordionGroup value={null} multiple={true} style={{ width: "250px" }}>

                  <IonAccordion value='highlight'>
                    <IonItem slot="header">
                      {currentHighlight?.prop === 'strength' ? 
                        <IonLabel color="primary"><strong>Оцвети според</strong> Сила</IonLabel>
                        :
                        <IonLabel color="primary">Оцвети според</IonLabel>
                      }
                    </IonItem>
                    <IonItem slot="content">
                      <IonChip
                        className={currentHighlight?.prop === 'strength' ? 'selected' : ''}
                        onClick={() => toggleHighlight(highlightStrength)}
                      >
                        Сила
                      </IonChip>
                    </IonItem>
                  </IonAccordion>

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
                    title='Пило'
                    filterValue={broodFilter}
                    setFilterValue={setBroodFilter}
                    items={[{ key: 'Без пило', value: 0 }, { key: 'С пило', value: 1 }]}
                  />

                  <ChipsFilter
                    title='Сила'
                    filterValue={strengthFilter}
                    setFilterValue={setStrengthFilter}
                    items={hiveStrengths.map((key, i) => {
                      return {
                        key: HiveStrengthsLabels[key], value: HiveStrengths[key]
                      }
                    })}
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

                  <ChipsFilter
                    title='Споделени'
                    filterValue={sharedFilter}
                    setFilterValue={setSharedFilter}
                    items={[{ key: 'Да', value: 1 }]}
                  />
                </IonAccordionGroup>
              </IonCol>
              <IonCol>
                <ApiaryPlan
                  apiary={apiary}
                  highlight={currentHighlight}
                  filters={[
                    { prop: 'type', value: typeFilter },
                    { prop: 'mother', value: motherFilter },
                    { prop: 'brood', value: broodFilter },
                    { prop: 'strength', value: strengthFilter },
                    { prop: 'super', value: superFilter },
                    { prop: 'model', value: modelFilter },
                    { prop: 'shared', value: sharedFilter },
                  ]}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </HiveSelectionContext.Provider>
      </Page>
    </>
  )
}
