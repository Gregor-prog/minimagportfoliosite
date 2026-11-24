import { useEffect, useRef } from 'react';
import { HiArrowLeft, HiArrowRight, HiX } from 'react-icons/hi';
import EditorialImage from './EditorialImage';
import type { GalleryImage } from './ImagesComponent';

interface ImageViewerProps {
  image: GalleryImage;
  position: number;
  total: number;
  onClose: () => void;
  onMove: (offset: number) => void;
}

export default function ImageViewer({ image, position, total, onClose, onMove }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function dismiss() {
    dialogRef.current?.close();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="viewer"
      aria-label="Portrait viewer"
      onClick={(event) => {
        if (event.currentTarget === event.target) dismiss();
      }}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onKeyDown={(event) => {
        if (total < 2) return;
        if (event.key === 'ArrowLeft') onMove(-1);
        if (event.key === 'ArrowRight') onMove(1);
      }}
    >
      <div className="viewer-frame">
        <div className="viewer-controls">
          <p aria-live="polite">{position} / {total}</p>
          <button className="viewer-button" type="button" aria-label="Close portrait viewer" onClick={dismiss}>
            <HiX aria-hidden="true" />
          </button>
        </div>
        <figure>
          <EditorialImage
            src={image.url}
            alt={image.title}
            className="viewer-image"
          />
          <figcaption>
            <p className="font-serif text-lg">{image.title}</p>
            {image.description && <p>{image.description}</p>}
          </figcaption>
        </figure>
        {total > 1 && (
          <div className="viewer-controls">
            <button className="viewer-button" type="button" aria-label="Previous portrait" onClick={() => onMove(-1)}><HiArrowLeft aria-hidden="true" /></button>
            <button className="viewer-button" type="button" aria-label="Next portrait" onClick={() => onMove(1)}><HiArrowRight aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </dialog>
  );
}
