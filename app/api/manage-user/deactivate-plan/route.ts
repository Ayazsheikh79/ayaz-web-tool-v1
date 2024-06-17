import prisma from "@/app/libs/prismadb";
import {dailyDownloadPlan, monthlyDownloadPlan} from "@/app/data/plans";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    try {
        if (!id) {
            return Response.json({
                message: 'ID is required',
            }, {
                status: 400
            })
        }

        const plan = await prisma.plan.findUnique({
            where: {
                id: id
            }
        })

        if (!plan) {
            return Response.json({
                message: 'Plan not found',
            }, {
                status: 404
            })
        }

        const planDoc = [...dailyDownloadPlan, ...monthlyDownloadPlan].find(plan => plan.code === plan.code);

        if (!planDoc) {
            return Response.json({
                message: 'Plan not found',
            }, {
                status: 404
            })
        }

        if (planDoc.code === 1 || planDoc.code === 2 || planDoc.code === 3 || planDoc.code === 4) {
            await prisma.dailyLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    limit: 0,
                    code: 0
                }
            })
        }

        if (planDoc.code === 5 || planDoc.code === 6 || planDoc.code === 7 || planDoc.code === 8) {
            await prisma.monthlyLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    limit: 0,
                    code: 0
                }
            })
        }

        const deactivatePlan = await prisma.plan.update({
            where: {
                id: plan.id
            },
            data: {
                active: false,
                endDate: new Date()
            }
        })

        return Response.json({
            message: 'success',
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error)
        return Response.json({
            message: 'Internal Server Error',
        }, {
            status: 500
        })
    }
}