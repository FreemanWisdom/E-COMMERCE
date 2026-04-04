import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="container-padded py-24">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-[var(--font-heading)] text-xl font-black">U</div>
                  <h3 className="font-[var(--font-heading)] text-2xl font-black tracking-tighter text-primary">UZZYBLOOMING<span className="text-accent">.</span></h3>
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent pl-14">Homes & Lifestyle</span>
            </div>
            <p className="text-sm font-light leading-relaxed text-muted/80 max-w-xs">
              A curated destination for artisan-quality home essentials and timeless lifestyle pieces, designed for the modern sanctuary. Hand-picked with elegance in every thread.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="text-[10px] font-black italic">In.</span>
               </div>
               <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="text-[10px] font-black italic">Ig.</span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">The Boutique.</h4>
            <ul className="space-y-4 text-sm font-light text-primary/80">
              <li><Link href="/shop" className="hover:text-accent transition-colors underline-offset-8 decoration-accent/30 hover:underline">All Collection</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors underline-offset-8 decoration-accent/30 hover:underline">The Artisan Story</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors underline-offset-8 decoration-accent/30 hover:underline">Direct Contact</Link></li>
              <li><Link href="/cart" className="hover:text-accent transition-colors underline-offset-8 decoration-accent/30 hover:underline">My Collection</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Support.</h4>
            <ul className="space-y-4 text-sm font-light text-primary/80">
              <li><Link href="/delivery-information" className="hover:text-accent transition-colors">Logistics & Delivery</Link></li>
              <li><Link href="/returns-policy" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Ethics</Link></li>
              <li><Link href="/customer-care" className="hover:text-accent transition-colors">Care Guide</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Connect.</h4>
            <p className="text-sm font-light text-primary/80 leading-7">
               hello@uzzyblooming.co <br/>
               +1 (888) HOMES-00 <br/>
               The Artisan Studio, Los Angeles
            </p>
            <div className="pt-4">
               <span className="text-[10px] font-black text-accent uppercase tracking-widest px-4 py-1.5 rounded-full bg-accent/5">
                  Available 24/7
               </span>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-bold text-muted/40 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} UZZYBLOOMING HOMES. ARTISAN CRAFTED.
           </p>
           <div className="flex gap-8 text-[10px] font-bold text-muted/40 uppercase tracking-[0.4em]">
              <span>Terms of Service.</span>
              <span>Credits.</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
