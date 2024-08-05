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

        const parsedUrl = new URL(url)
        const params = new URLSearchParams(parsedUrl.search);
        let fileid = params.get('asset_id');

        if (!fileid) {
            const link = url.split('?')[0];
            const parts = link.split('/');
            fileid = parts[parts.length - 1];
        }

        if (!fileid) {
            return Response.json({
                success: false,
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`${process.env.BASE_SERVER_URL}/api/adobe?fileid=${fileid}`)

        // console.log(res.data)

        if (!res.data.success) {
            return Response.json({
                success: false,
                message: 'Failed to download file'
            }, {
                status: 400
            })
        }

        return Response.json({
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