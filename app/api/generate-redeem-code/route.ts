import prisma from "@/app/libs/prismadb";
import * as crypto from "crypto";
import {dailyDownloadPlan, monthlyDownloadPlan, creditPlan} from "@/app/data/plans";

export async function POST(req: Request) {
    const body = await req.json();
    const {planCode, email} = body;
    try {
        if (!email || !planCode) {
            return Response.json({
                message: 'Invalid Request'
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
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

        const plan = [...dailyDownloadPlan, ...monthlyDownloadPlan, ...creditPlan].find(plan => plan.code === planCode);

        if (!plan) {
            return Response.json({
                message: 'Invalid Plancode'
            }, {
                status: 400
            })
        }

        const code = crypto.randomBytes(5).toString('hex');

        const redeemCode = await prisma.redeemCode.create({
            data: {
                code: code,
                planCode: planCode,
                name: plan.name,
            }
        });

        if (!redeemCode) {
            return Response.json({
                message: 'Failed to generate redeem code'
            }, {
                status: 500
            });
        }

        return Response.json({
            message: 'Redeem code generated successfully',
            success: true,
            data: redeemCode
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}