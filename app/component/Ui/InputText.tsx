type InputTextProps = {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
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
        className="w-full mt-2 mb-3 py-2 px-2 bg-gray-50 border border-shadow rounded"
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
