"use client";

import BackButton from '../../components/ui/BackButton';
import Link from 'next/link';

export default function CustomerCarePage() {
    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-3xl space-y-6">
                <BackButton className="mb-6" />
                <h1 className="font-[var(--font-heading)] text-3xl text-primary sm:text-4xl">Customer Care</h1>

                <div className="space-y-4 text-sm leading-7 text-primary/80">
                    <p>
                        Need help? Our Customer Care team is here to assist you with any inquiries regarding products, orders, or our services.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Contact Channels</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                            <h3 className="font-bold text-accent">Email Support</h3>
                            <p className="mt-2">support@uzzybloominghomes.com</p>
                            <p className="text-xs text-primary/60">Response within 24 hours</p>
                        </div>
                        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                            <h3 className="font-bold text-accent">Phone Support</h3>
                            <p className="mt-2">+234 800 000 0000</p>
                            <p className="text-xs text-primary/60">Mon - Fri, 9am - 5pm</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-primary">Quick Links</h2>
                    <ul className="list-disc pl-5">
                        <li><Link href="/delivery-information" className="underline hover:text-accent">Delivery Information</Link></li>
                        <li><Link href="/returns-policy" className="underline hover:text-accent">Returns Policy</Link></li>
                        <li><Link href="/privacy-policy" className="underline hover:text-accent">Privacy Policy</Link></li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary">Visit Us</h2>
                    <p>
                        Lagos, Nigeria.<br />
                        (Full address available on request)
                    </p>
                </div>
            </div>
        </section>
    );
}
