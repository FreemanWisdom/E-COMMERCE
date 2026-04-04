import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../lib/mockData/products';

export default function HomePage() {
  const featured = products.slice(0, 4);
  const categories = ["Fashion", "Footwear", "Lifestyle", "Accessories"];

  return (
    <div className="flex flex-col gap-0 pb-24 bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-primary">
        {/* Background Image with Fixed-like Parallax effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background-header.jpg"
            alt="Uzzyblooming Luxury Home & Lifestyle"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
          {/* Multi-layered overlays for depth */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Large Decorative Text Background */}
        <div className="absolute bottom-0 left-0 z-0 hidden lg:block opacity-10 select-none pointer-events-none">
           <h2 className="font-[var(--font-heading)] text-[25vw] font-black leading-none text-white -translate-x-12 translate-y-12 tracking-tighter">
              ARTISAN.
           </h2>
        </div>

        <div className="container-padded relative z-10 h-full flex flex-col justify-center items-start text-white pt-48">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <span className="h-px w-16 bg-accent"></span>
                 <p className="text-[10px] font-black uppercase tracking-[0.8em] text-accent">
                   ESTABLISHED 2024
                 </p>
               </div>
               <h1 className="font-[var(--font-heading)] text-6xl font-black tracking-tighter sm:text-7xl lg:text-[8.5rem] leading-[0.8] drop-shadow-2xl">
                 ELEVATE <br />
                 <span className="text-accent italic">YOUR HOME.</span>
               </h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-12 pt-4">
               <p className="max-w-md text-lg font-light leading-relaxed text-white/80 italic border-l-2 border-accent pl-8">
                 Discover a curated collection of fashion and lifestyle essentials for women and kids – <span className="text-white font-bold not-italic underline decoration-accent/50 underline-offset-8">hand-picked for elegance</span> and crafted for confidence.
               </p>
               
               <div className="flex flex-wrap gap-6 items-center">
                 <Link href="/shop" className="group relative overflow-hidden rounded-full bg-accent px-12 py-6 text-[11px] font-black uppercase tracking-widest text-white shadow-3xl transition-all hover:scale-105 active:scale-95">
                   <span className="relative z-10">Shop Collection.</span>
                   <div className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 group-hover:translate-x-0"></div>
                   <span className="absolute inset-0 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-black z-20">Explore.</span>
                 </Link>
                 
                 <Link href="/about" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all">
                    <span>Our Story</span>
                    <div className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-accent transition-all duration-500"></div>
                 </Link>
               </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <span className="text-[9px] font-black uppercase tracking-[0.5em] origin-center -rotate-90 h-12">Scroll</span>
           <div className="h-10 w-px bg-white"></div>
        </div>
        
        {/* Corner Badge */}
        <div className="absolute top-32 right-12 hidden xl:block">
           <div className="relative h-32 w-32 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                 <path id="circlePath" fill="none" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" />
                 <text className="text-[8px] font-black uppercase tracking-[0.3em] fill-white/20">
                    <textPath xlinkHref="#circlePath">Artisan Quality • Curated Style • </textPath>
                 </text>
              </svg>
              <div className="h-1 w-1 rounded-full bg-accent"></div>
           </div>
        </div>
      </section>

      {/* Categories Grid - Pushed down to clear hero text */}
      <section className="relative z-20 mt-12 container-padded">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 backdrop-blur-2xl rounded-[3.5rem] shadow-3xl border border-white/10 overflow-hidden">
           {categories.map((cat, i) => (
              <Link 
                key={cat} 
                href={`/shop?category=${cat}`} 
                className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-primary transition-all duration-700 hover:shadow-2xl"
              >
                 <Image 
                   src={i === 0 ? "/products/gown 1.jpg" : i === 1 ? "/products/women shoes 1.jpg" : i === 2 ? "/products/school bags 1.jpg" : "/products/food flasks 1.jpg"}
                   alt={cat}
                   fill
                   sizes="(max-width: 768px) 50vw, 25vw"
                   priority={i < 4}
                   className="object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                 <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent">Collection.</span>
                    <h3 className="font-[var(--font-heading)] text-2xl font-black text-white leading-none">{cat}</h3>
                 </div>
              </Link>
           ))}
        </div>
      </section>

      {/* Featured Selections */}
      <section className="container-padded py-40 sm:py-56">
        <div className="flex flex-col items-center text-center space-y-12 mb-24">
          <div className="space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">Signature Series</span>
             <h2 className="font-[var(--font-heading)] text-6xl font-black tracking-tight text-primary sm:text-7xl">
                THE ARTISAN <br /> <span className="text-muted/20">COLLECTION.</span>
             </h2>
          </div>
          <div className="h-12 w-px bg-gray-100"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <div key={product.id} className="animate-floatIn" style={{ animationDelay: `${index * 150}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pt-24 text-center">
           <Link href="/shop" className="group flex flex-col items-center gap-4">
              <div className="h-20 w-20 flex items-center justify-center rounded-full border-2 border-gray-100 group-hover:border-accent group-hover:bg-accent transition-all duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:text-white transition-all group-hover:translate-x-1"><path d="M5 12h14 m-7-7l7 7-7 7"/></svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted/60 group-hover:text-primary transition-colors">View All Works</span>
           </Link>
        </div>
      </section>

      {/* Join the Collective */}
      <section className="container-padded">
         <div className="relative overflow-hidden rounded-[5rem] bg-primary group shadow-3xl">
            <div className="relative z-10 grid lg:grid-cols-2">
               <div className="p-12 sm:p-20 space-y-12 flex flex-col justify-center">
                  <div className="space-y-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-accent">Newsletter.</span>
                     <h2 className="font-[var(--font-heading)] text-6xl sm:text-7xl font-black tracking-tighter leading-none text-white">
                        THE ARTISAN <br /> <span className="italic text-accent">COLLECTIVE.</span>
                     </h2>
                  </div>
                  <p className="max-w-md text-xl text-white/50 font-light leading-relaxed">
                     Join our inner circle for early access to limited edition drops, designer stories, and private artisan showcases.
                  </p>
                  <form className="relative max-w-lg">
                     <input 
                       type="email" 
                       placeholder="Enter your email" 
                       className="w-full rounded-full bg-white/5 border border-white/10 px-10 h-24 text-sm placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-accent transition-all pr-48 text-white" 
                     />
                     <button className="absolute right-3 top-3 bottom-3 px-10 rounded-full bg-white text-primary font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all">
                        Subscribe.
                     </button>
                  </form>
               </div>
               
               <div className="relative h-[600px] lg:h-full overflow-hidden">
                  <Image 
                    src="/products/women bags 1.jpg" 
                    alt="Collective Preview" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-[2s] scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-primary via-transparent to-primary lg:from-transparent"></div>
               </div>
            </div>
         </div>
      </section>
      
      {/* Brand Signature */}
      <div className="container-padded mt-40">
         <div className="flex flex-col md:flex-row justify-between items-start gap-20 pb-20 border-b border-gray-100">
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black">U</div>
                  <h3 className="font-[var(--font-heading)] text-4xl font-black tracking-tighter text-primary">UZZYBLOOMING<span className="text-accent">.</span></h3>
               </div>
               <p className="max-w-md text-sm text-muted/60 leading-relaxed font-light">
                  A curated lifestyle sanctuary dedicated to the modern woman and child. Hand-picking only the most elegant, durable, and practical artisan pieces for your home.
               </p>
            </div>
            
            <div className="flex flex-col items-end gap-6 text-right">
               <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 w-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary transition-all group">
                       <div className="h-1.5 w-1.5 rounded-full bg-accent group-hover:bg-white transition-colors"></div>
                    </div>
                  ))}
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Portfolio By CodeCrafting</p>
                  <p className="text-[9px] font-bold text-muted/20 uppercase tracking-[0.3em]">Artisan Frontend Engineering • 2024</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
