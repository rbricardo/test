import Select from "react-select";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import cx from "classnames";
import { Route } from "../../pages/types";
import FieldWrapper from "../atoms/Field";

const Preview = ({
  routeIndex,
  routes,
  route,
  hasPrevious,
  onNext,
  onBack,
  buttonTitle,
}: {
  routeIndex: number | null;
  routes: Route[] | null;
  route: Route;
  buttonTitle?: string | null;
  hasPrevious: boolean;
  onNext?: () => void | null;
  onBack?: () => void | null;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="py-10 flex flex-col items-center bg-[#B9BCC0] lg:rounded-lg">
        <p>
          Step {routeIndex} of {routes.length}
        </p>
        <div className="flex flex-row gap-5 mt-5">
          {Array.from({ length: Math.max(1, routes.length) }, (_, index) => (
            <div
              key={index}
              className={cx(
                "h-1 w-[88px]",
                index === routeIndex ? "bg-[#0072CE]" : "bg-[#595959]"
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center min-h-[552px] rounded-lg lg:min-w-full p-14 bg-white">
        <div className="lg:w-[542px] w-auto text-center">
          <p className="text-4xl font-bold">{route?.title}</p>
        </div>
        <div className="lg:w-[458px] w-auto text-center">
          <p className="text-base mt-6">{route?.subTitle}</p>
        </div>
        <div className="py-14 flex flex-col gap-10">
          {route.items.map((item, index) => (
            <div key={index}>
              {item.type === "select" && (
                <FieldWrapper label={item.label} description={item.description}>
                  <Select options={item.selectOptions} className="w-52" />
                </FieldWrapper>
              )}
              {item.type === "input" && <Input {...item} />}
            </div>
          ))}
        </div>
        <div
          className={cx(
            "lg:w-full w-auto flex",
            !hasPrevious || !onNext ? "justify-center" : "justify-between"
          )}
        >
          {hasPrevious && (
            <Button
              title="BACK"
              onClick={onBack}
              className="bg-white border-[#0072CE] border text-black"
            />
          )}
          {onNext && (
            <Button
              title={buttonTitle || "Create Your First Vehicle Set"}
              onClick={onNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
