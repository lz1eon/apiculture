import { InputCustomEvent, IonInput } from "@ionic/react";
import React from "react";

type Props = React.ComponentProps<(typeof IonInput)> & {
  value: number | undefined;
  updateValue: (value: number | undefined) => void;
}

export const CurrencyInput: React.FC<Props> = ({ value: valueFromProp, updateValue, ...rest }) => {
  const format = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const stringToNumber = (value: string): number => parseInt(value.replace(/\./g, ""), 10);

  const [currentValue, updateCurrentValue] = React.useState<string>(
    valueFromProp ? format(valueFromProp) : ""
  );

  const handleChange = (event: InputCustomEvent) => {
    const {target: { value }} = event;

    if (value === "") {
      updateCurrentValue("");
      return updateValue(undefined);
    }

    const valueAsNumber = stringToNumber(value);

    updateCurrentValue(format(valueAsNumber));
    return updateValue(valueAsNumber);
  };

  return (
    <IonInput
      type="text"
      value={currentValue}
      onIonChange={handleChange}
      {...rest}
    />
  )
}