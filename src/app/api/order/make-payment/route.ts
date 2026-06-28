import { db } from '@/src/lib/db/connection';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, cartId, items, subtotal, shippingCharge, discountAmount, totalAmount, paymentMethod, transactionId } = body;
        // Use a transaction to ensure all or nothing is saved
       console.log("cartId -->", cartId)
        const result = await db.$transaction(async (tx) => {
            // 1. Create the Order
            const order = await tx.order.create({
                data: {
                    orderNumber: `ORD-${Date.now()}`,
                    userId,
                    subtotal,
                    shippingCharge,
                    discountAmount,
                    totalAmount,
                    paymentMethod,
                    paymentStatus: "PAID",
                    orderStatus: "PENDING",
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.productId,
                            weight: item.weight,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            totalPrice: item.totalPrice,
                        })),
                    },
                },
            });

            // 2. Create the Payment record
            await tx.payment.create({
                data: {
                    orderId: order.id,
                    gateway: "Stripe",
                    transactionId: transactionId,
                    amount: totalAmount,
                    status: "PAID",
                },
            });

            // 3. REMOVE the items from the cart
            // You can delete all items associated with this cartId
            await db.cartItem.deleteMany({
                where: {
                    cartId: cartId,
                },
            });

            return order;
        });

        return NextResponse.json({ success: true, orderId: result.id });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}