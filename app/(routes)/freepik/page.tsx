'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {Button, Divider, Input} from "@nextui-org/react";
import {toast} from "sonner";


export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const [isLoading, setIsLoading] = useState(true)
    const [limits, setLimits] = useState()
    const [credits, setCredits] = useState(0)
    const [monthlyLimit, setMonthlyLimit] = useState()
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadLink, setDownloadLink] = useState('hi')
    const [freepikUrl, setFreepikUrl] = useState('')
    
    useEffect(() => {
        if (status === 'authenticated' && session && session?.user?.email) {
            axios.all([
                axios.post('/api/tool/freepik', {
                    email: session?.user?.email
                }),
                axios.post('/api/tool/credits', {
                    email: session?.user?.email
                })

            ]).then(axios.spread((res, res2) => {
                setLimits(res.data.data.freepik)
                setMonthlyLimit(res.data.data.monthly)
                setCredits(res2.data.data)
                setIsLoading(false)
            })).catch((e:any) => {
                toast.error(e.response.data.message)
                setIsLoading(false)
            })
        }
    }, [session, status])

const submit = async (e:any) => {
        e.preventDefault()
        try {
            if (!freepikUrl) {
                toast.error('Freepik URL is required')
                return
            }
            const data = {
                url: freepikUrl,
                // @ts-ignore
                userId: limits?.userId
            }
            setIsDownloading(true)
            const res = await axios.post('/api/download/freepik', data)
            setDownloadLink(res.data.data.downloadLink)
            window.open(res.data.data.downloadLink, '_blank');
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
                            Freepik Downloader
                        </div>
                        <Divider className={'h-[0.5px]'} />
                        <div className={'grid grid-cols-2 gap-5 text-xs font-thin'}>
                            <div className={'p-4 border rounded-md text-center'}>
                                {/* @ts-ignore */}
                                Quota: <span className={'font-semibold'}>{limits?.freepik === 0 ? monthlyLimit.freepik : limits?.freepik}</span>
                            </div>
                            <div className={'p-4 border rounded-md text-center'}>
                                Credits: <span className={'font-semibold'}>0</span>
                            </div>
                        </div>
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'Freepik URL'}
                                    placeholder={'Enter freepik url'}
                                    variant={'flat'}
                                    value={freepikUrl}
                                    onChange={(e) => setFreepikUrl(e.target.value)}
                                />
                                <div className={'font-light text-xs translate-x-2 text-default-400'}>
                                    https://www.freepik.com/free-photo/full-shot-students-preparing-exam_31194720.htm
                                </div>
                            </div>
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'secondary'}
                                type={'submit'}
                            >
                                Download
                            </Button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}