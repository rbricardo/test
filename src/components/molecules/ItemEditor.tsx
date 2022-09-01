import type { RouteItem, RouteSelectItem, RouteTextItem } from "../../types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

type ItemEditorProps<T> = {
  item: T;
  onItemInput: (item: T) => void;
};

export function FieldEditor<T>({
  field,
  item,
  onItemInput,
  ...props
}: ItemEditorProps<T> & { field: Exclude<keyof T, "type">  } & React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      value={item[field] as unknown as string}
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

export default function ItemEditor(props: ItemEditorProps<RouteItem>) {
  switch (props.item.type) {
    case "select":
      return <SelectEditor {...props as ItemEditorProps<RouteSelectItem>} />;

    case "input":
      return <InputEditor {...props as ItemEditorProps<RouteTextItem>} />;

    default:
      break;
  }
  return null
}
