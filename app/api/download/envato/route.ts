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

        const res = await getElementsEnvato(fileId)

        if (!res.success) {
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
            data: res
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

async function getElementsEnvato(fileId:any) {
    const gettingElement = await downloadAndLicense(fileId);
    const downloadLink = gettingElement.data?.attributes?.downloadUrl;
    if (!downloadLink) {
        console.log(gettingElement)
        return {
            success: false,
        };
    } else {
        console.log(downloadLink)
        return {
            success: true,
            downloadLink: downloadLink
        };
    }
}

async function downloadAndLicense(fileId:any) {
    try {

        const response = await axios.post(`https://elements.envato.com/elements-api/items/${fileId}/download_and_license.json`, {
            licenseType: 'trial'
        }, {
            headers: {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": "a-tAqdLIbP3bFvDR_p0JnP7CsCqOG4ejaGbQrrd-mv52Ddjun0vHD_PvocTUtoC1qq7TfgQGxp9P18VNK_6gAg",
                "x-csrf-token-2": "woIEwr7CisOHw74Dw6HCqzHDtsOIOkHDvMOGNsKbwoscw4zCgcKlw4DCoMKjw4xdw6XCqVXClsKUETfCg0HDhEjCiMKzZMKuwpEZwoUTw4wvwprDq8OlL2_DoSPCu8Opw7zCnMKHwpfDtcKm",
                "cookie": "envato_client_id=65e49929-eda4-4519-bbb4-4f15d0380cbf; original_landing_page_url=https://elements.envato.com/; _fbp=fb.1.1706639461255.782222498; _pin_unauth=dWlkPVptSmlZelkyTXprdE1UazVNQzAwTjJJM0xUazBPRFF0T0dWaU16STNORGd6TmpZMA; AMP_MKTG_c105c32cdc=JTdCJTIydXRtX2NhbXBhaWduJTIyJTNBJTIybGFic19lbGVtZW50cy1kYXNoYm9hcmQlMjIlMkMlMjJ1dG1fbWVkaXVtJTIyJTNBJTIycHJvbW9zJTIyJTJDJTIydXRtX3NvdXJjZSUyMiUzQSUyMmVsZW1lbnRzJTIyJTJDJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRmVudjQuZ2Z4dG9vbHouc2l0ZSUyRiUyMiUyQyUyMnJlZmVycmluZ19kb21haW4lMjIlM0ElMjJlbnY0LmdmeHRvb2x6LnNpdGUlMjIlN0Q=; AMP_c105c32cdc=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJiYWUxNjhiMy1lN2E2LTQ1MzktYWIxMS01MDc5YTM1NjUwNjclMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzA5Mjg0NjU0NDIxJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTcwOTI4NDY1NDQzMiUyQyUyMmxhc3RFdmVudElkJTIyJTNBMyU3RA==; _hjSessionUser_3757350=eyJpZCI6IjY2ODFiZGM1LTI0NGEtNTg5Ni04NzlhLWMxM2JmM2JlNzNjYiIsImNyZWF0ZWQiOjE3MDkyODQ2NTQ4NDMsImV4aXN0aW5nIjpmYWxzZX0=; g_state={\"i_p\":1713806803894,\"i_l\":4}; free_account_first_visit_dashboard=1; _gcl_au=1.1.850266322.1714668922; preferredLanguage=en; ajs_user_id=974176cd-933c-45d3-96d3-703a0ac9e760; ajs_anonymous_id=c85e9470-8c19-4fbd-a258-94442a035689; psi={%22previouslySignedIn%22:true}; _ga_WWQGS71330=GS1.1.1717627879.45.1.1717628266.0.0.0; _ga_LWP72N603P=GS1.1.1718427438.1.1.1718428073.0.0.0; _ga=GA1.1.413610275.1706639461; CookieConsent={stamp:%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:1%2Cutc:1720633087131%2Cregion:%27IN%27}; __cf_bm=5rVuCT_SQ61Mi3vZJUOrlNdn5TMiRMWs.9D2XPqaPbc-1721118161-1.0.1.1-rE.cBCsaIVCO_DY8vrlug2HBNJJ6gGXaT2UDJATO3hdlqC_.srdPuUU0ZemVADFlrtBk4L_5SRUUiQqaHIe7OQ; GO_EXP_STOREFRONT=306e2285-134a-4ff7-8393-f2fa71c461ee=0&2ef6d361-12b1-403c-9a52-265862b0be15=1&87c2464f-5927-40fe-a721-0ec7265412a1=1&46c1643b-14a8-41a8-ad86-00000000000a=1; __cf_bm=alSzMsCG7wNQPFykMMiRFHj9Amvh4rdw049UY6jmvwc-1721118164-1.0.1.1-7ZmqlnJ2X8Eil9MYOadVv4_4Ew_0HYTSOIlzsnpYldb_26nYnlKVpii.n2pHVUAZYEpbJrCMf5f5aJvR3XlEZw; _cfuvid=QApY.3SwD1arivBKobeWfM3IkCC6AJhjzNHv_s34sVI-1721118164032-0.0.1.1-604800000; _ce.irv=returning; cebs=1; _ce.clock_event=1; _ce.clock_data=37%2C146.196.38.236%2C1%2C4f09e01c83d69100c363c33aecfef9f8%2CChrome%2CIN; HAS_SEEN_BRAND_NEUE_RELEASE_MODAL=true; _dd_s=rum=0&expire=1721119073090; _rdt_uuid=1706639461449.6da481fb-e483-46c2-b792-88efbef8fc41; _elements_session_4=ZUhpaFJsaU5PanhwT0d2a3dqRFVJdFU4SlVXTHBtUUhCN1dnMUY5YS9MbGl1Tk5GY3djQ29kZ0JjN2NxNWI2OU9XTXlia2tqNWxSckFJcFI1NkJYbiswUXp4Uks1c1FadDQwTGw5MGY4NXkyMncvUlBSTWtidGwzakFwVVZPNHZoTUg0emE0cHVpcUpMd1Rsdk5SZFY0L3MzMHJNTFVqMFNYK2EydlhLZUtWQW1MR3NDeXRZLzlqNnZzNktDVWt1akFwK29VSEl6RStFNVdnbW9KRE90bVFLZGt0b0ZEZjJHcHNXTk4wV2c4Wmh3dHcxM2RJZEpmSzBBUGRSWWsxN2dTV3l5OWtod1NrTHF1Njd5aU1EQThuWDg5L2JZLy9BdG41SUNOcnBIamIycHo0a3RGaXp1UG5OY0ZONXdkNGg1V3FKdFJlRSsvSEh0T0g2L3VyQ1RuQ1dSODVQR3NZUVQ2ek1ZT1F3Y1NuWHl5UUNRUGN0ZzlxMXR4WTVPbW1ubmhIM1FRVnNHRExTY2x4QldCdXRGQT09LS1mMXhBZGFVV3VNUlRmUzNycnl5MTNRPT0%3D--b0622baa00a11be701239187a72916a79e23c5fe; _uetsid=93916f80434c11efbd62a3e7fd2b643d; _uetvid=4f27a9d0555811ee9e91f90b6577781c; HAS_DISMISSED_BRAND_NEUE_RELEASE_BANNER=true; cebsp_=6; elements.session.5=Fe26.2*0*42a6cbb3c2905827f443260f90304ce4241ddfcb922f5efae5da3792dafa5422*5adNJcv5NW-5ij83fzqvrw*VWz9lgPeukG5dSGu5HeyvJJncP8xo1rQyDFJTM50Ur3ohL_oEgAfwHX2kRZ0Ttg9et0GGRRDlBc4LyAcz-jNl6VKW83DKXcfXkOHSE91unb4-0BxdTGyQmHBXXjBwSmfQKle88jQNuYhRnTBoS5syajowqTNmXGiQUlCM9mR8UI*1722327930751*ff0244d35af13b5178c01dbbd8871913fb33c1f3f2a35980a26522555d6563f8*f1GPCM8WLVnD5fGzCyKDDCtyx9bCIlv3HnCd8muVF7o~2; _ce.s=v~46bf87078de131c933d68f29edeb07b58fb87daf~lcw~1721118337221~lva~1721118164344~vpv~91~v11.fhb~1721118164533~v11.lhb~1721118327674~v11.cs~229985~v11.s~93a4eed0-434c-11ef-92a6-6342b7a31c4b~v11.sla~1721118337220~gtrk.la~lyo5f4cn~lcw~1721118337223; _ga_SFZC8HJ4D7=GS1.1.1721118164.92.1.1721118337.23.0.0",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }

}