import cx from "classnames";

type ButtonProps = {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  title,
  disabled,
  onClick,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cx("px-8 py-2 lg:h-[43px] h-auto lg:rounded-full rounded-3xl text-white", className, {
        "bg-[#0072CE]": !disabled,
        "bg-gray-400": disabled,
      })}
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
