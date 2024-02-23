import DefaultInput from "../../Layout/Inputs/DefaultInput";

const BillingDetailsForm = () => {
    return(
        <form className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4
            sm:flex-row">
                <DefaultInput
                    id="userFisrtName"
                    name="userFisrtName"
                    type="text"
                    label="Fisrt Name *"
                />
                <DefaultInput
                    id="userLastName"
                    name="userLastName"
                    type="text"
                    label="Last Name *"
                />
            </div>
            <div className="flex flex-col justify-between gap-4
            sm:flex-row">
                <DefaultInput
                    id="country"
                    name="country"
                    type="text"
                    label="Country *"
                />
                <DefaultInput
                    id="state"
                    name="state"
                    type="text"
                    label="State *"
                />
            </div>
            <div className="flex flex-col justify-between gap-4
            sm:flex-row">
                <DefaultInput
                    id="city"
                    name="city"
                    type="text"
                    label="City *"
                />
                <DefaultInput
                    id="street"
                    name="street"
                    type="text"
                    label="Street Address *"
                    placeholder="House 182, Flowers Street"
                    placeholderSm
                />
            </div>
            <div className="flex flex-col justify-between gap-4
            sm:flex-row">
                <DefaultInput
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    label="ZIP Code *"
                    placeholder="00000-000"
                    placeholderSm
                />
                <DefaultInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    label="Phone *"
                    placeholder="+0(00) 00000-0000"
                    placeholderSm
                />
            </div>
            <DefaultInput
                id="email"
                name="email"
                type="email"
                label="Email *"
                placeholder="JohnDoe@outlook.com"
                placeholderSm
            />
            <div className="flex items-center gap-2 mt-5">
                <input
                    id="receiveNews"
                    name="receiveNews"
                    type="checkbox"
                    className="peer"
                />
                <label className="text-sm text-neutral-400 peer-checked:text-black" htmlFor="receiveNews">Sign me up to receive email upodates and news. (optional)</label>
            </div>
            <div className="flex flex-col gap-3 mt-5">
                <label className=" text-neutral-400" htmlFor="OrderNotes">Order Notes. (optional)</label>
                <textarea
                    name="OrderNotes"
                    id="OrderNotes"
                    maxLength={100}
                    placeholder="Notes About Your Order. (100 Chacaraters Limit)"
                    className="min-h-[150px] max-h-[150px] w-full border border-neutral-400 px-3 py-1 placeholder:text-sm focus:outline-none"
                ></textarea>
            </div>
        </form>
    )
}

export default BillingDetailsForm;