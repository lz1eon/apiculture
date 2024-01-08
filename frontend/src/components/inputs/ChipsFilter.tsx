import { InputCustomEvent, IonAccordion, IonChip, IonItem, IonLabel, IonText } from "@ionic/react"
import { useState } from "react"
import { HiveTypesLabels, HiveTypes } from "src/models"

type ChipsFilterProps = {
  title: string;
  filterValue: number | string | boolean | null;
  setFilterValue: (value: any) => void;
  items: { key: string, value: any }[];
}

export const ChipsFilter = ({ title, filterValue, setFilterValue, items }: ChipsFilterProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  function handleClick(event: any) {
    const chipValue = parseInt(event.target.getAttribute('data-value'));
    if (filterValue === chipValue)
      setFilterValue(null)
    else
      setFilterValue(chipValue);
      for (let i in items) {
        if (items[i].value === chipValue) {
          setSelectedValue(items[i].key);
        }
      }
  }

  return (
    <div>
      <IonAccordion value={title}>
        <IonItem slot="header">
          {filterValue !== null ?
            <IonLabel><strong>{title}: </strong> {selectedValue}</IonLabel>
            :
            <IonLabel>{title}</IonLabel>
          }
        </IonItem>
        <IonItem slot='content'>
          {
            items.map((item, i) => {
              return (
                <IonChip
                  key={i}
                  data-value={item.value}
                  className={filterValue === item.value ? 'selected' : ''}
                  style={{userSelect: 'none'}}
                  onClick={handleClick}
                >
                  {item.key}
                </IonChip>
              )
            }
            )}
        </IonItem>
      </IonAccordion>
    </div>
  )
}