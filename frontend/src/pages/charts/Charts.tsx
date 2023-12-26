import { IonCol, IonGrid, IonInput, IonRow, IonText, IonButton, InputCustomEvent, RangeCustomEvent, IonRange, IonChip, IonIcon, IonLabel } from '@ionic/react';
import { close } from 'ionicons/icons';
import { Histogram } from '../../components';
import Page from '../Page';
import data from '../../components/charts/apiaries';
import { useEffect, useState } from 'react';
import './charts.css';

type PriceModel = {
  name: string;
  thresholds: number[];
  prices: number[];
  parts: number[];
}

export const Charts = () => {
  const [thresholds, setThresholds] = useState([50, 100, 200, 300]);
  const [computedBins, setComputedBins] = useState([{ length: 0 }, { length: 0 }, { length: 0 }, { length: 0 }, { length: 0 }]);
  const [inputs, setInputs] = useState({ thresholds: '' });
  const zeros_array: number[] = computedBins.map((e, i) => 0);
  const [prices, setPrices] = useState(zeros_array);
  const tens_array: number[] = computedBins.map((e, i) => 10);
  const [parts, setParts] = useState(tens_array);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [modelName, setModelName] = useState('');
  const [savedModels, setSavedModels] = useState<PriceModel[]>([]);


  const formatNumber = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' лв.';

  const handleChange = (event: InputCustomEvent) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  }

  const handleModelNameChange = (event: InputCustomEvent) => {
    setModelName(String(event.target.value));
  }

  const saveCurrentModel = (event: React.FormEvent) => {
    event.preventDefault();

    const model: PriceModel = {
      name: modelName,
      thresholds: thresholds,
      prices: prices,
      parts: parts
    };

    const models = [...savedModels];
    models.push(model)
    setSavedModels(models);

    event.target.reset();
  }

  const loadModel = (model: PriceModel) => {
    setThresholds(model.thresholds);
    setPrices(model.prices);
    setParts(model.parts)
  }

  const removeModel = (model: PriceModel) => {
    let models = [...savedModels];
    models = models.filter((m, i) => m.name !== model.name);

    setSavedModels(models);
  }

  const handlePriceChange = (event: InputCustomEvent) => {
    const index = Number(event.target.getAttribute('id'));
    const newPrices = [...prices];
    newPrices[index] = Number(event.target.value);
    setPrices(newPrices);
  }

  const handleRangeChange = (event: RangeCustomEvent) => {
    const index = Number(event.target.getAttribute('id'));
    const newParts = [...parts];
    newParts[index] = Number(event.detail.value);
    setParts(newParts);
  }

  const recalulateHistogram = (event: React.FormEvent) => {
    event.preventDefault();
    const inputThresholds = inputs.thresholds.split(',').map((t: string) => Number(t));
    console.log(inputThresholds);

    const initialPrices = (inputThresholds.map(() => 0))
    initialPrices.push(0) // for the last implicit bin
    setPrices(initialPrices);
    console.log(initialPrices, prices);

    const initialParts = (inputThresholds.map(() => 10))
    initialParts.push(10) // for the last implicit bin
    setParts(initialParts);
    console.log(initialParts, parts);

    setThresholds(inputThresholds);
  }

  useEffect(() => {
    if (computedBins.length > 0) {
      const value = computedBins
        .map((bin, i) => bin.length * (parts[i] / 10) * prices[i])
        .reduce((sum, v) => sum + v);
      setTotalIncome(value)

      const people = computedBins
        .map((bin, i) => bin.length * (parts[i] / 10))
        .reduce((sum, v) => sum + v);
      setTotalPeople(people)
    }
  }, [computedBins, prices, parts]);

  return (
    <Page>
      <IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol><IonText><h1>Ценови модел</h1></IonText></IonCol>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <form onSubmit={saveCurrentModel}>
              <IonGrid>
                <IonRow>
                  <IonCol>                    
                      {savedModels.map((model, i) => {
                        return (
                          <IonChip key={i} onClick={() => loadModel(model)}>
                            <IonLabel>{model.name}</IonLabel>
                            <IonIcon icon={close} onClick={() => removeModel(model)}></IonIcon>
                          </IonChip>
                        )
                      })}                    
                  </IonCol>                  
                  <IonCol size='auto'>
                    <div style={{ width: '200px' }}>
                      <IonButton size="small" type="submit">Запази модела</IonButton>
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
                        onIonChange={handleModelNameChange}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
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
              computedBins={computedBins}
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
                        className='input'
                        placeholder='50, 100, 200, 300'
                        type="text"
                        name="thresholds"
                        label='Групиране'
                        labelPlacement='stacked'
                        onIonInput={handleChange} />
                      <IonButton size="small" type="submit" onClick={recalulateHistogram}>Обнови групите</IonButton>
                    </div>
                  </IonCol>
                  <IonCol>
                    <IonInput
                      className='input'
                      type="text"
                      value={Math.round(totalPeople)}
                      readonly={true}
                      label='Общо хора'
                      labelPlacement='floating' />
                  </IonCol>
                  <IonCol>
                    <IonInput
                      className='input money'
                      type="text"
                      value={formatNumber(Math.round(totalIncome))}
                      readonly={true}
                      label='Общо приходи'
                      labelPlacement='floating' />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      {computedBins.map((bin, i) => {
                        return (
                          <IonRow key={i}>
                            <IonCol>
                              <IonRange
                                min={0}
                                max={10}
                                value={parts[i]}
                                ticks={true}
                                snaps={true}
                                label={`Група ${bin.x1} (${parts[i] * 10})%`}
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
                                  name={`apiary-number-${computedBins[i]?.length}`}
                                  value={Number.parseInt(computedBins[i]?.length * (parts[i] / 10))}
                                  label={`Хора`}
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
                                  value={prices[i]}
                                  name={`price-${bin.x1}`}
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
                                  name={`income-${bin.x1}`}
                                  value={formatNumber(Math.round(computedBins[i]?.length * (parts[i] / 10) * prices[i]))}
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
                            value={Math.round(totalPeople)}
                            readonly={true}
                            label='Общо хора'
                            labelPlacement='floating' />
                        </IonCol>
                        <IonCol>
                          <IonInput
                            className='input money'
                            type="text"
                            value={formatNumber(Math.round(totalIncome))}
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
