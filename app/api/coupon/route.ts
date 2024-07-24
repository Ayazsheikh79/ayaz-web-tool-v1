import prisma from "@/app/libs/prismadb";
import * as crypto from "crypto";

export async function POST(req: Request) {
    const body = await req.json();
    const {email, planCode} = body;

    const options = [
        {label: 'FreePik - 1 month', planCode: 1},
        {label: 'FreePik - 3 months', planCode: 2},
        {label: 'FreePik - 6 months', planCode: 3},
    ]

    try {
        if (!email ) {
            return Response.json({
                message: 'Email is required'
            }, {
                status: 400
            });
        }
        if (!planCode) {
            return Response.json({
                message: 'Plan code is required'
            }, {
                status: 400
            });
        }
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            });
        }
        if (user.role !== 'admin') {
            return Response.json({
                message: 'You are not authorized to perform this action'
            }, {
                status: 403
            });
        }

        const code = crypto.randomBytes(5).toString('hex');

        const redeemCode = await prisma.redeemCode.create({
            data: {
                code: code,
                planCode: planCode,
                // @ts-ignore
                name: options.find(option => option.planCode === planCode).label,
            }
        });

        return Response.json({
            message: 'Coupon created successfully',
            data: redeemCode
        }, {
            status: 201
        });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Something went wrong',
            error: error
        }, {
            status: 400
        });
    }
}