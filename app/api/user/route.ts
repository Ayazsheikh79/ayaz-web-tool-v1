import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
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
            },
            select: {
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return Response.json({
                message: 'Not found'
            }, {
                status: 400
            });
        }

        return Response.json({
            data: user
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong',
            error: error
        }, {
            status: 400
        });
    }
}