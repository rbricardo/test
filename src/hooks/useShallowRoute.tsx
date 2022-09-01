import { useRouter } from "next/router";

function useShallowRoute() {
  const router = useRouter();

  const setRoutePath = (route: string) => {
    router.push(route, undefined, { shallow: true });
  };
  return {
    setRoutePath,
  };
}

export default useShallowRoute;
