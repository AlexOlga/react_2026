'use client'
import { useTheme } from '@/context/ThemeContext/useTheme';
import { switcherStyles } from '@/shared/styles/switcher';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={switcherStyles.container}>
      <button
        type="button"
        onClick={toggleTheme}
        className={switcherStyles.button}
      >
        {theme}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
