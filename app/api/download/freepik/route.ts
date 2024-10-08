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

        const plan = await prisma.plan.findFirst({
            where: {
                userId: user.id,
                endDate: {
                    gte: new Date()
                }
            }
        })

        if (!plan) {
            return Response.json({
                message: "You don't have an active plan"
            }, {
                status: 400
            })
        }

        const userLimit = await prisma.limit.findUnique({
            where: {
                userId
            }
        });

        if (!userLimit) {
            return Response.json({
                message: 'User limit not found'
            }, {
                status: 404
            });
        }

        if (userLimit.limit <= 0) {
            return Response.json({
                message: 'You have reached your daily quota. Please try again tomorrow. Your quota will reset at 12 AM UTC.'
            }, {
                status: 400
            });
        }

        const link = url.split('#')[0];
        const fileId = url.split('_')[1].split('.')[0];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://freepik-server-1-4n9v9.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res.data.success) {
            await prisma.limit.update({
                where: {
                    userId
                },
                data: {
                    limit: {
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
        }

        const res0 = await axios.get(`https://freepik-server-2-ijraj.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res0.data.success) {
            await prisma.limit.update({
                where: {
                    userId
                },
                data: {
                    limit: {
                        decrement: 1
                    }
                }
            });
            return Response.json({
                message: 'Downloaded',
                data: res0.data
            }, {
                status: 200
            })
        }

        return Response.json({
            message: 'Failed to download file'
        }, {
            status: 400
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