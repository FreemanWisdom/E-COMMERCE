export default function Loading() {
  return (
    <div className="container-padded py-12 animate-pulse">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-4">
          <div className="h-12 w-64 bg-gray-200 rounded-2xl"></div>
          <div className="h-4 w-96 bg-gray-100 rounded-full"></div>
        </div>
      </div>
      
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-8">
           <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
           <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-100 rounded-full"></div>
              ))}
           </div>
        </aside>
        
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="space-y-6">
                <div className="aspect-[4/5] w-full bg-gray-200 rounded-[2rem]"></div>
                <div className="flex flex-col items-center space-y-2">
                   <div className="h-2 w-12 bg-gray-100 rounded-full"></div>
                   <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
                   <div className="h-3 w-16 bg-gray-100 rounded-full"></div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
