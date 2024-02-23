import { buttonProps } from "@/app/Types/route";

const Button = ({ 
    children,
    id,
    type,
    icon: Icon,
    outline,
    roundedMd,
    disabled,
    onClick
}: buttonProps) => {
    return(
        <div
            onClick={onClick}
            aria-disabled={disabled}
            className={`py-1 px-2 gap-2 flex items-center justify-center cursor-pointer aria-disabled:cursor-wait font-normal
                    ${outline ? 'border border-black bg-white text-black hover:bg-black hover:text-white' : ' bg-rose-500 text-white hover:bg-rose-500/80  aria-disabled:bg-rose-500/80'}
                    ${roundedMd ? 'rounded-md' : 'rounded-[24px]'}
                `}
        >
            { Icon && <Icon className="text-xl text-center"/>}
            <button
                id={id}
                disabled={disabled}
                type={type}
                className="w-full disabled:cursor-wait"
            >
                <span className="text-nowrap">{ children }</span>
            </button>
        </div>
    )
}

export default Button;