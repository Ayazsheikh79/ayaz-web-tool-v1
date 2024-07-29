'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {
    Button,
    Divider,
    Input,
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {toast} from "sonner";
import Image from "next/image";
import {usePathname} from "next/navigation";
import providers from "@/app/data/providers";


export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [credits, setCredits] = useState()
    const [envatoUrl, setEnvatoUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadLink, setDownloadLink] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (session) {
            axios.post('/api/tool/credits', {
                email: session?.user?.email
            }).then((res) => {
                setCredits(res.data.data)
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
            }
            setIsDownloading(true)
            setDownloadLink([])
            const res = await axios.post('/api/v1/crs/download', data)
            console.log(res.data)
            setDownloadLink(res.data.downloadURLs)
            setRefresh(!refresh)
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
                <div className={'w-full min-h-full flex-col gap-10 flex justify-center items-center p-4'}>
                    <div className={'border p-4 rounded-md space-y-8 w-full max-w-[700px]'}>
                        <div className={'flex gap-5 items-center'}>
                            <div className={'font-semibold text-xl'}>
                                Single File Downloader
                            </div>
                        </div>
                        <Divider className={'h-[0.5px]'}/>
                        <div className={'text-xs font-thin w-fit'}>
                            <div className={'p-4 border rounded-md'}>
                                {/* @ts-ignore */}
                                Credits: <span className={'font-semibold'}>{credits.amount.toFixed(2)}</span>
                            </div>
                        </div>
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'Enter URL'}
                                    placeholder={'Enter URL'}
                                    variant={'flat'}
                                    value={envatoUrl}
                                    onChange={(e) => setEnvatoUrl(e.target.value)}
                                />
                            </div>
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'secondary'}
                                type={'submit'}
                                isLoading={isDownloading}
                            >
                                Get Download Links
                            </Button>
                        </form>
                        {downloadLink.length > 0 &&
                            <div className={'space-y-4'}>
                                <Divider className={'h-[0.5px]'}/>
                                <div className={'grid grid-cols-2 gap-5'}>
                                    {downloadLink.map((link: any, index: number) => (
                                        <Button
                                            key={index}
                                            as={'a'}
                                            variant={'flat'}
                                            color={'primary'}
                                            href={link.url}
                                            target={'_blank'}
                                            className={'uppercase'}
                                        >
                                            {link.type}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className={'w-full max-w-[700px]'}>
                        <Table aria-label="Provider Information"
                               isStriped
                               className={'w-full h-96'}
                        >
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>PRICE</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {providers
                                    .sort((a, b) => a.provider.localeCompare(b.provider))
                                    .map((provider, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className={'flex items-center gap-2 capitalize'}>
                                                        <span
                                                            className={'text-primary mr-4 font-semibold'}>{index + 1}</span>
                                                    <div
                                                        className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                        <Image src={provider.image} width={32} height={32}
                                                               alt={provider.provider}/>
                                                    </div>
                                                    <span>{provider.provider}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={'text-danger text-sm font-medium'}>{provider.price.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}

                            </TableBody>
                        </Table>
                    </div>
                </div>
            }
        </div>
    )
}