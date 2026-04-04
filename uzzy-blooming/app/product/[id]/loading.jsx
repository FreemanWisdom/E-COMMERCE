export default function Loading() {
  return (
    <div className="container-padded py-12 animate-pulse space-y-12">
      <div className="h-4 w-32 bg-gray-100 rounded-full mb-8"></div>
      
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-[4/5] w-full bg-gray-200 rounded-[2.5rem]"></div>
        
        <div className="flex flex-col justify-center space-y-8 lg:pl-8">
           <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
              <div className="h-16 w-full max-w-sm bg-gray-200 rounded-2xl"></div>
              <div className="h-10 w-32 bg-gray-100 rounded-full"></div>
           </div>
           
           <div className="space-y-6 border-y border-gray-100 py-8">
              <div className="space-y-3">
                 <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                 <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                 <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
              </div>
              
              <div className="space-y-4 pt-4">
                 <div className="h-4 w-12 bg-gray-100 rounded-full"></div>
                 <div className="flex gap-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 w-24 bg-gray-100 rounded-full"></div>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="h-16 flex-1 bg-gray-200 rounded-full"></div>
              <div className="h-16 w-16 bg-gray-100 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
