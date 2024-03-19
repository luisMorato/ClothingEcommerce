import Link from 'next/link';

import { 
    FaInstagram, 
    FaLinkedin, 
    FaYoutube, 
    FaGithub 
} from 'react-icons/fa';

import ContactUsForm from '@/app/Components/Layout/ContactUsForm';

const ContactUs = () => {
    return(
        <section className='mb-6'>
            <h2 className="font-bold text-xl mb-6">Find Us</h2>
            <div className='mb-8'>
                <ul className='flex gap-6 w-fit'>
                    <li className='hover:-translate-y-1'>
                        <Link href='https://www.instagram.com/l0u1s_f3r/' target='_blank'>
                            <FaInstagram className='text-3xl' />
                        </Link>
                    </li>
                    <li className='hover:-translate-y-1'>
                        <Link href='https://www.linkedin.com/in/luis-fernando-morato-da-conceição-985123223/' target='_blank'>
                            <FaLinkedin className='text-3xl' />
                        </Link>
                    </li>
                    <li className='hover:-translate-y-1'>
                        <Link href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' target='_blank'>
                            <FaYoutube className='text-3xl' />
                        </Link>
                    </li>
                    <li className='hover:-translate-y-1'>
                        <Link href='https://github.com/luisMorato?tab=repositories' target='_blank'>
                            <FaGithub className='text-3xl' />
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ContactUsForm />
            </div>
        </section>
    )
}

export default ContactUs;