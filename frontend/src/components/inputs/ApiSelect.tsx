import React from 'react';
import { InputCustomEvent, IonSelect, IonSelectOption } from "@ionic/react"

type ApiSelectProps = {
  name: string;
  type: any;
  value: number;
  label?: string;
  labelPlacement?: "fixed" | "start" | "end" | "floating" | "stacked";
  disabled?: boolean;
  // onIonChange: (event: InputCustomEvent) => void;

} & React.HTMLAttributes<HTMLIonSelectElement>;

export const ApiSelect = ({name, type, value, ...rest}: ApiSelectProps) => {
  const keys = Object.keys(type);

  return (
    <IonSelect name={name} value={value || type.DEFAULT} {...rest}>
      {
        keys.map((key, i) => {
          return <IonSelectOption key={i} value={type[key]}>{key}</IonSelectOption>
        })
      }
    </IonSelect>
  )
}