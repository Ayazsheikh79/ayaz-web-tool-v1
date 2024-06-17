import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    try {
        if (!email) {
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

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const redeemCodes = await prisma.redeemCode.findMany({
            where: {
                createdAt: {
                    gte: oneWeekAgo
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Response.json({
            message: 'Success',
            success: true,
            data: redeemCodes
        }, {
            status: 200
        });

    } catch (error) {
        console.error(error);
        return Response.json({
            message: 'Internal Server Error',
            success: false
        }, {
            status: 500
        })
    }
}