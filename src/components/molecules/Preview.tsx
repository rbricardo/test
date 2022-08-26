import Select from "react-select";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import cx from "classnames";
import { Route } from "../../pages/types";
import FieldWrapper from "../atoms/Field";

const Preview = ({
  route,
  hasPrevious,
  onNext,
  onBack,
  buttonTitle,
}: {
  route: Route;
  buttonTitle?: string | null;
  hasPrevious: boolean;
  onNext?: () => void;
  onBack?: () => void;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[552px] rounded-lg sm:min-w-full p-14 bg-white">
        <div className="w-[542px] text-center">
          <p className="text-4xl font-bold">{route?.title}</p>
        </div>
        <div className="w-[458px] text-center">
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
            "w-full flex",
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
    </>
  );
};

export default Preview;
