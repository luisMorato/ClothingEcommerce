const MoreInfo = () => {
    return(
        <div 
            className="flex flex-col items-center justify-center gap-20 mt-20 w-full px-3
            lg:flex-row
            lg:px-0"
        >
            <div 
                className="flex flex-col items-center justify-center text-left py-16 px-2 relative border border-neutral-400
                md:w-3/5
                lg:w-1/3"
            >
                <h2 className="absolute top-0 -translate-y-3 left-1/2 -translate-x-1/2 text-xl text-nowrap bg-white px-1">Changes and Devolution</h2>
                <div className="w-3/4">
                    <p className="mb-5">DISCOVER EASY EXCHANGE</p>
                    <p className="text-wrap mb-5">It is simple and practical to exchange your products at more than 300 of Our Stores.</p>
                    <p>I want to know how to change</p>
                </div>
            </div>
            <div 
                className="flex flex-col items-center justify-center py-14 px-5 relative border border-neutral-400 w-full 
                md:w-3/5
                lg:w-1/3"
            >
                <h2 className="absolute top-0 -translate-y-3 left-1/2 -translate-x-1/2 text-xl text-nowrap bg-white px-1">Payment Methods</h2>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between mb-5">
                        <p>LOGO CARD</p>
                        <p> up to 7X interest-free</p>
                    </div>
                    <div className="flex justify-between mb-5">
                        <p>OTHER CARDS</p>
                        <p>up to 6X interest-free</p>
                    </div>
                    <div className="flex justify-between mb-5">
                        <p>TICKET</p>
                        <p>in cash</p>
                    </div>
                    <div className="flex justify-between">
                        <p>PIX</p>
                        <p>instant payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo;