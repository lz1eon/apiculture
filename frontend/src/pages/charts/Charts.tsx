import { IonCol, IonGrid, IonInput, IonRow, IonText, IonButton, InputCustomEvent, RangeCustomEvent, IonRange, IonChip, IonIcon, IonLabel, IonCardContent, IonCard } from '@ionic/react';
import { close } from 'ionicons/icons';
import { Histogram } from '../../components';
import Page from '../Page';
import data from '../../components/charts/apiaries';
import { useEffect, useRef, useState } from 'react';
import './charts.css';

const DOMAIN_UPPER_LIMIT = 650;

type Bin = {
  length: number;
  x0: number;
  x1: number;
}

type Group = {
  name: string;
  count: number;
  part: number;
  price: number;
}

type PriceModel = {
  name: string;
  thresholds: number[];
  groups: Group[];
  totalIncome: number;
  totalPeople: number;
}

function emptyGroup(): Group{
  return {name: '', count: 0, part: 10, price: 0};
}

function emptyBin(): Bin{
  return {length: 0, x0: 0, x1: 0};
}

function calcTotalIncome(model: PriceModel): number{
  let sum = 0;
  model.groups.forEach((g) => {sum += (g.count * (g.part / 10)  * g.price)});
  return sum;
}

function calcTotalPeople(model: PriceModel): number{
  let sum = 0;
  model.groups.forEach((g) => {sum += (g.count * (g.part / 10))});
  return sum;
}

function copyModel(model: PriceModel): PriceModel {
  return {
    name: model.name,
    thresholds: [...model.thresholds],
    groups: model.groups.map((g) => {return {name: g.name, count: g.count, part: g.part, price: g.price}}),
    totalIncome: model.totalIncome,
    totalPeople: model.totalPeople
  };
}

const formatNumber = (value: number, suffix: string = 'лв.') => {
  value = Math.round(value);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + suffix;
}


