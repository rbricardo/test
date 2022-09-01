import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useReducer } from "react";
import Select from "react-select";
import Button from "../components/atoms/Button";
import StepEditor from "../components/molecules/StepEditor";
import cx from "classnames";
import Preview from "../components/molecules/Preview";
import type { Route } from "./types";
import { useRouter } from "next/router";

const initialRoute: Route = {
  name: "",
  title: "",
  subTitle: "",
  items: [],
};

function reducer(
  state: { routes: Route[]; preview: Route; currentRouteIndex: number },
  action:
    | { type: "createRoute" | "saveChanges" }
    | { type: "reset"; payload?: Route[] }
    | { type: "navigateTo"; payload: number }
    | { type: "preview"; payload: Route }
) {
  if (action.type === "reset") {
    const routes = action.payload || [];
    const preview = routes[0] || initialRoute;

    localStorage.setItem("routes", JSON.stringify(routes));

    return {
      routes,
      preview,
      currentRouteIndex: 0,
    };
  }

  if (action.type === "navigateTo") {
    return {
      ...state,
      currentRouteIndex: action.payload,
      preview: state.routes[action.payload],
    };
  }

  if (action.type === "preview") {
    return {
      ...state,
      preview: action.payload,
    };
  }

  if (action.type === "createRoute") {
    return {
      ...state,
      currentRouteIndex: state.routes.length,
      preview: initialRoute,
    };
  }

  if (action.type === "saveChanges") {
    const routes = state.routes
      .slice(0, state.currentRouteIndex)
      .concat([state.preview], state.routes.slice(state.currentRouteIndex + 1));

    localStorage.setItem("routes", JSON.stringify(routes));

    return {
      ...state,
      routes,
    };
  }

  return state;
}

const Home: NextPage = () => {
  const [{ routes, preview, currentRouteIndex }, dispatch] = useReducer<
    typeof reducer
  >(reducer, {
    routes: [],
    preview: initialRoute,
    currentRouteIndex: 0,
  });

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "reset",
      payload: JSON.parse(localStorage.getItem("routes") || "[]"),
    });
  }, []);

  const options = useMemo(
    () =>
      routes
        .map((route: Route, index) => ({
          label: `${index}${route.title ? `: ${route.title}` : ""}`,
          value: index,
        }))
        .concat({
          value: routes.length,
          label: "Create Route",
        }),
    [routes]
  );

  const onNext = () => {
    dispatch({ type: "navigateTo", payload: currentRouteIndex + 1 });
  };

  const onBack = () => {
    dispatch({ type: "navigateTo", payload: currentRouteIndex - 1 });
  };

  return (
    <div>
      <Head>
        <title>Zappy Ride</title>
        <meta name="description" content="Zappy Ride App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center p-10 min-h-screen lg:w-full bg-gradient-to-r from-gray-400 to-gray-800">
        <div className="flex lg:flex-row items-center lg:items-start flex-col shadow-lg w-auto lg:w-full min-h-[800px]">
          <div className="lg:w-1/2 w-auto pt-10 bg-slate-100 lg:rounded-t-none lg:rounded-tl-md lg:rounded-bl-md rounded-t-md px-10">
            <div
              className={cx(
                routes.length ? "flex" : "hidden",
                "items-center justify-center gap-2 flex-col lg:flex-row"
              )}
            >
              <p className=" text-xl font-semibold">Route:</p>
              <Select
                key={options.length}
                value={options[currentRouteIndex]}
                options={options}
                className="lg:w-1/5"
                placeholder="Select the route"
                onChange={(option) => {
                  if (!option) return;

                  if (
                    preview !== routes[currentRouteIndex] &&
                    preview !== initialRoute &&
                    !confirm(
                      "Are you sure you want to navigate without saving the changes?"
                    )
                  ) {
                    return;
                  }

                  if (option.value === routes.length) {
                    dispatch({ type: "createRoute" });
                    return;
                  }
                  dispatch({ type: "navigateTo", payload: option.value });
                  return;
                }}
              />
              <Button
                title="Clear all routes"
                className="bg-red-600"
                onClick={() => dispatch({ type: "reset" })}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-10 mt-10">
              <StepEditor
                route={preview}
                onRouteInput={(payload) =>
                  dispatch({ type: "preview", payload })
                }
                onSubmit={() => {
                  if (
                    !!routes.find(
                      ({ name }, index) =>
                        index !== currentRouteIndex && name === preview.name
                    )
                  ) {
                    alert("Route names should be unique");
                    return;
                  }

                  dispatch({ type: "saveChanges" });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 w-auto pb-10 lg:rounded-r-lg rounded-b-md bg-amber-600 gap-10 ">
            <div className="p-6">
              <Preview
                routeIndex={currentRouteIndex}
                routes={routes}
                route={preview}
                onNext={routes.length - 1 !== currentRouteIndex && onNext}
                onBack={onBack}
                hasPrevious={currentRouteIndex !== 0}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => router.push(`/step/${routes[0].name}`)}
                className="w-1/2"
                title="Test step by step now!"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
