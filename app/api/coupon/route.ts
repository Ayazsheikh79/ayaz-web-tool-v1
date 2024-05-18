import prisma from "@/app/libs/prismadb";
import * as crypto from "crypto";

export async function POST(req: Request) {
    const body = await req.json();
    const {email, planCode, credit} = body;
    console.log(body);

    const options = [
        {label: 'Envato - Basic', planCode: 11},
        {label: 'Envato - Standard', planCode: 21},
        {label: 'Envato - Premium', planCode: 31},

        {label: 'FreePik - Basic', planCode: 12},
        {label: 'FreePik - Standard', planCode: 22},
        {label: 'FreePik - Premium', planCode: 32},

        {label: 'Envato - Basic - 100 - 1 Month', planCode: 14},
        {label: 'Envato - Standard - 200 - 1 Month', planCode: 24},
        {label: 'Envato - Premium - 300 - 1 Month', planCode: 34},

        {label: 'Freepik - Basic - 100 - 1 Month', planCode: 15},
        {label: 'Freepik - Standard - 200 - 1 Month', planCode: 25},
        {label: 'Freepik - Premium - 300 - 1 Month', planCode: 35},

        {label: 'On Demand Credits', planCode: 99}
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
                credit: credit,
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