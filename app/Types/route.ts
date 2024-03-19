import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

//PRODUCTS PROPS
export type productsProps = {
    id: number,
    title: string,
    price: number,
    description: string,
    PieceDetails?: string[],
    country: string,
    Manufacturer: string,
    category: string[],
    sizes: string[],
    color: string[],
    gender: string,
    freeShipping: boolean,
    hot: boolean,
    image: string[],
    rating: {
        rate: number,
        count: number
    }
}

export type productToAddProps = {
    productId: number | null,
    quantity: number,
    size: string,
}


// INPUT TYPES
export type inputProps = {
    id: string,
    name: string,
    type?: string,
    label?: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    icon?: IconType,
    iconPositioning?: string,
};

export type defaultInputProps = {
    id: string,
    name: string,
    type?: string,
    label?: string,
    placeholder?: string,
    placeholderSm?: boolean,
    disabled?: boolean,
    icon?: IconType,
    iconPositioning?: string,
    roundedNone?: boolean, 
    onchange?: (value: string) => void,
    onClick?: () => void,
    onkeyup?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}


//BUTTON TYPES
export type buttonProps = {
    children: React.ReactNode,
    id: string,
    type?: "button" | "submit" | "reset" | undefined,
    icon?: IconType,
    outline?: boolean,
    roundedMd?: boolean, 
    disabled?: boolean,
    onClick?: () => void 
}