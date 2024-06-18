'use client'

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Loading from "@/app/components/Loading";
import { FaHashtag } from "react-icons/fa";
import {motion} from "framer-motion";
import {
    Button,
    Divider, Input,
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {dailyDownloadPlan, monthlyDownloadPlan, creditPlan} from '@/app/data/plans'
import {toast} from "sonner";
import { IoReload } from "react-icons/io5";
import {useSearchParams} from "next/navigation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [pixedenToken, setPixedenToken] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);


    useEffect(() => {
        if (session) {
            axios.post('/api/user', {email: session?.user?.email}).then((res) => {
                setUser(res.data.data);
                if (res.data.data.role !== 'admin') {
                    router.push('/')
                } else {
                    setIsLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                router.push('/')
            })
        }
    }, [router, session]);

    const updatePixden = async (e:any) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/update/pixeden',{
                newToken: pixedenToken,
                email: session?.user?.email
            })
            toast.success(res.data.message)
        } catch (e:any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)` }}>
            {isLoading && <Loading/>}
            {!isLoading &&
                <div className={'w-full min-h-full space-y-4 p-4 lg:px-8'}>
                    <div className={'bg-white shadow-sm rounded-sm p-4 text-medium font-medium text-default-700 space-y-4'}>
                        <div className={'text-secondary'}>
                            Update Pixeden
                        </div>
                        <Divider/>
                        <div>
                            <form className={'space-y-8'} onSubmit={updatePixden}>
                                <div className={'space-y-2'}>
                                    <Input
                                        label={'Pixden Token'}
                                        placeholder={'Enter Pixden Token'}
                                        variant={'flat'}
                                        value={pixedenToken}
                                        onChange={(e) => setPixedenToken(e.target.value)}
                                    />
                                </div>
                                <Button
                                    fullWidth
                                    variant={'flat'}
                                    color={'secondary'}
                                    type={'submit'}
                                    isLoading={isDownloading}
                                >
                                    Update Pixden
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}