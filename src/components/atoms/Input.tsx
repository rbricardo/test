import cx from "classnames";
import FieldWrapper from "./Field";

interface InputTypes extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  description?: string;
}

const Input = ({ label, description, value, className, ...rest }: InputTypes) => {
  return (
    <FieldWrapper label={label} description={description} className={className}>
      <input
        className={cx(
          "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        )}
        value={value}
        {...rest}
      />
    </FieldWrapper>
  );
};

export default Input;
