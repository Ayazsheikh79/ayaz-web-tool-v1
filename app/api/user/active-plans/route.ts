import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const email = searchParams.get('email')
    try {
        if (!email) {
            return Response.json({
                message: 'Missing required fields'
            }, {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return Response.json({
                message: 'Not found'
            }, {
                status: 400
            });
        }

        const activePlans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                active: true,
                endDate: {
                    gt: new Date()
                }
            }
        })

        return Response.json({
            message: 'Active plans fetched successfully',
            data: activePlans
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error)
        return Response.json({
            message: 'Internal server error'
        }, {
            status: 500
        });
    }
}