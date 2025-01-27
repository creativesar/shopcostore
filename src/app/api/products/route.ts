// import { client } from "@/sanity/lib/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     try {
//         const data = await client.fetch(`
//             *[_type=="products"]{
//                 _id,
//                 name,
//                 description,
//                 price,
//                 "imageUrl" : image.asset->url,
//                 category,
//                 discountPercent,
//                 "isNew": new,
//                 colors,
//                 sizes
//             }
//         `);
//         return NextResponse.json(data);
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//     }
// }

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const result = await client.create({
//             _type: 'products',
//             ...body
//         });
//         return NextResponse.json(result, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
//     }
// }
