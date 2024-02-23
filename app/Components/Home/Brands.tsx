import Image from "next/image";

const Brands = () => {
    return(
        <div 
            className="grid grid-cols-2 w-fit gap-16 mx-auto my-12
            md:grid-cols-3
            lg:flex 
            lg:flex-row 
            lg:items-center 
            lg:justify-evenly
            "
        >
            <div className="w-[132px] h-[80px] relative">
                <Image src='/Images/Icons/adidas_logo_icon.png' alt='Adidas Icon' fill quality={70} sizes="132px" />
            </div>
            <div className="w-[132px] h-[120px] relative">
                <Image src='/Images/Icons/polowear-icon.png' alt='Polo Wear Icon' fill quality={70} sizes="132px" />
            </div>
            <div className="w-[132px] h-[80px] relative">
                <Image src='/Images/Icons/Logo-gucci.png' alt='Gucci Icon' fill quality={70} sizes="132px" />
            </div>
            <div className="w-[132px] h-[80px] relative">
                <Image src='/Images/Icons/Nike-Logo.png' alt='Nike Icon' fill quality={70} sizes="132px" />
            </div>
            <div className="w-[132px] h-[80px] relative">
                <Image src='/Images/Icons/Louis-Vuitton-Logo.png' alt='Louis Vuitton Icon' fill quality={70} sizes="132px" />
            </div>
        </div>
    )
}

export default Brands;