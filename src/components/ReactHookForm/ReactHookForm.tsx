import Input from '../Input';
import PasswordStrength from '../PasswordStrength';
import GenderPicker from '../GenderPicker';
import CountryInput from '../CountryInput';
import { formSchema } from '../../formSchema';
import { useForms } from '../../store/store';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

type MyFormProps = {
  onClose: () => void;
};

const ReactHookForm = ({ onClose }: MyFormProps) => {
  const countries = useForms((state) => state.countries);
  const addForm = useForms((state) => state.addForm);
  const schema = formSchema(countries);
  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const password = useWatch({
    control,
    name: 'password',
  });
  const onSubmit = (data: FormValues) => {
    const imgUrl = data.img ? URL.createObjectURL(data.img) : null;
    const newData = {
      name: String(data.name),
      age: Number(data.age),
      email: String(data.email),
      gender: String(data.gender),
      country: String(data.country),
      img: imgUrl,
      isNew: true,
    };
    addForm(newData);
    setTimeout(() => {
      newData.isNew = false;
    }, 10000);
    reset();
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2> Uncontrolled forms</h2>
      <Input
        placeholder="Name"
        id="name"
        type="text"
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        placeholder="Age"
        id="age"
        type="number"
        label="Age"
        {...register('age')}
        error={errors.age?.message}
      />
      <Input
        placeholder="Email"
        id="email"
        type="text"
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        placeholder="Password"
        id="password"
        type="password"
        label="Password"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordStrength password={password} />
      <Input
        placeholder="Confirm Password"
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <GenderPicker
        id={'gender'}
        {...register('gender')}
        error={errors.gender?.message}
      />
      <Input
        id="img"
        type="file"
        label=" Select file"
        accept="image/png,image/jpeg"
        {...register('img')}
        error={errors.img?.message?.toString()}
      />
      <CountryInput {...register('country')} error={errors.country?.message} />
      <Input
        id="terms"
        type="checkbox"
        label="I accept Terms & Conditions"
        {...register('terms')}
        error={errors.terms?.message}
      />

      <button
        type="submit"
        className="bg-blue-500 p-3 text-white rounded-xl disabled:bg-blue-100"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};
export default ReactHookForm;
