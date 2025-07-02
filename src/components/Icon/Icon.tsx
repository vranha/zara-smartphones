import Image from 'next/image';

interface IconProps {
  name: string;
  alt: string;
  size?: number;
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
      aria-hidden={alt ? false : true}
    />
  );
};
