import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required'
            }, {
                status: 400
            });
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

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                active: true
            }
        });

        if (plans.length === 0) {
            return Response.json({
                message: 'No active plan found'
            }, {
                status: 404
            });
        }

        return Response.json({
            message: 'Success',
            data: plans
        }, {
            status: 200
        });

    } catch (e:any) {
        console.log(e)
        return Response.json({
            message: 'Internal server error'
        }, {
            status: 500
        })
    }
}