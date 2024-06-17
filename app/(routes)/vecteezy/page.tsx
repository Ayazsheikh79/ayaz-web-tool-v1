'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import {toast} from "sonner";
import {usePathname} from "next/navigation";

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [limits, setLimits] = useState(null)
    const [envatoUrl, setEnvatoUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadLink, setDownloadLink] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [note, setNote] = useState(false)

    useEffect(() => {
        if (session) {
            axios.post('/api/tool/limits', {
                email: session?.user?.email
            }).then((res) => {
                setLimits(res.data.data)
                setIsLoading(false)
            }).catch((e) => {
                setIsLoading(false)
                toast.error(e.response.data.message)
            })
        }
    }, [session, refresh])

    const submit = async (e:any) => {
        e.preventDefault()
        try {
            if (!envatoUrl) {
                toast.error('URL is required')
                return
            }
            const data = {
                url: envatoUrl,
                email: session?.user?.email,
                path: pathname
            }
            setIsDownloading(true)
            setTimeout(() => {
                setNote(true)
            }, 3000)
            const res = await axios.post('/api/v1/sub/download', data)
            setDownloadLink(res.data.downloadURLs[0].url)
            setRefresh(!refresh)
            setNote(false)
            window.open(res.data.downloadURLs[0].url, '_blank');
            setIsDownloading(false)
        } catch (e:any) {
            toast.error(e.response.data.message)
            setIsDownloading(false)
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)`}}>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className={'w-full h-full flex justify-center items-center p-4'}>
                    <div className={'border p-4 rounded-md space-y-8 w-full max-w-[700px]'}>
                        <div className={'font-semibold text-xl'}>
                            Vecteezy Downloader
                        </div>
                        <Divider className={'h-[0.5px]'} />
                        <div className={'text-xs font-thin w-fit'}>
                            <div className={'p-4 border rounded-md'}>
                                {/* @ts-ignore */}
                                Quota: <span className={'font-semibold'}>{limits?.dailyLimit.limit === 0 ? limits.monthlyLimit.limit : limits?.dailyLimit.limit}</span>
                            </div>
                        </div>
                        {note &&
                            <div className={'bg-warning rounded-sm shadow-sm p-2 text-sm text-white'}>
                                Note: It may take a few seconds to download the file. Please be patient and do not close
                                or refresh the page.
                            </div>
                        }
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'Vecteezy URL'}
                                    placeholder={'Enter Vecteezy URL'}
                                    variant={'flat'}
                                    value={envatoUrl}
                                    onChange={(e) => setEnvatoUrl(e.target.value)}
                                />
                                <div className={'font-light text-xs translate-x-2 text-default-400'}>
                                    example: https://www.vecteezy.com/vector-art/2042713-vector-city-night-illustration
                                </div>
                            </div>
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'secondary'}
                                type={'submit'}
                                isLoading={isDownloading}
                            >
                                Download
                            </Button>
                        </form>
                        {downloadLink &&
                            <div className={'font-medium text-sm'}>
                                Your download will start automatically. If it doesn‘t, <Link className={'font-semibold'}
                                                                                             target={'_blank'}
                                                                                             href={downloadLink}>click
                                here</Link>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}