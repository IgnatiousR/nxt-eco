'use server'

import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validator";

export async function addItemToCart(data: CartItem) {

    try{
        //Check for cart cookie
        const sessionCartid = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartid) throw new Error("Cart session was not found");

        
        //Get session and user Id
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        //Get cart
        const cart = await getMyCart();

        //Parse and validate items
        const item = cartItemSchema.parse(data);

        //Find product from data
        const product = await prisma.product.findFirst({
            where: {id: item.productId}
        })
        
        // console.log('Session cart id: ',sessionCartid, 'UserId: ', userId, 'Items requested: ', item, "Product requested: ", product,);
        
        return {
            success: true,
            message: 'Item add to cart',
        };
    } catch(error){
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function getMyCart() {
    //Check for cart cookie
    const sessionCartid = (await cookies()).get('sessionCartId')?.value;
    if(!sessionCartid) throw new Error("Cart session was not found");

    
    //Get session and user Id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Get  user cart from database 
    const cart = await prisma.cart.findFirst({
        where: userId? { userId: userId } : {sessionCartId: sessionCartid }
    });

    if(!cart) return undefined;

    //Convert decimals and return
    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });
}