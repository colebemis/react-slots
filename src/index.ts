import * as React from "react";

type SlotConfig = Record<string, React.ComponentType>;

type SlotElements<Type extends SlotConfig> = {
  [Property in keyof Type]: React.ReactElement<Type[Property]>;
};

export function useSlots<T extends SlotConfig>(
  children: React.ReactNode,
  config: T
): [Partial<SlotElements<T>>, React.ReactNode[]] {
  const slots: Partial<SlotElements<T>> = mapValues(config, () => undefined);
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      rest.push(child);
      return;
    }

    const slotKey = getKeyByValue(config, child.type);

    if (slotKey && !slots[slotKey]) {
      slots[slotKey] = child as React.ReactElement<T[keyof T]>;
      return;
    }

    rest.push(child);
  });

  return [slots, rest];
}

function mapValues<T extends Record<string, unknown>, V>(
  obj: T,
  fn: (value: T[keyof T]) => V
) {
  return Object.keys(obj).reduce((result, key: keyof T) => {
    result[key] = fn(obj[key]);
    return result;
  }, {} as Record<keyof T, V>);
}

function getKeyByValue<T extends Record<string, unknown>>(
  object: T,
  value: any
): keyof T | undefined {
  const keys = Object.keys(object) as (keyof T)[];
  return keys.find(key => object[key] === value);
}
