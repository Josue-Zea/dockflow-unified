// components/Button.tsx
import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames'; // Función para manejar clases condicionalmente.
import { Button as HeadlessUIButton } from '@headlessui/react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'success2' | 'primaryExpedients'; // Variantes predefinidas.
  disabled?: boolean;
  customColor?: {
    bgColor: string; // Color de fondo.
    textColor: string; // Color del texto.
    hoverColor: string; // Color al pasar el mouse.
  };
};

function GeneralButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  customColor,
}: ButtonProps) {
  const baseStyles = 'px-2 py-1 focus:outline-none transition-all';

  // Estilos de variantes predeterminadas.
  const variantStyles = {
    primary: 'bg-blue-800 text-white hover:bg-blue-950',
    secondary: 'bg-gray-800 text-white hover:bg-gray-950',
    danger: 'bg-red-800 text-white hover:bg-red-950',
    success: 'bg-emerald-800 text-white hover:bg-emerald-950',
    success2: 'bg-yellow-400 text-black hover:bg-yellow-500',
    primaryExpedients: 'bg-blue-700 text-white hover:bg-blue-900'
  };

  // Selecciona los estilos a usar.
  const styles = customColor
    ? `${customColor.bgColor} ${customColor.textColor} hover:${customColor.hoverColor}`
    : variantStyles[variant];

  return (
    <HeadlessUIButton
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyles,
        styles,
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      )}
    >
      {children}
    </HeadlessUIButton>
  );
}

export default GeneralButton;
