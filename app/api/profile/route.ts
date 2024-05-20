import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required',
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
                message: 'User not found',
            }, {
                status: 404
            })
        }

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                id: 'desc'
            },
        })

        return Response.json({
            message: 'success',
            data: {
                user,
                plans
            }
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