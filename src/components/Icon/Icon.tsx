import Image from 'next/image';

interface IconProps {
  name: string; // El nombre del archivo del icono, ej: 'cart-empty.svg'
  alt: string;
  size?: number; // Un tamaño opcional para width y height
  className?: string;
}

export const Icon = ({ name, alt, size = 24, className }: IconProps) => {
  return (
    <Image
      src={`/icons/${name}`}
      alt={alt}
      width={size}
      height={size}
      className={className}
      aria-hidden={alt ? false : true} // Mejora de accesibilidad
    />
  );
};
