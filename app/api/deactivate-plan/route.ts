import prisma from "@/app/libs/prismadb";

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

        const updatedPlan = await prisma.plan.update({
            where: {
                id: id
            },
            data: {
                endDate: new Date()
            }
        })

        return Response.json({
            message: 'Plan deactivated successfully',
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