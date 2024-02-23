'use client';
import { defaultInputProps } from "@/app/Types/route";

const DefaultInput = ({
    id,
    name,
    type='text',
    label,
    placeholder,
    placeholderSm,
    disabled,
    icon: Icon,
    iconPositioning,
    roundedNone,
    onchange,
    onClick,
    onkeyup
}: defaultInputProps) => {
    return(
        <div>
            {label && <label className="ml-2 text-neutral-500" htmlFor={id}>{label}</label>}
            <div className={`relative mt-[2px] border border-neutral-400
            ${roundedNone ? 'rounded-none' : 'rounded-[24px]'}`}>
                <input
                    onChange={(e) => onchange !== undefined && onchange(e.target.value)}
                    onKeyUp={(e) => onkeyup !== undefined && onkeyup(e)}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    disabled={disabled}
                    className={`
                    focus:outline-none peer text-neutral-400 text-base bg-transparent rounded-[24px] placeholder:text-neutral-300 w-full py-1 px-2 disabled:cursor-not-allowed
                    ${Icon ? iconPositioning === "left" ? 'pl-11 py-1' : 'pr-11 pl-3 py-[2px]' : ''}
                    ${placeholderSm ? "placeholder:text-sm" : "placeholder:text-base "}
                    `}
                />
                <div 
                    className={`
                    absolute top-1 h-[72%] flex items-center bg-transparent text-neutral-400 peer-focus:text-black
                    ${Icon ? iconPositioning === "left" ? 'left-1 ml-2 border-r border-r-neutral-400 pr-2' : 'right-1 mr-2 border-l border-l-neutral-400 pl-2' : ''}
                    `}
                >
                    {Icon && <Icon
                        onClick={() => onClick !== undefined && onClick()}
                        className="text-lg cursor-pointer"
                    />}
                </div>
            </div>
        </div>
    )
}

export default DefaultInput;