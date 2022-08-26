export type RouteTextItem = {
  description: string;
  label: string;
  type: "input";
  value: string;
};

export type RouteIconItem = {
  description: string;
  icon: string;
  type: "icon";
};

export type RouteSelectItem = {
  description: string;
  label: string;
  selectOptions: { label: string; description: string }[];
  type: "select";
};

export type RouteItem = RouteTextItem | RouteIconItem | RouteSelectItem;

export type Route = {
  name: string;
  title: string;
  subTitle: string;
  items: RouteItem[];
};
