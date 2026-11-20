export default function WholePageSpinner() {
  return (
    <div className="site-wrap flex min-h-[35vh] items-center gap-3 py-12 text-muted" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-accent" aria-hidden="true" />
      Loading content…
    </div>
  );
}
