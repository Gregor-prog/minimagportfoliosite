interface YoutubeEmbedProps {
  videoUrl: string;
  title: string;
}

export default function YoutubeEmbed({ videoUrl, title }: YoutubeEmbedProps) {
  return (
    <div className="surface-card aspect-video overflow-hidden">
      <iframe
        className="h-full w-full"
        src={videoUrl}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
