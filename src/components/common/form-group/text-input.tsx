import { Path, UseFormRegister } from 'react-hook-form';
import './styles.scss';
import { InputBook } from '@/interfaces/book';

interface InputProps {
  label: Path<InputBook>;
  register: UseFormRegister<InputBook>;
  required: boolean;
  type?: string;
}

const TextInput = ({
  label,
  register,
  required,
  type = 'text',
}: InputProps) => (
  <div className="form-group">
    <label htmlFor={label} className="form-group__label">
      {label}
    </label>
    <div className="form-group__input-container">
      <input
        type={type}
        id={label}
        {...register(label, { required })}
        className="form-group__input"
      />
    </div>
  </div>
);

export default TextInput;
