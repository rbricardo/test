import { useRouter } from "next/router";
import { useEffect } from "react";

function useShallowRoute() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push(route, undefined, { shallow: true });
  // }, []);
  const setRoutePath = (route: string) => {
    router.push(route, undefined, { shallow: true });
  };
  return {
    setRoutePath,
  };
}

export default useShallowRoute;
