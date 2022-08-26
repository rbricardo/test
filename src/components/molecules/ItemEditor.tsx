import React, { createElement, useEffect, useState } from "react";
import { RouteItem, RouteSelectItem, RouteTextItem } from "../../pages/types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

type ItemEditorProps<T extends RouteItem = RouteItem> = {
  item: T;
  onItemInput: (item: T) => void;
};

export function FieldEditor<T extends RouteItem>({
  field,
  item,
  onItemInput,
  ...props
}: {
  field: {
    [key in keyof T]: T[key] extends string
      ? key extends "type"
        ? never
        : key
      : never;
  }[keyof T];
} & ItemEditorProps<T> &
  React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      value={item[field]}
      onChange={(e) =>
        onItemInput({
          ...item,
          [field]: (e.target as HTMLInputElement).value,
        })
      }
    />
  );
}

export const InputEditor: React.FC<ItemEditorProps<RouteTextItem>> = ({
  item,
  onItemInput,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <FieldEditor
        label="Label"
        item={item}
        onItemInput={onItemInput}
        field="label"
      />
      <FieldEditor
        label="Description"
        item={item}
        onItemInput={onItemInput}
        field="description"
      />
    </div>
  );
};

const emptySelectOption = { label: "", description: "" };

export const SelectEditor: React.FC<ItemEditorProps<RouteSelectItem>> = ({
  item,
  onItemInput,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <FieldEditor item={item} onItemInput={onItemInput} field="label" label="Label" />
      <FieldEditor item={item} onItemInput={onItemInput} field="description" label="Description" />

      {item.selectOptions
        .concat([emptySelectOption])
        .map((selectOption, index, selectOptions) => {
          const changeSelectOption = (
            data: Partial<RouteSelectItem["selectOptions"][number]> | null
          ) =>
            onItemInput({
              ...item,
              selectOptions: item.selectOptions
                .slice(0, index)
                .concat(
                  data ? [{ ...selectOption, ...data }] : [],
                  item.selectOptions.slice(index + 1)
                ),
            });

          return (
            <div key={index} className="flex gap-5 mt-5">
              <Input
                placeholder="Select Option"
                value={selectOption.label}
                onChange={(e) =>
                  changeSelectOption({
                    ...selectOption,
                    label: (e.target as HTMLInputElement).value,
                  })
                }
              />
              {index !== selectOptions.length - 1 && (
                <Button
                  className="bg-red-600"
                  title="-"
                  onClick={() => changeSelectOption(null)}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default function ItemEditor(props: ItemEditorProps) {
  switch (props.item.type) {
    case "select":
      return <SelectEditor {...props} />;

    case "input":
      return <InputEditor {...props} />;

    default:
      break;
  }
}
