"use client";

import BackButton from '../../components/ui/BackButton';

export default function ReturnsPolicyPage() {
    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-3xl space-y-6">
                <BackButton className="mb-6" />
                <h1 className="font-[var(--font-heading)] text-3xl text-primary sm:text-4xl">Returns Policy</h1>

                <div className="space-y-4 text-sm leading-7 text-primary/80">
                    <p>
                        We want you to be completely happy with your purchase. If for any reason you are not satisfied,
                        we accept returns subject to the following conditions.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Return Window</h2>
                    <p>
                        You have <strong>7 days</strong> from the date of delivery to initiate a return.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Conditions for Return</h2>
                    <ul className="list-disc pl-5">
                        <li>Items must be unused, unwashed, and in their original condition.</li>
                        <li>Original tags and packaging must be intact.</li>
                        <li>Proof of purchase (order number or receipt) is required.</li>
                        <li>Perishable goods or intimate items (e.g., underwear) are not eligible for return for hygiene reasons.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary">How to Return</h2>
                    <p>
                        To initiate a return, please contact our Customer Care team at <strong>support@uzzybloominghomes.com</strong> or call us.
                        We will guide you through the process.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Refunds & Exchanges</h2>
                    <p>
                        Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
                        Approved funds will be processed to your original method of payment or provided as store credit.
                        Exchanges are subject to product availability.
                    </p>
                </div>
            </div>
        </section>
    );
}
