import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'UZZYBLOOMING HOMES',
    template: '%s | UZZYBLOOMING HOMES'
  },
  description:
    'Shop female and kids fashion plus lifestyle essentials at UZZYBLOOMING HOMES.',
  keywords: [
    'female fashion',
    'kids fashion',
    'bags',
    'shoes',
    'lifestyle retail',
    'UZZYBLOOMING HOMES'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
