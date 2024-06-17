import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    try{
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

        const credits = await prisma.credit.findUnique({
            where: {
                userId: user.id
            }
        })

        if (!credits) {
            const credits = await prisma.credit.create({
                data: {
                    userId: user.id,
                    amount: 0.00
                }
            })

            if (!credits) {
                return Response.json({
                    message: 'Something went wrong'
                }, {
                    status: 400
                });
            }

            return Response.json({
                message: 'credits fetched successfully',
                data: credits
            }, {
                status: 200
            })
        }

        return Response.json({
            message: 'credits fetched successfully',
            data: credits
        }, {
            status: 200

        })

    } catch (error) {
        console.error(error)
        return Response.json({
            message: 'Internal server error',
        }, {
            status: 500
        });
    }
}