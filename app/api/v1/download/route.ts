import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const dlCode = searchParams.get('dlcode')
    try {
        if (!dlCode) {
            return Response.json({
                message: 'Invalid Request'
            }, {
                status: 400
            });
        }

        const download = await prisma.download.findUnique({
            where: {
                dlCode
            }
        });

        if (!download) {
            return Response.json({
                message: 'Download not found'
            }, {
                status: 404
            });
        }

        return Response.redirect(download.dlUrl)

    } catch (e) {
        console.log(e)
        return Response.json({
            success: false,
            message: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}