import { NextResponse } from 'next/server';

import data from '@/public/Data/FakeApi.json';

export const GET = async (req: Request) => {
    try {
        const { products } = await data;

        if(products) return NextResponse.json({ data: products, ok: true, status: 200 });
        else return NextResponse.json({ data: products, ok: false, status: 400 });
    } catch (error: any) {
        console.log("error: ", error);
    }
}