import cx from "classnames";

type ButtonProps = {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
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
      className={cx("px-8 py-2 h-[43px] rounded-full text-white", className, {
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
