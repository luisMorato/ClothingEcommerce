import { auth } from "@/auth";
import { db } from "@/app/lib/db";

import { getUserById } from "@/app/utils/GetUser";

export const AddCartProduct = async (productId: number, quantity?: number, size?: string) => {
    if(!productId){
        return ({ error: "Something Went Wrong", ok: false, status: 422 });
    }

    const session = await auth();
    if(!session || !session.user){
        return ({ error: "No Users Logged", ok: false, status: 422 });
    }

    const currentUser = await getUserById(session.user.id as string);

    if(!currentUser){
        return ({ error: "User Doesn't Have an Account", ok: false, status: 422 });
    }

    const cart = await db.cart.findUnique({
        where: {
            userId: currentUser.id,
        }
    });

    if(!cart){
        await db.cart.create({
            data: {
                userId: currentUser.id,
                products: undefined
            }
        });
    }

    const existingCartProduct = await db.cart.findUnique({
        where: {
           userId: currentUser.id,
        },
        select: {
            products: {
                where: {
                    productId: productId,
                    AND: {
                        cartId: cart?.id
                    }
                }
            }
        }
    });

    if(existingCartProduct?.products.length !== 0){
        const updateQuantity = await db.cart.update({
            where: {
                userId: currentUser.id,
            },
            data: {
                products: {
                    updateMany: {
                        where: {
                            productId: productId,
                            AND: {
                                cartId: cart?.id
                            }
                        },
                        data:{
                            quantity: {
                                increment: quantity || 1,
                            },
                            size: size
                        }
                    }
                }
            }
        });

        if(updateQuantity){
            return ({success: 'Product Added Successfully', ok: true, status: 200 });
        }
        return ({error: 'Something Went Wrong', ok: false, status: 400 });
    }

    const add = await db.cart.update({
        where: {
            userId: currentUser.id as string,
        },
        data: {
            products: {
                create: [
                    {
                        productId: Number(productId),
                        quantity: Number(quantity) || 1,
                        size: size || ""
                    }
                ]
            }
        }
    });

    if(!add){
        return ({error: 'Something Went Wrong', ok: false, status: 400 });
    }
    return ({success: 'Product Added Successfully', ok: true, status: 200 });
}

export const SubtractProduct = async (productId: number, quantity: number) => {
    const session = await auth();

    if(!session || !session.user){
        return ({ error: "No Users Logged", ok: false, status: 422 });
    }

    const currentUser = await getUserById(session.user.id as string);

    if(!currentUser){
        return ({ error: "User Doesn't Have an Account", ok: false, status: 422 });
    }

    const existingCartProduct = await db.cart.findUnique({
        where: {
            userId: currentUser.id,
        },
        select: {
            products: {
                where: {
                    productId: Number(productId),
                }
            }
        }
    });

    if(existingCartProduct?.products.some(({ quantity }) => quantity <= 1)){
        const remove = await RemoveCartProduct(currentUser.id, Number(productId));
        if(remove?.success){
            return ({success: remove.success, ok: remove.ok, status: remove.status });
        }
        return ({success: remove.error, ok: remove.ok, status: remove.status });
    }

    if(existingCartProduct?.products.some(({ quantity }) => quantity > 0)){
        const updateQuantity = await db.cart.update({
            where: {
                userId: currentUser?.id,
            },
            data: {
                products: {
                    updateMany: {
                        where: {
                            productId: Number(productId),
                        },
                        data: {
                            quantity: {
                                decrement: quantity || 1
                            },
                        }
                    }
                }
            }
        });

        if(updateQuantity){
            return ({success: 'Quantity Update Successfully', ok: true, status: 200 });
        }
        return ({error: 'Something Went Wrong', ok: false, status: 400 });
    }

}

export const RemoveCartProduct = async (userId: string, productId: number) => {
    const remove = await db.cart.update({
        where: {
            userId: userId,
        },
        data: {
            products: {
                deleteMany: {
                    productId: Number(productId)
                }
            }
        }
    });
    if(remove) return ({success: 'Product Removed Successfully', ok: true, status: 200 });
    return ({error: 'Something Went Wrong', ok: false, status: 400 });
}

export const GetCartData = async (userId: string) => {
    if(!userId){
        return ({ error: 'Something Went Wrong', ok: false, status: 400 });
    }

    const existingUser = await getUserById(userId);

    if(!existingUser){
        return ({ error: "User Not Registered", ok: false, status: 422 });
    }

    const cart = await db.cart.findUnique({
        where: {
            userId: existingUser.id,
        },
        include:{
            products: true
        }
    });

    if(cart){
        return ({cartData: cart.products, success: 'Ok', ok: true, status: 200 });
    }else{
        return ({error: 'Something Went Wrong', ok: false, status: 400 });
    }
}