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

        const link = url.split('#')[0];
        const fileId = link.split('_')[1].split('.')[0];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://server-4-9ctr2.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res.data.success) {
            return Response.json({
                success: true,
                message: 'Downloaded',
                data: res.data
            }, {
                status: 200
            })
        }


        const res0 = await axios.get(`https://envato-web-server-vrhv2.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res0.data.success) {
            return Response.json({
                success: true,
                message: 'Downloaded',
                data: res0.data
            }, {
                status: 200
            })
        }


        const res1 = await axios.get(`https://server-1-sybxd.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res1.data.success) {
            return Response.json({
                success: true,
                message: 'Downloaded',
                data: res1.data
            }, {
                status: 200
            })
        }

        const res2 = await axios.get(`https://server-2-kzcrw.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res2.data.success) {
            return Response.json({
                success: true,
                message: 'Downloaded',
                data: res2.data
            }, {
                status: 200
            })
        }

        return Response.json({
            success: false,
            message: 'Failed to download file'
        }, {
            status: 400
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