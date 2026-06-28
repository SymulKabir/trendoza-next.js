import { db } from '@/src/lib/db/connection';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const headerList = await headers();
        const userId = headerList.get("x-user-id");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // 1. Get orders and items
        const orders = await db.order.findMany({
            where: { userId: userId },
            include: {
                items: true,
                payment: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        // 2. Get all unique product IDs from all orders to fetch them in one go
        const productIds = Array.from(new Set(
            orders.flatMap(order => order.items.map(item => item.productId))
        ));

        // 3. Fetch all those products at once
        const products = await db.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, images: true }
        });

        // 4. Map the products into the items
        const ordersWithProducts = orders.map(order => ({
            ...order,
            items: order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    ...item,
                    productName: product?.name || "Product Deleted",
                    // Safely handle the Json type for images
                    productImage: (product?.images as any)?.[0] || "/placeholder.png"
                };
            })
        }));

        return NextResponse.json({ success: true, orders: ordersWithProducts });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}