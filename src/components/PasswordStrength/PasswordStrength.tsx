import { getPasswordChecks } from '../../utils/getPasswordChecks';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const checks = getPasswordChecks(password);
  const getColorText = (check: boolean) => (check ? 'text-green-500' : '');
  return (
    <div>
      <p>Password requirements:</p>

      <ul>
        <li className={getColorText(checks.hasNumber)}>
          {checks.hasNumber ? '✓' : ''} At least 1 number
        </li>

        <li className={getColorText(checks.hasUppercase)}>
          {checks.hasUppercase ? '✓' : ''} At least 1 uppercase letter
        </li>

        <li className={getColorText(checks.hasLowercase)}>
          {checks.hasLowercase ? '✓' : ''} At least 1 lowercase letter
        </li>

        <li className={getColorText(checks.hasSpecial)}>
          {checks.hasSpecial ? '✓' : ''} At least 1 special character
        </li>
      </ul>
    </div>
  );
};
export default PasswordStrength;
