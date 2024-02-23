import Link from "next/link";

const TopMenu = () => {
    return(
        <nav className="self-center my-4">
            <ul className="flex items-center gap-7">
                <li 
                    className="text-sm font-semibold hover:underline
                    md:text-base"
                >
                    <Link href='/Products'>Sales</Link>
                </li>
                <li 
                    className="text-sm font-semibold hover:underline 
                    md:text-base"
                >
                    <Link href='#newProducts'>News</Link>
                </li>
                <li 
                    className="text-sm font-semibold hover:underline 
                    md:text-base"
                >
                    <Link href='/Products?gender=female'>Feminine</Link>
                </li>
                <li 
                    className="text-sm font-semibold hover:underline 
                    md:text-base"
                >
                    <Link href='/Products?gender=male'>Masculine</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href='/Products?category=children'>Children&apos;s</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href='#beauty'>Beauty</Link>
                </li>
                <li 
                    className="text-sm font-semibold hover:underline 
                    md:text-base"
                >
                    <Link href='#basics'>Basic</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href='/Products?category=pants'>Jeans</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href='/Accessories'>Accessories</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href='/Shoes'>Shoes</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    md:block"
                >
                    <Link href='/Products?category=sportClothes'>Sport</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    lg:block"
                >
                    <Link href=''>Beach Fashion</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    md:block"
                >
                    <Link href='/Products?category=underwearAndPajamas'>Underwear</Link>
                </li>
                <li 
                    className="font-semibold hover:underline hidden 
                    md:block"
                >
                    <Link href='/PartnerStores'>Partner Stores</Link>
                </li>
            </ul>
        </nav>
    )
}

export default TopMenu;