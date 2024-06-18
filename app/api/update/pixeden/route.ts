import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {email, newToken} = body;
    try {
        if (!email || !newToken) {
            return Response.json({
                message: 'Invalid request',
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findFirst({
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

        if (user.role !== 'admin') {
            return Response.json({
                message: 'Unauthorized',
            }, {
                status: 401
            })
        }

        const pixeden = await prisma.pixedenToken.findFirst()

        if (!pixeden) {
            await prisma.pixedenToken.create({
                data: {
                    token: newToken
                }
            })
            return Response.json({
                success: true,
                message: 'Pixeden token updated successfully',
            }, {
                status: 200
            })
        }

        await prisma.pixedenToken.update({
            where: {
                id: pixeden.id
            },
            data: {
                token: newToken
            }
        })

        return Response.json({
            success: true,
            message: 'Pixeden token updated successfully',
        }, {
            status: 200
        })

    } catch (e) {
        console.log(e)
        return Response.json({
            message: 'Internal server error',
        }, {
            status: 500
        })
    }
}