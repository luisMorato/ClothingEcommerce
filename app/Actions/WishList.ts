import { auth } from "@/auth";
import { db } from "@/app/lib/db";
import { getUserById } from "@/app/utils/GetUser";

export const addProductToWishList = async (productId: number) => {
    const session = await auth();
    if(!session|| !session.user){
        return ({ error: "No Users Logged", ok: false, status: 422 });
    }

    const existingUser = await getUserById(session.user.id as string);

    if(!existingUser){
        return ({ error: "User Doesn't Have an Account", ok: false, status: 422 });
    }

    const wishList = await db.wishList.findUnique({
        where: {
            userId: existingUser.id,
        }
    });

    if(!wishList){
        await db.wishList.create({
            data: {
                userId: existingUser.id,
                addedAt: new Date,
                productsId: []
            }
        });
    }

    const wishListProducts = await db.wishList.findUnique({
        where: {
            userId: existingUser.id,
        },
        select: {
            productsId: true
        }
    });

    const existingProduct = wishListProducts?.productsId.includes(productId);

    if(existingProduct){
        return ({error: 'Product Already in WishList', ok: false, status: 400 });
    }

    const add = await db.wishList.update({
        where: {
            userId: existingUser.id,
        },
        data: {
            productsId: {
                push: productId,
            }
        }
    });

    if(add){
        return ({success: 'Product Added Successfully', ok: true, status: 200 });
    }
    return ({error: 'Something Went Wrong', ok: false, status: 400 });
}

export const removeFromWishList = async (userId: string, productId: number) => {
    const wishList = await db.wishList.findUnique({
        where: {
            userId: userId
        }
    })
    
    if(wishList){
        return await db.wishList.update({
            where: {
                userId: userId,
            },
            data: {
                productsId: {
                    set: wishList.productsId.filter(( id ) => id !== productId)
                }
            }
        });
    }
}

export const getWishListData = async (userId: string) => {
    if(!userId){
        return ({ error: 'Something Went Wrong', ok: false, status: 400 });
    }

    const existingUser = await getUserById(userId);

    if(!existingUser){
        return ({ error: "User Doesn't Have an Account", ok: false, status: 422 });
    }

    const wishlistProductsId = await db.wishList.findUnique({
        where: {
            userId: existingUser.id,
        },
        select: {
            productsId: true
        }
    });

    if(wishlistProductsId){
        return ({wishListData: wishlistProductsId.productsId, success: 'Ok', ok: true, status: 200 });
    }
    return ({error: 'Something Went Wrong', ok: false, status: 400 });
}