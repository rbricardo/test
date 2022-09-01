import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import Preview from "../../components/molecules/Preview";
import useShallowRoute from "../../hooks/useShallowRoute";
import { Route } from "../../types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
};

type StepProps = {
  name: string;
};

const Step = ({ name }: StepProps) => {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [route, setRoute] = useState<Route | null>(null);
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const { setRoutePath } = useShallowRoute();

  useEffect(() => {
    const persistedRoutes = JSON.parse(localStorage.getItem("routes") || "[]");
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
    if (!routes) return;

    const newRoute = routes[routeIndex + 1];

    setRoute(newRoute);
    setRouteIndex((prev: any) => prev + 1);
    setRoutePath(newRoute.name);
  };

  const onBack = () => {
    if (!routes) return;

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
        buttonTitle={routeIndex !== 0 ? "next" : null}
        hasPrevious={routeIndex !== 0}
        onBack={onBack}
        onNext={routes && routes.length - 1 !== routeIndex ? onNext : undefined}
      />
    </div>
  );
};

export default Step;
