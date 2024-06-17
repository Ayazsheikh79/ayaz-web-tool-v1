import prisma from "@/app/libs/prismadb";
import axios from "axios";


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2V0c3RvY2tzLm5ldFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTcxNzQ1ODc1NCwibmJmIjoxNzE3NDU4NzU0LCJqdGkiOiJSWnUxT1BHVHBuTGdHdVpHIiwic3ViIjoyMTM4OSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.QZ3-ktTmURK_Q1XOZW-gYvUx4rK9eR_I0OIWDsmOfTY'

export async function POST(req: Request) {
    const body = await req.json();
    const {url} = body;
    try {
        if (!url) {
            return Response.json({
                message: 'Invalid request'
            }, {
                status: 400
            });
        }

        const info = await axios.post(`https://getstocks.net/api/v1/getinfo?token=${token}`, {
            link: url,
            ispre: 1
        })

        if (info.data.error) {
            return Response.json({
                message: 'Something went wrong. Please try again later.'
            }, {
                status: 400
            });
        }

        const typeObject = info.data.result.support.type;
        const key = Object.keys(typeObject)[0];

        const downloadLink = await axios.post(`https://getstocks.net/api/v1/getlink?token=${token}`, {
            link: url,
            ispre: 1,
            type: key
        })

        let status = await axios.post(`https://getstocks.net/api/v1/download-status?token=${token}`, {
            slug: downloadLink.data.result.provSlug,
            id: downloadLink.data.result.itemID,
            ispre: 1,
            type: key
        });

        while (status.data.result.status !== 1) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            status = await axios.post(`https://getstocks.net/api/v1/download-status?token=${token}`, {
                slug: downloadLink.data.result.provSlug,
                id: downloadLink.data.result.itemID,
                ispre: 1,
                type: key
            });
        }


        return Response.json({
            message: 'Download link info generated',
            data: {
                info: info.data,
                downloadLink: `https://getstocks.net/api/v1/download/${status.data.result.itemDCode}?token=${token}`,
                status: status.data
            }
        } , {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Internal server error',
            error: error
        }, {
            status: 500
        });
    }
}
