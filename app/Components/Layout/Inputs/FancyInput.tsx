'use client';
import { inputProps } from "@/app/Types/route";

const FancyInput = ({ 
    id,
    name,
    type='text',
    label,
    value,
    disabled,
    required,
    register,
    errors
}: inputProps) => {
    return(
        <div className={`relative w-full border rounded-md flex items-center
        ${errors[id] ? 'border-rose-500' : 'border-neutral-400'}
        `}>
            <input
                id={id}
                {...register(name, { required: required || false })}
                placeholder=" "
                type={type}
                value={value}
                disabled={disabled}
                maxLength={type === "password" ? 6 : undefined}
                className={`w-full rounded-md pl-2 h-full py-2 disabled:cursor-not-allowed text-neutral-400 focus:outline-none peer
                ${errors[id] ? 'focus:border-rose-500' : ''}
                `}
            />
            <label className="absolute ml-2 text-sm bg-white text-neutral-400 pointer-events-none -translate-y-full translate duration-150 peer-focus:-translate-y-full peer-focus:text-xs peer-placeholder-shown:translate-y-0" htmlFor={id}>{label}</label>
        </div>
    )
}

export default FancyInput;