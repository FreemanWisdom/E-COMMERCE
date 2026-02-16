

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-[var(--font-heading)] text-xl text-primary">{title}</h3>
          <button onClick={onClose} className="text-sm text-primary/70">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
