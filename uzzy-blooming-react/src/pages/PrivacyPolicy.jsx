
import BackButton from '../components/ui/BackButton';

export default function PrivacyPolicy() {
    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-3xl space-y-6">
                <BackButton className="mb-6" />
                <h1 className="text-3xl text-primary sm:text-4xl">Privacy Policy</h1>

                <div className="space-y-4 text-sm leading-7 text-primary/80">
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how UZZYBLOOMING HOMES collects, uses, and protects your information.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as your name, email address, phone number, and shipping address when you make a purchase or sign up for our newsletter.
                    </p>

                    <h2 className="text-xl font-bold text-primary">How We Use Your Information</h2>
                    <ul className="list-disc pl-5">
                        <li>To process and fulfill your orders.</li>
                        <li>To communicate with you about your order status.</li>
                        <li>To send you updates, newsletters, and promotional offers (if subscribed).</li>
                        <li>To improve our website and customer service.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary">Data Protection</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information. We do not sell or trade your personal data to third parties.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Cookies</h2>
                    <p>
                        Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.
                    </p>

                    <h2 className="text-xl font-bold text-primary">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact our Customer Care team.
                    </p>
                </div>
            </div>
        </section>
    );
}
