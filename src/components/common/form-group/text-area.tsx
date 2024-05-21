import { Path, UseFormRegister } from 'react-hook-form';
import './styles.scss';
import { InputBook } from '@/interfaces/book';

interface TextareaProps {
  label: Path<InputBook>;
  register: UseFormRegister<InputBook>;
  required: boolean;
}

const Textarea = ({ label, register, required }: TextareaProps) => (
  <div className="form-group">
    <label htmlFor={label} className="form-group__label">
      {label}
    </label>
    <div className="form-group__input-container">
      <textarea
        id={label}
        {...register(label, { required })}
        className="form-group__textarea"
      ></textarea>
    </div>
  </div>
);

export default Textarea;
