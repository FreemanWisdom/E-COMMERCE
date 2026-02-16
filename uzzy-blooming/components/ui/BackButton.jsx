"use client";

import { useRouter } from 'next/navigation';

export default function BackButton({ className = '' }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`group flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
        </button>
    );
}
