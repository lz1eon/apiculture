import React from 'react';
import { InputCustomEvent, IonSelect, IonSelectOption } from "@ionic/react"
import { IonSelectCustomEvent } from '@ionic/core';

type ApiSelectProps = {
  name: string;
  type: any;
  value: number;
  option_labels: any;
  label?: string;
  labelPlacement?: "fixed" | "start" | "end" | "floating" | "stacked";
  disabled?: boolean;
  onIonChange: () => void;
} & typeof IonSelect;

export const ApiSelect = ({name, type, value, option_labels, onIonChange, ...rest}: ApiSelectProps) => {
  const keys = Object.keys(type);

  return (
    <IonSelect name={name} value={value} onIonChange={onIonChange} {...rest}>
      {
        keys.map((key, i) => {
          return <IonSelectOption key={i} value={type[key]}>{option_labels[key]}</IonSelectOption>
        })
      }
    </IonSelect>
  )
}