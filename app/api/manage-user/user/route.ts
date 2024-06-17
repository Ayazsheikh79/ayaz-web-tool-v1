import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required',
                success: false
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return Response.json({
                message: 'User not found',
                success: false
            }, {
                status: 404
            })
        }

        const credits = await prisma.credit.findUnique({
            where: {
                userId: user.id
            }
        });

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id
            }
        });

        return Response.json({
            message: 'User found',
            success: true,
            data: {
                user,
                credits,
                plans
            }
        }, {
            status: 200
        })

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