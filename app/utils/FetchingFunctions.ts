'use server';
import { productsProps } from "../Types/route";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const FetchProducts = async (): Promise<Array<productsProps> | undefined> => {
    const productsUrl = `${domain}/api/FetchProducts`;

    try {
        const response = await fetch(productsUrl,
            {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                }
            }
        );

        const resJson = await response.json();
        return resJson.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

export const FetchCartProducts = async (currentUserId: string) => {
    const cartUrl = `${domain}/api/FetchCartData?id=${currentUserId}`;

    try {
        const response = await fetch(cartUrl, 
            {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                }
        });
        const resJson = await response.json();
        return resJson.cartData;
    } catch (error) {
        console.log('error: ', error);
    }
}

export const FetchWishList = async () => {
    const wishListUrl = `${domain}/api/FetchWishListData`;

    try {
        const response = await fetch(wishListUrl, 
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                }
            }
        );

        const resJson = await response.json();
        return resJson.wishListData;
    } catch (error) {
        console.log('error: ', error);
    }
}