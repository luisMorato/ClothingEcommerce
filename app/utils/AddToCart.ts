import toast from "react-hot-toast";
import { productToAddProps } from "@/app/Types/route";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const AddProduct = async (productToAdd: productToAddProps) => {
    const url = `${domain}/api/CartApi`;
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(productToAdd),
            } 
        )
        const resJson = await response.json();
        if(resJson.success) toast.success(resJson.success);
        else toast.error(resJson.error);
    } catch (error) {
        console.log('error: ', error);
        toast.error('Error processing the request. Please, try again');
    }
}