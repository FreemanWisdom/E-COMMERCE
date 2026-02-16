export const metadata = {
  title: 'About',
  description: 'About UZZYBLOOMING HOMES.'
};

export default function AboutPage() {
  return (
    <section className="container-padded section-space">
      <div className="mx-auto max-w-3xl space-y-5">
        <h1 className="font-[var(--font-heading)] text-4xl font-black tracking-tighter text-primary">About Us</h1>
        <p className="text-sm font-light leading-7 text-primary/80">
          UZZYBLOOMING HOMES is a retail brand focused on female and kids fashion, plus everyday lifestyle needs.
          We curate practical, stylish, and quality products for modern homes.
        </p>
        <p className="text-sm font-light leading-7 text-cocoa/80 italic">
          Our platform is built for growth and is backend-ready for future integration with payment gateways,
          inventory systems, admin tools, and authentication services.
        </p>
      </div>
    </section>
  );
}
