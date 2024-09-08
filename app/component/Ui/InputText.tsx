type InputTextProps = {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  placeholder,
  defaultValue,
  onChange,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={label} className="block text-sm">
          {label}
        </label>
      )}
      <input
        type="text"
        className="w-full h-[60px] px-2  bg-gray-50 border border-gray-400"
        id={label}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
