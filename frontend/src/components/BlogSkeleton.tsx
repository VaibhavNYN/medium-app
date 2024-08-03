
export const BlogSkeleton = () =>{
    return <div role="status" className="space-y-8 animate-pulse">
        <div className="w-full py-2">
                <div className="flex items-center">
                    <svg className="mb-2 w-6 h-6 text-gray-200 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div className="flex justify-center flex-col w-20 h-1.5 bg-gray-200 rounded-full me-3"></div>
                    <div className="flex justify-center flex-col px-2"><Circle/></div>
                    <div className="flex justify-center flex-col w-24 h-1.5 bg-gray-200 rounded-full"></div>
                </div>
            <div className="h-3.5 bg-gray-200 rounded-full w-48 mb-3"></div>
            <div className="h-1.5 bg-gray-200 rounded-full max-w-[100px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[400px]  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
    
    
    
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-200"></div>}