export const Charts = () => {
  const [currentModelName, setCurrentModelName] = useState('');

  // Controls the recalculation of the histogram
  const initialThresholds = [10, 20, 50, 100, 200, 300]
  const [thresholds, setThresholds] = useState(initialThresholds) 
  const [inputs, setInputs] = useState({ thresholds: '' });
  const thresholdsRef = useRef(null);

  // Current model
  const [currentModel, setCurrentModel] = useState<PriceModel>({
    name: '',
    thresholds: [...initialThresholds],
    groups: [emptyGroup(), ...initialThresholds.map(() => emptyGroup())],
    totalIncome: 0,
    totalPeople: 0,
  });
  
  // Bins
  const initialBins = [emptyBin(), ...currentModel.thresholds.map(() => {return emptyBin()})];
  const [computedBins, setComputedBins] = useState(initialBins);
  
  // Saved models
  const [savedModels, setSavedModels] = useState<PriceModel[]>([]);
  


  // Update current model when bins are re-computed.
  useEffect(() => {
    recalculateCurrentModel(computedBins);
  }, [computedBins]);

  // Get savedModels on page load
  useEffect(()=> {
    const models = localStorage.getItem('savedModels');
    if (models) {
      setSavedModels(JSON.parse(models));
    }
    
    if (thresholdsRef.current !== null && thresholdsRef.current !== undefined) {
      thresholdsRef.current.value = thresholds;
    }
    setInputs({thresholds: String(thresholds || '')});
  }, []);

  function recalculateCurrentModel(bins: Bin[]) {
    const updatedModel = copyModel(currentModel);
    const newGroups: Group[] = [];
    let newGroup: Group;

    bins.forEach((bin, i) => {
      const group = updatedModel.groups[i];
      if (group) {
        newGroup = {name: String(bin.x1), count: bin.length, part: group.part, price: group.price};
      } else {
        newGroup = emptyGroup();
        newGroup.name = String(bin.x1)
        newGroup.count = bin.length;
      }
      newGroups.push(newGroup)
    });
    
    updatedModel.groups = [...newGroups]
    updatedModel.totalIncome = calcTotalIncome(updatedModel);
    updatedModel.totalPeople = calcTotalPeople(updatedModel);
    setCurrentModel(updatedModel);
  }

  const handleModelNameChange = (event: InputCustomEvent) => {
    setCurrentModelName('');
  }

  const handleCurrentModelSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      modelName: { value: string };
    }    
    const modelName = target.modelName.value;
    e.target.reset();

    setCurrentModelName(modelName);
    currentModel.name = modelName;
    
    const models = [...savedModels];
    models.push(currentModel)
    setSavedModels(models);

    localStorage.setItem('savedModels', JSON.stringify(models));
  }

  const handlePriceChange = (event: InputCustomEvent) => {
    const index = Number(event.target.getAttribute('id'));
    
    const newGroups = [...currentModel.groups];
    newGroups[index].price = Number(event.target.value);
    
    const newModel = copyModel(currentModel);
    newModel.groups = newGroups;
    newModel.totalIncome = calcTotalIncome(newModel);
    setCurrentModel(newModel);

    setCurrentModelName('');
  }

  const handleRangeChange = (event: RangeCustomEvent) => {
    const index = Number(event.target.getAttribute('id'));

    const newGroups = [...currentModel.groups];
    newGroups[index].part = Number(event.detail.value);
    
    const newModel = copyModel(currentModel);
    newModel.groups = newGroups;
    newModel.totalPeople = calcTotalPeople(newModel);
    newModel.totalIncome = calcTotalIncome(newModel);
    setCurrentModel(newModel);

    setCurrentModelName('');
  }

  const handleThresholdsChange = (event: InputCustomEvent) => {
    setInputs({thresholds: String(event.target.value || '')});
    // TODO: set model.thresholds
    
    setCurrentModelName('');
  }

  const recalulateHistogram = (event: React.FormEvent) => {
    event.preventDefault();
    const inputThresholds = inputs.thresholds.split(',').map((t: string) => Number(t));
    
    // update model's thresholds
    const newModel = copyModel(currentModel);
    newModel.thresholds = inputThresholds;
    setCurrentModel(newModel);
    
    // trigger histogram recalculation
    setThresholds([...newModel.thresholds]);
  }

  const loadModel = (model: PriceModel) => {   
    if (thresholdsRef.current !== null && thresholdsRef.current !== undefined) {
      thresholdsRef.current.value = model.thresholds;
    } 
    setInputs({thresholds: model.thresholds.map((t) => String(t)).join(',')});
    setCurrentModel(model);
    setCurrentModelName(model.name);
    setThresholds(model.thresholds);   
  }

  const removeModel = (model: PriceModel) => {
    let models = [...savedModels];
    models = models.filter((m, i) => m.name !== model.name);
    setSavedModels(models);
    localStorage.setItem('savedModels', JSON.stringify(models));
  }

  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol>
            <form onSubmit={handleCurrentModelSave}>
              <IonCard>
                <IonCardContent>
                <IonGrid>
                <IonRow>
                  <IonCol size='auto'><IonText><h1>Ценови модел</h1></IonText></IonCol>
                  <IonCol>                    
                      {savedModels.map((savedModel, i) => {
                        return (
                          <IonChip 
                            key={i} 
                            className={currentModelName === savedModel.name ? 'active' : ''}
                            onClick={() => loadModel(savedModel)}
                          >
                            <IonLabel>
                              {savedModel.name} 
                              <br/>
                              <IonText style={{color: 'green'}}>{formatNumber(savedModel.totalIncome)}</IonText>
                            </IonLabel>
                            <IonIcon icon={close} onClick={() => removeModel(savedModel)}></IonIcon>
                          </IonChip>
                        )
                      })}                    
                  </IonCol>                  
                  <IonCol size='auto'>
                    <div style={{ width: '200px' }}>
                      <IonButton size="small" type="submit">Запази нов модел</IonButton>
                    </div>
                  </IonCol>
                  <IonCol size="auto">
                    <div style={{ width: '200px' }}>
                      <IonInput
                        className='input'
                        required={true}
                        type="text"
                        name="modelName"
                        label="Име на модела"
                        labelPlacement='stacked'
                        onIonInput={handleModelNameChange}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
                </IonCardContent>
              </IonCard>
            </form> 
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <Histogram
              width={600}
              height={400}
              data={data}
              thresholds={thresholds}
              setComputedBins={setComputedBins}
            ></Histogram>
          </IonCol>
          <IonCol className='histogram-parameters'>
            <form onSubmit={recalulateHistogram}>
              <IonGrid style={{ height: '300px' }}>
                <IonRow>
                  <IonCol size="auto">
                    <div style={{ width: '200px' }}>
                      <IonInput
                        ref={thresholdsRef}
                        className='input'
                        type="text"
                        name="thresholds"
                        label='Групиране'
                        labelPlacement='stacked'
                        onIonInput={handleThresholdsChange} />
                      <IonButton size="small" type="submit" onClick={recalulateHistogram}>Обнови групите</IonButton>
                    </div>
                  </IonCol>
                  <IonCol>
                    <IonInput
                      className='input'
                      type="text"
                      value={formatNumber(currentModel.totalPeople, ' ')}
                      readonly={true}
                      label='Общо пчелини'
                      labelPlacement='floating' />
                  </IonCol>
                  <IonCol>
                    <IonInput
                      className='input money'
                      type="text"
                      value={formatNumber(currentModel.totalIncome)}
                      readonly={true}
                      label='Общо приходи'
                      labelPlacement='floating' />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      {currentModel.groups.map((group, i) => {
                        return (
                          <IonRow key={i}>
                            <IonCol>
                              <IonRange
                                min={0}
                                max={10}
                                value={group.part}
                                ticks={true}
                                snaps={true}
                                label={`Група ${group.name} (${group.part * 10})%`}
                                labelPlacement='stacked'
                                id={`${i}`}
                                onIonChange={handleRangeChange}
                              ></IonRange>
                            </IonCol>
                            <IonCol size="auto">
                              <div style={{ width: '100px' }}>{ }</div>
                            </IonCol>
                            <IonCol size="auto">
                              <div style={{ width: '60px' }}>
                                <IonInput
                                  className='input'
                                  type="number"
                                  name={`apiary-count-${group.name}`}
                                  value={group.count * (group.part / 10)}
                                  label='Пчелини'
                                  labelPlacement='stacked'
                                  disabled={true}
                                />
                              </div>
                            </IonCol>
                            <IonCol size="auto">
                              <div style={{ width: '50px' }}>
                                <IonInput
                                  className='input'
                                  type="number"
                                  min={0}
                                  value={group.price}
                                  name={`price-${group.name}`}
                                  label={`Цена`}
                                  labelPlacement='stacked'
                                  id={`${i}`}
                                  onIonInput={handlePriceChange}
                                />
                              </div>
                            </IonCol>
                            <IonCol size="auto">
                              <div style={{ width: '100px' }}>
                                <IonInput
                                  className='input money'
                                  type="text"
                                  name={`income-${group.name}`}
                                  value={formatNumber(group.count * (group.part / 10) * group.price)}
                                  label={`Приходи`}
                                  labelPlacement='stacked'
                                  readonly={true}
                                />
                              </div>
                            </IonCol>
                          </IonRow>
                        )
                      })}
                      <IonRow style={{ float: 'right' }}>
                        <IonCol>
                          <IonInput
                            className='input'
                            type="text"
                            value={formatNumber(currentModel.totalPeople, ' ')}
                            readonly={true}
                            label='Общо пчелини'
                            labelPlacement='floating' />
                        </IonCol>
                        <IonCol>
                          <IonInput
                            className='input money'
                            type="text"
                            value={formatNumber(currentModel.totalIncome)}
                            readonly={true}
                            label='Общо приходи'
                            labelPlacement='floating' />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  )
};
