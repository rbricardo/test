import Input from "../atoms/Input";
import Select from "react-select";
import { useState } from "react";
import Button from "../atoms/Button";
import ItemEditor from "../molecules/ItemEditor";
import { Route, RouteItem } from "../../pages/types";

type StepEditorProps = {
  route: Route;
  onRouteInput: (route: Route) => void;
  disabled?: boolean;
  onSubmit: () => void;
};

const types: { value: RouteItem["type"]; label: string }[] = [
  { value: "input", label: "Text Input" },
  { value: "select", label: "Select" },
  { value: "icon", label: "Icon" },
];

const initialState: { [key in RouteItem["type"]]: RouteItem } = {
  select: {
    selectOptions: [],
    type: "select",
    label: "",
    description: "",
  },
  input: {
    type: "input",
    label: "",
    description: "",
  },
  icon: {
    type: "icon",
    icon: "",
    description: "",
  },
};

const StepEditor = ({ route, onRouteInput, onSubmit }: StepEditorProps) => {
  const [[currentId, currentItem], setCurrent] = useState([
    0,
    initialState["select"],
  ]);

  function changeItem(index: number, item: RouteItem) {
    onRouteInput({
      ...route,
      items: ([] as RouteItem[]).concat(
        route.items.slice(0, index),
        [item],
        route.items.slice(index + 1)
      ),
    });
  }

  return (
    <div className="flex flex-col lg:w-full w-auto rounded lg:px-40 py-10">
      <Input
        label="Route name (URL)"
        placeholder="Route name (URL)"
        onChange={(e: any) =>
          onRouteInput({ ...route, name: e.target.value.replace(/\s/g, "") })
        }
        value={route.name}
      />

      <Input
        label="Title"
        placeholder="Title"
        className="mt-5"
        onChange={(e: any) => onRouteInput({ ...route, title: e.target.value })}
        value={route.title}
      />
      <Input
        label="Subtitle"
        placeholder="Subtitle"
        className="mt-5"
        onChange={(e: any) =>
          onRouteInput({ ...route, subTitle: e.target.value })
        }
        value={route.subTitle}
      />
      {route.items.map((item, index) => {
        return (
          <div key={index} className="border-2 mt-5 rounded p-5">
            <p className=" text-center mb-5 text-xl font-semibold ">
              Item {index}
            </p>
            <Select
              value={types.find(({ value }) => value === item.type)}
              options={types}
              onChange={(selection) => {
                if (!selection || selection.value === item.type) return;
                changeItem(index, initialState[selection.value]);
              }}
            />
            <ItemEditor
              item={item}
              onItemInput={(newItem: RouteItem) => changeItem(index, newItem)}
            />
          </div>
        );
      })}
      <div className="border-2 mt-5 p-5 rounded">
        <p>New item</p>
        <Select
          key={route.items.length}
          options={types}
          onChange={(selection) => {
            if (!selection) return;
            changeItem(route.items.length, initialState[selection.value]);
          }}
        />
      </div>

      <Button
        title="Save Route Changes"
        className="bg-green-800 mt-5"
        disabled={!route.items.length}
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export default StepEditor;
