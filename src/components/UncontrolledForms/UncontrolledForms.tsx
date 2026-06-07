import {
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEventHandler,
} from 'react';
import Input from '../Input';
import PasswordStrength from '../PasswordStrength';
import GenderPicker from '../GenderPicker';
import CountryInput from '../CountryInput';
import { formSchema } from '../../formSchema';
import { useForms } from '../../store/store';
type MyFormProps = {
  onClose: () => void;
};
const UncontrolledForms = (props: MyFormProps) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const countries = useForms((state) => state.countries);
  const addForm = useForms((state) => state.addForm);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      age: formData.get('age'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.has('terms'),
      country: formData.get('country'),
      gender: formData.get('gender'),
    };
    const result = formSchema(countries).safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const key = err.path[0];

        if (typeof key === 'string') {
          fieldErrors[key] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const newData = {
      name: String(data.name),
      age: Number(data.age),
      email: String(data.email),
      gender: String(data.gender),
      country: String(data.country),
    };
    addForm(newData);
    formRef.current?.reset();
    props.onClose();
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <h2> Uncontrolled forms</h2>
      <Input
        placeholder="Name"
        id="name"
        type="text"
        label="Name"
        error={errors.name}
      />
      <Input
        placeholder="Age"
        id="age"
        type="number"
        label="Age"
        error={errors.age}
      />
      <Input
        placeholder="Email"
        id="email"
        type="text"
        label="Email"
        error={errors.email}
      />
      <Input
        placeholder="Password"
        id="password"
        type="password"
        label="Password"
        error={errors.password}
        onChange={changePassword}
      />
      <PasswordStrength password={password} />
      <Input
        placeholder="Confirm Password"
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        error={errors.confirmPassword}
      />
      <GenderPicker id={'gender'} error={errors.gender} />
      <CountryInput error={errors.country} />
      <Input
        id="terms"
        type="checkbox"
        label="I accept Terms & Conditions"
        error={errors.terms}
      />

      <button type="submit" className="bg-blue-500 p-3 text-white rounded-xl">
        Submit
      </button>
    </form>
  );
};
export default UncontrolledForms;
