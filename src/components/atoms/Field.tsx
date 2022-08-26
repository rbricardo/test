interface FieldWrapperProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  label?: string;
  description?: string;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  description,
  className,
  children,
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      {label && (
        <label className="block text-black text-sm mb-2">{label}</label>
      )}
      {children}
      {description && <p className="text-gray-300 text-xs">{description}</p>}
    </div>
  );
};

export default FieldWrapper;
