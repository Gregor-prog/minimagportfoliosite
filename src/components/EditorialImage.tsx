import { useState, type ImgHTMLAttributes } from 'react';

interface EditorialImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export default function EditorialImage({ src, alt, className, ...props }: EditorialImageProps) {
  const [failedSource, setFailedSource] = useState<string>();

  if (!src || failedSource === src) {
    return <span className={`image-fallback ${className ?? ''}`} aria-hidden="true" />;
  }

  return <img {...props} src={src} alt={alt} className={className} onError={() => setFailedSource(src)} />;
}
