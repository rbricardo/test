import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import Preview from "../../components/molecules/Preview";
import useShallowRoute from "../../hooks/useShallowRoute";
import { Route } from "../types";
import cx from "classnames";

const Step = () => {
  const router = useRouter();

  const { name }: any = router.query;
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [routeIndex, setRouteIndex] = useState<number | null>(null);
  const { setRoutePath } = useShallowRoute();

  useEffect(() => {
    const persistedRoutes = JSON.parse(localStorage.getItem("routes"));
    setRoutes(persistedRoutes);
    setRoute(
      persistedRoutes.find((route: Route) => {
        return route.name === name;
      })
    );
    setRouteIndex(
      persistedRoutes.findIndex((route: Route) => {
        return route.name === name;
      })
    );
  }, [name]);

  if (!name || !route)
    return (
      <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
        <p className="font-bold">This route doesn{"'"}t exist.</p>
        <Button onClick={() => router.push("/")} title="Back to Home" />
      </div>
    );

  const onNext = () => {
    const newRoute = routes[routeIndex + 1];
    setRoute(newRoute);
    setRouteIndex((prev: any) => prev + 1);
    setRoutePath(newRoute.name);
  };

  const onBack = () => {
    const newRoute = routes[routeIndex - 1];
    setRoute(newRoute);
    setRouteIndex((prev: any) => prev - 1);
    setRoutePath(newRoute.name);
  };
  return (
    <div className="lg:w-full w-auto min-h-screen lg:px-96 pt-20 bg-amber-600">
      <Preview
        routeIndex={routeIndex}
        routes={routes}
        route={route}
        buttonTitle={routeIndex !== 0 && "next"}
        hasPrevious={routeIndex !== 0}
        onBack={onBack}
        onNext={routes.length - 1 !== routeIndex && onNext}
      />
    </div>
  );
};

export default Step;
