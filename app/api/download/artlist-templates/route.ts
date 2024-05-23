import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST (req: Request) {
    const body = await req.json();
    const {url, userId} = body;
    try {
        if (!url || !userId) {
            return Response.json({
                message: 'Missing required fields'
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            })
        }

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                planCode: {
                    in: [41, 42, 43, 44, 45, 46]
                },
                active: true
            }
        });

        if (!plans) {
            return Response.json({
                message: 'You need to subscribe to a plan to download files'
            }, {
                status: 400
            })
        }

        const validPlans = plans.filter((plan) => {
            return plan.endDate > new Date()
        });

        if (validPlans.length === 0) {
            for (const plan of plans) {
                await prisma.plan.update({
                    where: {
                        id: plan.id
                    },
                    data: {
                        active: false
                    }
                })
            }
            return Response.json({
                message: `You don't have an active plan`
            }, {
                status: 400
            })
        }

        const limit = await prisma.artlistLimit.findUnique({
            where: {
                userId
            }
        });

        const monthlyLimit = await prisma.artlistMonthlyLimit.findUnique({
            where: {
                userId
            }
        });

        if (!limit || !monthlyLimit) {
            return Response.json({
                message: 'User limit not found'
            }, {
                status: 404
            })
        }

        if (limit.artlist <= 0 && monthlyLimit.artlist <= 0) {
            return Response.json({
                message: 'You have reached your download limit. Please try again later. Limit resets at 12:00 AM UTC'
            }, {
                status: 400
            })
        }

        const parts = url.split('/');
        const fileId = parts[parts.length - 1];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://server-4-9ctr2.ondigitalocean.app/api/artlist-templates?fileId=${fileId}`)

        if (!res.data.success) {
            return Response.json({
                message: 'Failed to download file'
            }, {
                status: 400
            })
        }

        if (limit.artlist <= 0) {
            await prisma.artlistMonthlyLimit.update({
                where: {
                    userId
                },
                data: {
                    artlist: {
                        decrement: 1
                    }
                }
            })
            return Response.json({
                message: 'Downloaded',
                data: res.data
            }, {
                status: 200
            })

        }

        await prisma.artlistLimit.update({
            where: {
                userId
            },
            data: {
                artlist: {
                    decrement: 1
                }
            }
        });

        return Response.json({
            message: 'Downloaded',
            data: res.data
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: 'Something went wrong'
        }, {
            status: 500
        })
    }
}