import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import './styles.scss';
import { InputBook } from '@/interfaces/book';

interface FileInputProps {
  label: Path<InputBook>;
  register: UseFormRegister<InputBook>;
  required: boolean;
}

const FileInput = ({ label, register, required }: FileInputProps) => (
  <div className="form-group">
    <label htmlFor={label} className="form-group__label">
      {label}
    </label>
    <div className="form-group__input-container">
      <input
        type="file"
        accept="image/*"
        id={label}
        {...register(label, { required })}
        className="form-group__input"
      />
    </div>
  </div>
);

export default FileInput;
