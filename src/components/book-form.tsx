import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FileInput, TextInput, Textarea } from './common/form-group';
import Button from './common/button';
import { BookFormProps, InputBook } from '@/interfaces/book';

const BookForm: React.FC<BookFormProps> = ({ book, onSave }) => {
  const { register, handleSubmit, reset, setValue } = useForm<InputBook>({
    defaultValues: {
      title: '',
      author: '',
      description: '',
      cover: undefined,
      publicationDate: '',
    },
  });

  useEffect(() => {
    if (book) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('description', book.description);
      setValue('publicationDate', book.publicationDate);
    }
  }, [book, setValue]);

  const onSubmit: SubmitHandler<InputBook> = async (data) => {
    if (data.cover && data.cover instanceof FileList && data.cover.length > 0) {
      const file = data.cover[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        const formData = {
          ...data,
          cover: base64String, // Replace the FileList with the Base64 string
        };
        onSave(formData);
        reset();
      };

      reader.readAsDataURL(file);
    } else {
      onSave(data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-list">
        <TextInput label="title" register={register} required />
        <TextInput label="author" register={register} required />
      </div>
      <Textarea label="description" register={register} required />
      <FileInput label="cover" register={register} required />
      <TextInput
        label="publicationDate"
        type="date"
        register={register}
        required
      />
      <Button className="button--primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default BookForm;
