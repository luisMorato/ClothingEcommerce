import { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa";

type genderProps= {
    setGender: React.Dispatch<SetStateAction<string>>,
    gender: string
}

const Gender = ({ setGender, gender }: genderProps) => {
    return(
        <div className="mb-6">
            <h2 className='text-2xl mb-3'>Gender</h2>
            <div className="px-3">
                <div className="flex items-center gap-2">
                    <div className='relative'>
                        <input
                            className="
                                peer
                                appearance-none
                                w-3 h-3
                                border
                                border-neutral-400
                                cursor-pointer
                            "
                            checked={gender === "male"}
                            id="male"
                            type="radio"
                            name="genderInput"
                            onChange={(e) => setGender(e.target.id)}
                        />
                        <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                    </div>
                    <label className="text-xs font-medium" htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-2">
                    <div className='relative'>
                        <input
                            className="
                                peer
                                appearance-none
                                w-3 h-3
                                border
                                border-neutral-400
                                cursor-pointer
                            "
                            checked={gender === "female"}
                            id="female"
                            type="radio"
                            name="genderInput"
                            onChange={(e) => setGender(e.target.id)}
                        />
                        <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                    </div>
                    <label className="text-xs font-medium" htmlFor="female">Female</label>
                </div>
                <div className="flex items-center gap-2">
                    <div className='relative'>
                        <input
                            className="
                                peer
                                appearance-none
                                w-3 h-3
                                border
                                border-neutral-400
                                cursor-pointer
                            "
                            id="unissex"
                            type="radio"
                            name="genderInput"
                            onChange={(e) => setGender(e.target.id)}
                        />
                        <FaCheck className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none hidden peer-checked:block' />
                    </div>
                    <label className="text-xs font-medium" htmlFor="unissex">Unissex</label>
                </div>
            </div>
        </div>
    )
}

export default Gender;