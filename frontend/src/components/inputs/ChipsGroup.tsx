import { InputCustomEvent, IonChip } from "@ionic/react"
import { useState } from "react"

type ChipsGroupProps = {
  items: { key: string, value: any }[]
}

export const ChipsGroup = ({ items }: ChipsGroupProps) => {
  const [selected, setSelected] = useState(null);

  function handleClick(event: any) {
    const chipId = event.target.getAttribute('data-id');
    if (selected === chipId)
      setSelected(null)
    else
      setSelected(chipId);
  }

  return (
    <div>
      {
        items.map((item, i) => {
          return (
            <IonChip 
              key={i} 
              data-id={item.value}
              className={selected == item.value ? 'selected' : ''}
              onClick={handleClick}
            >
              {item.key}
            </IonChip>
          )
        }
      )}
    </div>
  )
}