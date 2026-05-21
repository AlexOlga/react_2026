import { useTheme } from '../../context/ThemeContext/useTheme';
import { themeSwitcherStyles } from './ThemeSwitcher.styles';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={themeSwitcherStyles.container}>
      <button
        type="button"
        onClick={toggleTheme}
        className={themeSwitcherStyles.button}
      >
        {theme}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
