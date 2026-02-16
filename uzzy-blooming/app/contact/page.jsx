import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const metadata = {
  title: 'Contact',
  description: 'Contact UZZYBLOOMING HOMES.'
};

export default function ContactPage() {
  return (
    <section className="container-padded section-space">
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="font-[var(--font-heading)] text-4xl text-cocoa">Contact Us</h1>
          <p className="text-sm leading-7 text-cocoa/80">
            Need help with your order or product selection? Send us a message and our support team will respond.
          </p>
          <ul className="space-y-2 text-sm text-cocoa/80">
            <li>Email: support@uzzybloominghomes.com</li>
            <li>Phone: +234 800 000 0000</li>
            <li>Address: Lagos, Nigeria</li>
          </ul>
        </div>

        <form className="space-y-4 rounded-2xl border border-cocoa/10 bg-white p-5">
          <Input label="Full Name" required />
          <Input type="email" label="Email" required />
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-cocoa">Message</span>
            <textarea
              rows="5"
              className="w-full rounded-xl border border-cocoa/20 px-4 py-2.5 text-sm outline-none focus:border-rose"
              required
            />
          </label>
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
}
