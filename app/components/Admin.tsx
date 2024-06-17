'use client'

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Button, Divider, Input, Textarea} from "@nextui-org/react";
import {toast} from "sonner";
import Loading from "@/app/components/Loading";
import {Select, SelectItem} from "@nextui-org/react";
import {Switch, cn} from "@nextui-org/react";

const options = [
    {label: 'Envato - Basic', planCode: 11},
    {label: 'Envato - Standard', planCode: 21},
    {label: 'Envato - Premium', planCode: 31},

    {label: 'FreePik - Basic', planCode: 12},
    {label: 'FreePik - Standard', planCode: 22},
    {label: 'FreePik - Premium', planCode: 32},

    {label: 'Envato - Basic - 100 - 1 Month', planCode: 14},
    {label: 'Envato - Standard - 200 - 1 Month', planCode: 24},
    {label: 'Envato - Premium - 300 - 1 Month', planCode: 34},

    {label: 'Freepik - Basic - 100 - 1 Month', planCode: 15},
    {label: 'Freepik - Standard - 200 - 1 Month', planCode: 25},
    {label: 'Freepik - Premium - 300 - 1 Month', planCode: 35},

    {label: 'Artlist - Basic', planCode: 41},
    {label: 'Artlist - Standard', planCode: 42},
    {label: 'Artlist - Premium', planCode: 43},

    {label: 'Artlist - Basic - 100 - 1 Month', planCode: 44},
    {label: 'Artlist - Standard - 200 - 1 Month', planCode: 45},
    {label: 'Artlist - Premium - 300 - 1 Month', planCode: 46},

    {label: 'VectorStock - Basic', planCode: 51},
    {label: 'VectorStock - Standard', planCode: 52},
    {label: 'VectorStock - Premium', planCode: 53},

    {label: 'VectorStock - Basic - 100 - 1 Month', planCode: 54},
    {label: 'VectorStock - Standard - 200 - 1 Month', planCode: 55},
    {label: 'VectorStock - Premium - 300 - 1 Month', planCode: 56},

]

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const router = useRouter();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState({});

    useEffect(() => {
        if (session) {
            axios.post('/api/user', {email: session?.user?.email}).then((res) => {
                setUser(res.data.data);
                if (res.data.data.role !== 'admin') {
                    router.push('/')
                } else {
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                router.push('/')
            })
        }
    }, [router, session]);

    const [isGenerating, setIsGenerating] = useState(false)
    const [credit, setCredit] = useState('')

    const generateCoupon = async (planCode:any) => {
        try {
            setIsGenerating(true)
            const res = await axios.post('/api/coupon', {
                email: session?.user?.email,
                planCode: planCode,
                credits: 0
            })
            setCoupon(res.data.data)
            setIsGenerating(false)
        } catch (e) {
            console.log(e)
            setIsGenerating(false)
        }
    }

    const generateCreditCoupon = async (e:any) => {
        e.preventDefault()
        try {
            if (!credit) {
                return toast.error('Please enter credit')
            }
            setIsGenerating(true)
            const res = await axios.post('/api/coupon', {
                email: session?.user?.email,
                planCode: 99,
                //convert to float number
                credit:  parseFloat(parseFloat(credit).toFixed(2))
            })
            setCoupon(res.data.data)
            setIsGenerating(false)
        } catch (e) {
            console.log(e)
            setIsGenerating(false)
        }
    }

    const [email, setEmail] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [manageUser, setManageUser] = useState(null)
    const [manageUserPlan, setManageUserPlan] = useState(null)

    const submit = async (e:any) => {
        e.preventDefault()
        try {
            if (!email) {
                return toast.error('Please enter an email')
            }
            setIsSearching(true)
            const res = await axios.get(`/api/profile?email=${email}`)
            setManageUser(res.data.data.user)
            setManageUserPlan(res.data.data.plans)
            setIsSearching(false)
        } catch (e:any) {
            toast.error(e.response.data.message)
            setIsSearching(false)
        }
    }

    const [isDeactivating, setIsDeactivating] = useState(false)
    const deactivatePlan = async (id:any) => {
        try {
            if (!id) {
                return toast.error('Please enter an id')
            }
            setIsDeactivating(true)
            const res = await axios.get(`/api/deactivate-plan?id=${id}`)
            toast.success(res.data.message)
            const res1 = await axios.get(`/api/profile?email=${email}`)
            setManageUser(res.data.data.user)
            setManageUserPlan(res.data.data.plans)
            setIsDeactivating(false)
        } catch (e:any) {
            toast.error(e.response.data.message)
            setIsDeactivating(false)
        }
    }

    const [isDeleting, setIsDeleting] = useState(false)
    const deletePlan = async (id:any) => {
        try {
            if (!id) {
                return toast.error('Please enter an id')
            }
            setIsDeleting(true)
            const res = await axios.get(`/api/delete-plan?id=${id}`)
            toast.success(res.data.message)
            setIsDeleting(false)
        } catch (e:any) {
            toast.error(e.response.data.message)
            setIsDeleting(false)
        }
    }

    const copyCode = async () => {
        try {
            // @ts-ignore
            const code = `code: ${coupon.code}\nplan: ${coupon.name}\ncredit: ${coupon.credit}\nCreated at: ${new Date(coupon.createdAt).toDateString()}\nPlan Duration: ${coupon.duration} days\nRedeem here: https://tuitionlink.in/#redeem`
            await navigator.clipboard.writeText(code)
            toast.success('Code copied')
        } catch (e) {
            console.log(e)
            toast.error('Failed to copy code')
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)` }}>
            {loading &&
                <Loading/>
            }
            {!loading &&
                <div className={'space-y-16 py-8'}>
                    <div className={'p-4 space-y-8'}>
                        <div className={'font-bold text-4xl text-center'}>
                            Generate Coupon
                        </div>
                        <div className={'grid grid-cols-1 p-4 gap-5 md:grid-cols-3'}>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <Button
                                        fullWidth
                                        onPress={() => generateCoupon(option.planCode)}
                                        isLoading={isGenerating}
                                    >
                                        {option.label}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={'space-y-4'}>
                        <div className={'font-semibold text-center text-medium'}>
                            Generate Credit Coupon
                        </div>
                        <div className={'flex w-full justify-center items-center'}>
                            <form className={'space-y-4 w-full max-w-[35rem]'} onSubmit={generateCreditCoupon}>
                                <Input
                                    label="Credit"
                                    radius="lg"
                                    placeholder="Enter credit"
                                    variant={'flat'}
                                    value={credit}
                                    onChange={(e) => setCredit(e.target.value)}
                                />
                                <div className={'w-full'}>
                                    <Button
                                        fullWidth
                                        variant={'flat'}
                                        color={'primary'}
                                        type={'submit'}
                                    >
                                        Generate Coupon
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={'bg-white p-4 rounded-md border text-medium font-semibold space-y-4'}>
                        <div>
                            Your code will appear here
                        </div>
                        <div className={'text-sm space-y-1 font-thin'}>
                            <div>
                                {/* @ts-ignore */}
                                code: <span className={'font-semibold'}>{coupon.code}</span>
                            </div>
                            <div>
                                {/* @ts-ignore */}
                                plan: <span className={'font-semibold'}>{coupon.name}</span>
                            </div>
                            <div>
                                {/* @ts-ignore */}
                                credit: <span className={'font-semibold'}>{coupon.credit}</span>
                            </div>
                            <div>
                                {/* @ts-ignore */}
                                Created at: <span className={'font-semibold'}>{new Date(coupon.createdAt).toDateString()}</span>
                            </div>
                            <div>
                                {/* @ts-ignore */}
                                Plan Duration: <span className={'font-semibold'}>{coupon.duration} days</span>
                            </div>
                            <div>
                                Redeem here: <span className={'font-semibold'}>https://tuitionlink.in/#redeem</span>
                            </div>
                        </div>
                        <Button
                            variant={'flat'}
                            color={'primary'}
                            onPress={copyCode}
                        >
                            Copy Code
                        </Button>
                    </div>
                    <Divider orientation={'horizontal'}/>
                    <div className={'px-4 space-y-8'}>
                        <div className={'font-bold text-4xl text-center'}>
                            Manage Users
                        </div>
                        <div className={'flex flex-col lg:flex-row justify-between items-center px-8 gap-5'}>
                            <form className={'w-full h-full'} onSubmit={submit}>
                                <div className={'w-full h-full flex justify-center items-center flex-col gap-8 '}>
                                    <Input
                                        label="Find User"
                                        radius="lg"
                                        placeholder="Enter user email"
                                        variant={'bordered'}
                                        className={'w-full max-w-[700px]'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        isLoading={isSearching}
                                        variant={'bordered'}
                                        className={'w-full max-w-[700px]'}
                                        color={'secondary'}
                                        type={'submit'}
                                    >
                                        Find User
                                    </Button>
                                </div>
                            </form>
                        </div>
                        {manageUser &&
                            <div className={'p-2'}>
                                <div className={'border-2 rounded-md p-4 space-y-4'}>
                                    <div className={'text-sm font-light space-y-1'}>
                                        <div>
                                            {/* @ts-ignore */}
                                            Name: {manageUser.name}
                                        </div>
                                        <div>
                                            {/* @ts-ignore */}
                                            Email: {manageUser.email}
                                        </div>
                                        <div>
                                            {/* @ts-ignore */}
                                            User Id: {manageUser.id}
                                        </div>
                                        <div>
                                            {/* @ts-ignore */}
                                            Role: {manageUser.role}
                                        </div>
                                        <div>
                                            {/* @ts-ignore */}
                                            Joined: {new Date(manageUser.createdAt).toDateString()}
                                        </div>
                                        <div>
                                            {/* @ts-ignore */}
                                            Password: {manageUser.password}
                                        </div>
                                    </div>
                                    <Divider orientation={'horizontal'}/>
                                    <div className={'font-bold text-sm'}>
                                        Edit User Plan
                                    </div>
                                    {/* @ts-ignore */}
                                    {manageUserPlan.length <= 0 &&
                                        <div>
                                            User has no active plan
                                        </div>
                                    }
                                    {manageUserPlan &&
                                        <div className={'space-y-4'}>
                                            {/* @ts-ignore */}
                                            {manageUserPlan.map((plan:any) => (
                                                <div key={plan.id}>
                                                    <div className={'text-sm font-light space-y-1 border rounded-md p-4'}>
                                                        <div>
                                                            {/* @ts-ignore */}
                                                            Plan: {plan.name}
                                                        </div>
                                                        <div>
                                                            {/* @ts-ignore */}
                                                            Status: {plan.active ? 'Active' : 'Inactive'}
                                                        </div>
                                                        <div>
                                                            {/* @ts-ignore */}
                                                            Start
                                                            Date: {new Date(plan.startDate).toDateString()}
                                                        </div>
                                                        <div>
                                                            {/* @ts-ignore */}
                                                            End Date: {new Date(plan.endDate).toDateString()}
                                                        </div>
                                                        <div className={'flex gap-2'}>
                                                            <Button
                                                                // @ts-ignore
                                                                onClick={() => deactivatePlan(plan.id)}
                                                                isLoading={isDeactivating}
                                                                variant={'flat'}
                                                                color={'warning'}
                                                            >
                                                                Deactivate Plan
                                                            </Button>
                                                            <Button
                                                                // @ts-ignore
                                                                onClick={() => deletePlan(plan.id)}
                                                                isLoading={isDeleting}
                                                                variant={'flat'}
                                                                color={'danger'}
                                                            >
                                                                Delete Plan
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}