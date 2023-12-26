import React from 'react';
import { InputCustomEvent, IonSelect, IonSelectOption } from "@ionic/react"

type ApiSelectProps = {
  type: any;
  label?: string;
  labelPlacement?: "fixed" | "start" | "end" | "floating" | "stacked";
  disabled?: boolean;
  // onIonChange: (event: InputCustomEvent) => void;

} & React.HTMLAttributes<HTMLIonSelectElement>;

export const ApiSelect = ({type, ...rest}: ApiSelectProps) => {
  const keys = Object.keys(type);

  return (
    <IonSelect {...rest}>
      {
        keys.map((key, i) => {
          return <IonSelectOption key={i} value={type[key]}>{key}</IonSelectOption>
        })
      }
    </IonSelect>
  )
}