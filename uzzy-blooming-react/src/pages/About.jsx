
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function About() {
    return (
        <section className="container-padded section-space bg-white">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl text-primary font-black tracking-tighter">About UZZYBLOOMING</h1>
                <p className="mt-6 text-lg leading-8 text-primary/80 font-light italic">
                    UZZYBLOOMING HOMES was born from a passion for quality and elegance. We believe that style should be
                    accessible, comfortable, and durable.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="mx-auto flex max-w-xs flex-col items-center gap-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-primary uppercase tracking-tighter">Passion</h3>
                        <p className="text-sm font-light text-primary/80">We curate every item with love and attention to detail.</p>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col items-center gap-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-primary uppercase tracking-tighter">Quality</h3>
                        <p className="text-sm font-light text-primary/80">We source only the best materials for durability and comfort.</p>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col items-center gap-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-primary uppercase tracking-tighter">Community</h3>
                        <p className="text-sm font-light text-primary/80">We are building a community of confident and stylish individuals.</p>
                    </div>
                </div>

                <div className="mt-16">
                    <Link to="/shop">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
