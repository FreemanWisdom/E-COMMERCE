
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-4xl">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <h1 className="font-heading text-4xl font-bold text-primary">Get in Touch</h1>
                        <p className="mt-4 text-primary/80">
                            Have questions about our products or your order? We're here to help. Reach out to us via the form or our contact details.
                        </p>

                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Email Us</h3>
                                    <p className="text-sm text-primary/70">support@uzzybloominghomes.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Call Us</h3>
                                    <p className="text-sm text-primary/70">+234 800 000 0000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Visit Us</h3>
                                    <p className="text-sm text-primary/70">Lagos, Nigeria</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-soft">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Name" placeholder="Your name" required />
                            <Input label="Email" type="email" placeholder="Your email" required />
                            <Input label="Subject" placeholder="How can we help?" required />
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-primary/70">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
                                    placeholder="Your message..."
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
