"use client";

import BackButton from '../../components/ui/BackButton';

export default function DeliveryInformationPage() {
    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-3xl space-y-6">
                <BackButton className="mb-6" />
                <h1 className="font-[var(--font-heading)] text-3xl text-primary sm:text-4xl">Delivery Information</h1>

                <div className="space-y-4 text-sm leading-7 text-primary/80">
                    <p>
                        At UZZYBLOOMING HOMES, we are committed to delivering your orders promptly and safely.
                        Below you will find details regarding our shipping policies.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Delivery Areas</h2>
                    <p>
                        We currently ship nationwide across Nigeria. Whether you are in Lagos, Abuja, Port Harcourt, or any other state,
                        we ensure your package reaches you.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Shipping Timelines</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Lagos:</strong> 1 - 3 business days.</li>
                        <li><strong>Other States:</strong> 3 - 7 business days.</li>
                    </ul>
                    <p>
                        Please note that delivery times may vary during public holidays or sales events.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Shipping Costs</h2>
                    <p>
                        Shipping costs are calculated at checkout based on your location and the weight of your order.
                        Free shipping may be available for orders above a certain amount during special promotions.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Order Tracking</h2>
                    <p>
                        Once your order is dispatched, you will receive a confirmation message or email with details to track your package.
                        For any issues, please contact our Customer Care.
                    </p>
                </div>
            </div>
        </section>
    );
}
