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

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });

    const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    const router = useRouter();
    const searchParams = useSearchParams();
    const manageUser = searchParams.get('user');

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [code, setCode] = useState(null);
    const [redeemCodes, setRedeemCodes] = useState([]);
    const [reload, setReload] = useState(false);
    const [redeemCode, setRedeemCode] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const [tab, setTab] = useState('redeem');

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
    
    useEffect(() => {
        if (session) {
            axios.get(`/api/recent-redeem-codes?email=${session?.user?.email}`).then((res) => {
                setRedeemCodes(res.data.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [session]);

    const generateRedeemCode = async (code:any) => {
        try {
            if (!code) {
                return alert('Plan code is required')
            }
            setCode(null);
            setIsGenerating(true);
            const data = {
                email: session?.user?.email,
                planCode: code
            }
            const res = await axios.post('/api/generate-redeem-code', data);
            console.log(res.data)
            setIsGenerating(false)
            setCode(res.data.data)
        } catch (error) {
            console.log(error)
            setIsGenerating(false)
        }
    }
    const copyCode = async () => {
        // @ts-ignore
        const codeData = `Code: ${code?.code}\nPlan: ${code?.name}\nCreated At: ${new Date(code?.createdAt).toLocaleString()}\nRedeem here: ${baseUrl}/#redeem`;

        try {
            await navigator.clipboard.writeText(codeData);
            toast.success('Code copied to clipboard')
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error('Failed to copy code')
        }
    }

    const reloadCodes = async () => {
        try {
            setReload(true)
            const res = await axios.get(`/api/recent-redeem-codes?email=${session?.user?.email}`);
            setRedeemCodes(res.data.data);
            setReload(false)
        } catch (error) {
            console.log(error)
            setReload(false)
        }
    }

    const [success, setSuccess] = useState(-1);

    const submit = async (e:any) => {
        e.preventDefault();
        try {
            setSuccess(-1);
            const res = await axios.get(`/api/redeem-code-check?code=${redeemCode}`);
            if (res.data.success) {
                setSuccess(1);
            } else {
                setSuccess(0);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [email, setEmail] = useState('');
    const [data, setData] = useState(null);

    const search = async (e:any) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/manage-user/user?email=${email}`);
            setData(res.data.data);
        } catch (error:any) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const deactivatePlan = async (id:any) => {
        try {
            setIsDeactivating(true);
            const res = await axios.get(`/api/manage-user/deactivate-plan?id=${id}`);
            toast.success('Plan deactivated')
            setIsDeactivating(false);
        } catch (error) {
            console.log(error)
            toast.error('Failed to deactivate plan')
            setIsDeactivating(false);
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)` }}>
            {isLoading && <Loading/>}
            {!isLoading &&
                <div className={'w-full min-h-full space-y-8 p-4 lg:px-20'}>
                    <div className={'w-full bg-white p-4 rounded-sm shadow-sm text-medium font-medium text-default-700 flex gap-8 text-center justify-center items-center select-none'}>
                        <div className={'flex gap-2 items-center cursor-pointer hover:underline'}
                             onClick={() => router.replace('/admin')}
                        >
                            <FaHashtag />
                            Redeem Code
                        </div>
                        <div className={'flex gap-2 items-center cursor-pointer hover:underline'}
                             onClick={() => router.replace('/admin?user=true')}
                        >
                            <FaHashtag />
                            User
                        </div>
                    </div>

                    {!manageUser &&
                        <motion.div
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-5'}>
                                <div className={'space-y-4'}>
                                    <div className={'w-full bg-white p-4 rounded-sm shadow-sm text-medium font-medium text-default-700 space-y-4'}>
                                        <div className={'text-secondary'}>
                                            Generate Redeem Code
                                        </div>
                                        <Divider/>
                                        <div className={'space-y-4'}>
                                            <div className={'space-y-2'}>
                                                <div className={'text-secondary'}>
                                                    Daily Download
                                                </div>
                                                <div className={'grid grid-cols-2 lg:grid-cols-4 gap-2'}>
                                                    {dailyDownloadPlan.map((plan, index) => (
                                                        <Button
                                                            key={index}
                                                            color={'primary'}
                                                            variant={'flat'}
                                                            size={'sm'}
                                                            onClick={() => generateRedeemCode(plan.code)}
                                                            isLoading={isGenerating}
                                                        >
                                                            {plan.name} {plan.code}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                            <Divider/>
                                            <div className={'space-y-2'}>
                                                <div className={'text-secondary'}>
                                                    Monthly Download
                                                </div>
                                                <div className={'grid grid-cols-2 lg:grid-cols-4 gap-2'}>
                                                    {monthlyDownloadPlan.map((plan, index) => (
                                                        <Button
                                                            key={index}
                                                            color={'primary'}
                                                            variant={'flat'}
                                                            size={'sm'}
                                                            onClick={() => generateRedeemCode(plan.code)}
                                                            isLoading={isGenerating}
                                                        >
                                                            {plan.name} {plan.code}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                            <Divider/>
                                            <div className={'space-y-2'}>
                                                <div className={'text-secondary'}>
                                                    Credits
                                                </div>
                                                <div className={'grid grid-cols-2 lg:grid-cols-4 gap-2'}>
                                                    {creditPlan.map((plan, index) => (
                                                        <Button
                                                            key={index}
                                                            color={'primary'}
                                                            variant={'flat'}
                                                            size={'sm'}
                                                            onClick={() => generateRedeemCode(plan.code)}
                                                            isLoading={isGenerating}
                                                        >
                                                            {plan.name} {plan.code}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'w-full bg-white p-4 rounded-sm shadow-sm text-medium font-medium text-default-700 space-y-4 min-h-60'}>
                                        <div className={'capitalize text-secondary'}>
                                            Generated Redeem Code
                                        </div>
                                        <Divider/>
                                        <div>
                                            {!code &&
                                                <div className={'text-sm text-danger'}>
                                                    No code generated yet
                                                </div>
                                            }
                                            {code &&
                                                <div className={'space-y-2 text-sm'}>
                                                    <div>
                                                        {/* @ts-ignore */}
                                                        Code: <span className={'text-danger'}>{code.code}</span>
                                                    </div>
                                                    <div>
                                                        {/* @ts-ignore */}
                                                        Plan: <span className={'text-danger'}>{code.name}</span>
                                                    </div>
                                                    <div>
                                                        {/* @ts-ignore */}
                                                        Created At: <span className={'text-danger'}>{new Date(code.createdAt).toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        Redeem here: <Link href={'https://premiumgfx.shop/#redeem'} className={'text-primary'}>{baseUrl}/#redeem</Link>
                                                    </div>
                                                    <Button
                                                        color={'primary'}
                                                        variant={'flat'}
                                                        size={'sm'}
                                                        onClick={copyCode}
                                                    >
                                                        Copy Code
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={'space-y-4'}>
                                    <div className={'w-full bg-white p-4 rounded-sm shadow-sm text-medium font-medium text-default-700 space-y-4'}>
                                        <div className={'flex justify-between items-center'}>
                                            <div className={'text-secondary select-none'}>
                                                Recent Redeem Codes
                                            </div>
                                            <div className={`cursor-pointer select-none ${reload ? 'animate-spin' : ''}`}
                                                 onClick={reloadCodes}
                                            >
                                                <IoReload />
                                            </div>
                                        </div>
                                        <Divider/>
                                        <div>
                                            {redeemCodes.length < 1 &&
                                                <div className={'text-danger'}>
                                                    No redeem codes found
                                                </div>
                                            }
                                            {redeemCodes.length > 0 &&
                                                <div>
                                                    <Table aria-label="Active Plans" isStriped className={'w-full h-64'}>
                                                        <TableHeader>
                                                            <TableColumn>CODE/NAME</TableColumn>
                                                            <TableColumn>CODE</TableColumn>
                                                            <TableColumn>STATUS</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {redeemCodes.map((code, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>
                                                                        <div className={'flex items-center capitalize'}>
                                                                            {/* @ts-ignore */}
                                                                            <span className={'text-primary mr-4 font-semibold'}>{code.planCode}</span>
                                                                            {/* @ts-ignore */}
                                                                            <span>{code.name}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    {/* @ts-ignore */}
                                                                    <TableCell>{code.code}</TableCell>
                                                                    {/* @ts-ignore */}
                                                                    <TableCell>{code.active ? 'ACTIVE' : 'REDEEMED'}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className={'bg-white w-full min-h-60 rounded-sm shadow-sm text-medium font-medium text-default-700 space-y-4 p-4'}>
                                        <div className={'text-secondary'}>
                                            Redeeem Code Information
                                        </div>
                                        <Divider/>
                                        <div>
                                            <form className={'space-y-2'} onSubmit={submit}>
                                                <Input
                                                    type={'text'}
                                                    label={'Redeem Code'}
                                                    variant={'flat'}
                                                    placeholder={'Enter redeem code'}
                                                    isInvalid={isInvalid}
                                                    isRequired
                                                    value={redeemCode}
                                                    onChange={(e) => setRedeemCode(e.target.value)}
                                                />
                                                <Button
                                                    color={'primary'}
                                                    fullWidth
                                                    variant={'flat'}
                                                    type={'submit'}
                                                    isLoading={isChecking}
                                                >
                                                    Check Code
                                                </Button>
                                            </form>
                                        </div>
                                        <div>
                                            {success === 1 &&
                                                <div className={'text-success'}>
                                                    Code is Active
                                                </div>
                                            }
                                            {success === 0 &&
                                                <div className={'text-danger'}>
                                                    Code is Already Redeemed
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }

                    {manageUser &&
                        <motion.div>
                            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-5'}>
                                <div className={'space-y-4'}>
                                    <div className={'bg-white space-y-4 w-full p-4 shadow-sm rounded-sm text-medium font-medium'}>
                                        <div className={'text-secondary'}>
                                            Find User
                                        </div>
                                        <Divider/>
                                        <div>
                                            <form className={'space-y-4'} onSubmit={search}>
                                                <Input
                                                    type={'text'}
                                                    label={'email'}
                                                    variant={'flat'}
                                                    placeholder={'Enter email'}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Button
                                                    color={'primary'}
                                                    variant={'flat'}
                                                    fullWidth
                                                    type={'submit'}
                                                >
                                                    Search
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className={'bg-white space-y-4 w-full p-4 shadow-sm rounded-sm text-medium font-medium min-h-48'}>
                                        <div className={'text-secondary'}>
                                            User Information
                                        </div>
                                        <Divider/>
                                        {!data &&
                                            <div className={'text-sm text-danger'}>
                                                User Information will be displayed here
                                            </div>
                                        }
                                        {data &&
                                            <div className={'space-y-2 text-sm'}>
                                                <div>
                                                    {/*@ts-ignore*/}
                                                    Name: <span className={'text-danger'}>{data.user.name}</span>
                                                </div>
                                                <div>
                                                    {/*@ts-ignore*/}
                                                    Email: <span className={'text-danger'}>{data.user.email}</span>
                                                </div>
                                                <div>
                                                    {/*@ts-ignore*/}
                                                    Password: <span className={'text-danger'}>{data.user.password}</span>
                                                </div>
                                                <div>
                                                    {/*@ts-ignore*/}
                                                    Role: <span className={'text-danger'}>{data.user.role}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={'space-y-4'}>
                                    <div className={'bg-white w-full text-medium font-medium p-4 rounded-sm shadow-sm space-y-4'}>
                                        <div className={'text-secondary'}>
                                            User Credits
                                        </div>
                                        <Divider/>
                                        {!data &&
                                            <div className={'text-danger text-sm'}>
                                                User credits will be displayed here
                                            </div>
                                        }
                                        {data &&
                                            <div className={'text-sm'}>
                                                {/*@ts-ignore*/}
                                                Credits: <span className={'text-danger'}>{data.credits?.amount.toFixed(2)}</span>
                                            </div>
                                        }
                                    </div>
                                    <div className={'bg-white text-medium font-medium p-4 w-full h-96 space-y-4 rounded-sm shadow-sm'}>
                                        <div className={'text-secondary'}>
                                            User Plans
                                        </div>
                                        <Divider/>
                                        {!data &&
                                            <div className={'text-danger text-sm'}>
                                                User plans will be displayed here
                                            </div>
                                        }
                                        {/*@ts-ignore*/}
                                        {data && data.plans.length < 1 &&
                                            <div>
                                                <div className={'text-danger'}>
                                                    No active plans
                                                </div>
                                            </div>
                                        }
                                        {/*@ts-ignore*/}
                                        {data && data.plans.length > 0 &&
                                            <div>
                                                <Table hideHeader aria-label="Active Plans" isStriped className={'w-full'}>
                                                    <TableHeader>
                                                        <TableColumn>NAME</TableColumn>
                                                        <TableColumn>START DATE</TableColumn>
                                                        <TableColumn>END DATE</TableColumn>
                                                        <TableColumn>BUTTON</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {/*@ts-ignore*/}
                                                        {data.plans.map((plan:any, index:any) => (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    <div className={'flex items-center gap-2 capitalize'}>
                                                                        <span className={'text-primary mr-4 font-semibold'}>{index + 1}</span>
                                                                        {/* @ts-ignore */}
                                                                        <span>{plan.name}</span>
                                                                    </div>
                                                                </TableCell>
                                                                {/* @ts-ignore */}
                                                                <TableCell>{new Date(plan.startDate).toDateString()}</TableCell>
                                                                {/* @ts-ignore */}
                                                                <TableCell>{new Date(plan.endDate).toDateString()}</TableCell>
                                                                <TableCell>
                                                                    {plan.active &&
                                                                        <Button
                                                                            color={'primary'}
                                                                            variant={'flat'}
                                                                            size={'sm'}
                                                                            onClick={() => deactivatePlan(plan.id)}
                                                                            isLoading={isDeactivating}
                                                                        >
                                                                            DEACTIVATE
                                                                        </Button>
                                                                    }
                                                                    {!plan.active &&
                                                                        <Button
                                                                            color={'danger'}
                                                                            variant={'flat'}
                                                                            size={'sm'}
                                                                            isDisabled={true}
                                                                        >
                                                                            DEACTIVATED
                                                                        </Button>
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }

                </div>
            }
        </div>
    )
}