import prisma from "@/app/libs/prismadb";
import axios from "axios";
const server = process.env.BASE_SERVER_URL

export async function POST (req: Request) {
    const body = await req.json();
    const {url} = body;
    try {
        if (!url) {
            return Response.json({
                message: 'Missing required fields'
            }, {
                status: 400
            })
        }

        const link = url.split('?')[0];
        const fileId = link.substring(link.lastIndexOf("-") + 1);

        if (!fileId) {
            return Response.json({
                success: false,
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`${server}/api/envato?fileid=${fileId}`)

        if (!res.data.success) {
            return Response.json({
                success: false,
                message: 'Failed to download file'
            }, {
                status: 400
            })
        }

        return Response.json({
            success: true,
            message: 'Downloaded',
            data: res.data
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: 'Something went wrong'
        }, {
            status: 500
        })
    }
}
