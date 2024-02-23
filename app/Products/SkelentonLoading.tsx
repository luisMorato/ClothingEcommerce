const SkeletonLoading = () => {
    const counter = 12;

    return (
        Array.from({length: counter}).map((index) => (
            <div key={index as number} className="relative animate-pulse bg-neutral-200 rounded-[24px] w-min overflow-hidden pb-4 mb-8 h-[450px]">
                <div className="bg-neutral-300 w-[276px] h-[300px]"></div>
                <div className="absolute top-[70%] w-full">
                    <div className="bg-neutral-300 h-5 w-3/4 mb-4 mx-auto"></div>
                    <div className="bg-neutral-300 h-5 w-1/4 mx-auto"></div>
                </div>
                <div className="absolute bg-neutral-300 bottom-5 left-1/2 -translate-x-1/2 w-[60%] h-8 rounded-3xl"></div>
            </div>
        ))
    )
    
}

export default SkeletonLoading;