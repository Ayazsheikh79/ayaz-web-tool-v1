import prisma from "@/app/libs/prismadb";

export async function POST (req: Request) {
    const body = await req.json();
    const {key} = body;
    try {
        if (!key) {
            return Response.json({
                message: 'Invalid request.'
            }, {
                status: 400
            })
        }

        if (key !== 'resetghfvuyedgchh') {
            return Response.json({
                message: 'Invalid key.'
            }, {
                status: 403
            })
        }

        const updateLimit = await prisma.dailyLimit.updateMany({
            where: {
                code: 1
            },
            data : {
                limit: 10
            }
        });

        const updateLimit2 = await prisma.dailyLimit.updateMany({
            where: {
                code: 2
            },
            data : {
                limit: 20
            }
        });

        const updateLimit3 = await prisma.dailyLimit.updateMany({
            where: {
                code: 3
            },
            data : {
                limit: 30
            }
        });

        const updateLimit4 = await prisma.dailyLimit.updateMany({
            where: {
                code: 4
            },
            data : {
                limit: 40
            }
        });

        return Response.json({
            message: 'User limits updated successfully.'
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong.'
        }, {
            status: 500
        })
    }

}