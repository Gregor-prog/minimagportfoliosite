import { useState } from 'react';
import EditorialImage from './EditorialImage';
import ImageViewer from './ImageViewerComponent';

export interface GalleryImage {
  _id: string;
  url?: string;
  previewUrl?: string;
  title: string;
  description?: string;
}

export default function ImagesComponent({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <li key={image._id}>
            <button
              type="button"
              className="surface-card block w-full overflow-hidden text-left hover:border-accent"
              aria-label={`Enlarge ${image.title}`}
              onClick={(event) => {
                event.currentTarget.focus();
                setCurrentIndex(index);
              }}
            >
              <EditorialImage
                src={image.previewUrl}
                alt=""
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <span className="block px-3 py-2 font-serif text-navy">{image.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {currentIndex !== null && images[currentIndex] && (
        <ImageViewer
          image={images[currentIndex]}
          position={currentIndex + 1}
          total={images.length}
          onClose={() => setCurrentIndex(null)}
          onMove={(offset) => setCurrentIndex((index) => ((index ?? 0) + offset + images.length) % images.length)}
        />
      )}
    </>
  );
}
