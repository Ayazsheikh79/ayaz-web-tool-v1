import prisma from '@/app/libs/prismadb'
import { Cashfree } from "cashfree-pg";

const clientId = process.env.CASHFREE_CLIENT_ID
const clientSecret = process.env.CASHFREE_CLIENT_SECRET

Cashfree.XClientId = clientId
Cashfree.XClientSecret = clientSecret
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required'
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            })
        }

        const timeStamp = Date.now()
        const orderId = `order_${timeStamp}`

        const amount = 1
        const plancode = 1

        const order = await prisma.order.create({
            data: {
                orderId,
                orderAmount: amount,
                plancode,
                userId: user.id,
            }
        })

        if (!order) {
            return Response.json({
                message: 'Order failed'
            }, {
                status: 500
            })
        }

        const request = {
            "orderId": `${orderId}`,
            "order_amount": 1,
            "order_currency": "INR",
            "customer_details": {
                "customer_id": `${user.id}`,
                "customer_name": `${user.name}`,
                "customer_email": `${user.email}`,
                "customer_phone": "9999999999"
            },
            "order_meta": {
                "return_url": "https://premiumgfx.shop"
            },
            "order_note": ""
        }

        const cashfreeOrder = await Cashfree.PGCreateOrder("2022-09-01", request)

        if (!cashfreeOrder) {
            return Response.json({
                message: 'Order failed'
            }, {
                status: 500
            })
        }

        return Response.json({
            message: 'Order created',
            data: cashfreeOrder.data
        }, {
            status: 200
        })

    } catch (e) {
        console.error(e);
        return Response.json({
            message: 'Internal server error',
        }, {
            status: 500
        })
    }
}