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

        const updateLimits = await prisma.limit.updateMany({
            where: {
                code: 1
            },
            data: {
                limit: 20
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