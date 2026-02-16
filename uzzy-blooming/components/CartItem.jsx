"use client";

import Image from 'next/image';
import Button from './ui/Button';
import { formatCurrency } from '../lib/currency';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-cocoa/10 bg-white p-4">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={120}
          className="h-24 w-24 object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-cocoa">{item.name}</h3>
        <p className="text-sm text-cocoa/70">{item.size ? `Size: ${item.size}` : 'Standard size'}</p>
        <p className="text-sm font-semibold text-rose">{formatCurrency(item.price)}</p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) =>
              onUpdateQuantity(item.id, Number(event.target.value || 1), item.size)
            }
            className="w-16 rounded-lg border border-cocoa/20 px-2 py-1 text-sm"
          />
          <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => onRemove(item.id, item.size)}>
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}

