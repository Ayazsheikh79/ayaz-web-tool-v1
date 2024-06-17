import prisma from "@/app/libs/prismadb";
import axios from "axios";

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

        const parts = url.split('/');
        const fileId = parts[4];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://server-main-aafdq.ondigitalocean.app/api/artlist-footage?fileId=${fileId}`)

        if (!res.data.success) {
            return Response.json({
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