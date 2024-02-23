import Link from "next/link";

import data from "@/public/Data/FakeApi.json";
const { footerInfo } = data;

import ContactUs from "@/app/Components/Layout/ContactUs";
import PaymentMethods from "@/app/Components/Layout/PaymentMethods";

const Footer = () => {
    return(
        <footer className="border-t-[1px] pt-16">
            <div 
                className="flex flex-col justify-center pb-12
                sm:mx-auto
                md:mx-0
                md:flex-row
                md:justify-between
                lg:justify-center"
            >
                <div 
                    className="flex justify-evenly gap-4 w-full 
                    md:w-1/2
                    lg:w-[60%]"
                >
                    <section>
                        <h2 
                            className="font-bold text-base mb-6 
                            md:text-xl"
                        >Help</h2>
                        <nav>
                            <ul>
                                {footerInfo.helpItems.map((item) => (
                                    <li className="font-light text-sm text-neutral-500 pb-3 hover:font-semibold sm:text-base" key={item}>
                                        <Link href={`/${item}`}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>
                    <section 
                        className="hidden 
                        sm:block 
                        md:hidden
                        lg:block"
                    >
                        <h2 className="font-bold text-base mb-6 md:text-xl">Institucional</h2>
                        <nav>
                            <ul>
                                {footerInfo.institucionalItems.map((item) => (
                                    <li className="font-light text-sm text-neutral-500 pb-3 hover:font-semibold sm:text-base" key={item}>
                                        <Link href={`/${item}`}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>
                    <section>
                        <h2 
                            className="font-bold text-base mb-6 md:text-xl">Customer Services</h2>
                        <nav>
                            <ul>
                                {footerInfo.customerServiceItems.map((item) => (
                                    <li className="font-light text-sm text-neutral-500 pb-3 hover:font-semibold sm:text-base" key={item}>
                                        <Link href={`/${item}`}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>
                </div>
                <div 
                    className="flex flex-col w-[96%] px-3 mt-3 pt-5 border-t mx-auto
                    sm:w-[80%]
                    sm:self-center
                    sm:px-0
                    sm:pt-5
                    sm:border-t
                    md:px-3
                    md:mt-0
                    md:mx-0
                    md:self-start
                    md:border-none
                    md:pt-0
                    md:w-1/2
                    lg:w-[30%]"
                >
                    <ContactUs />
                    <PaymentMethods />
                </div>
            </div>
            <div>
                <p className="text-sm text-center border-t-[1px] border-t-neutral-300 w-[96%] mx-auto py-2
                sm:text-base">© Powered By <b>Luis Fernando</b> | 2024</p>
            </div>
        </footer>
    )
}

export default Footer;