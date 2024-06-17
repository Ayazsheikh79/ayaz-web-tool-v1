'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import axios from "axios";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import providers from '@/app/data/providers';
import { FaArrowRightLong } from "react-icons/fa6";
import { CiCircleAlert } from "react-icons/ci";

export default function Home() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [redeemCode, setRedeemCode] = useState('');
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [credits, setCredits] = useState(null);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        if (session) {
            axios.all([
                axios.get(`/api/user/credits?email=${session?.user?.email}`),
                axios.get(`/api/user/active-plans?email=${session?.user?.email}`)
            ]).then(axios.spread((res, res2) => {
                setCredits(res.data.data);
                setPlans(res2.data.data);
                setIsLoading(false);
            })).catch((e) => {
                toast.error(e.response.data.message);
                setIsLoading(false);
            });
        }
        if (status !== 'authenticated') {
            setIsLoading(false);
        }
    }, [session, status]);

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            if (!session) {
                toast.error('You need to login first');
                return
            }
            if (!redeemCode) {
                toast.error('Please enter redeem code');
                return
            }
            setIsRedeeming(true);
            const res = await axios.post('/api/redeem', {
                code: redeemCode,
                email: session?.user?.email
            });
            toast.success(res.data.message);
            setIsInvalid(false);
            setRedeemCode('');
            setIsRedeeming(false);
        } catch (e:any) {
            toast.error(e.response.data.message);
            setIsInvalid(true);
            setTimeout(() => {
                setIsInvalid(false);
            }, 2000);
            setIsRedeeming(false);
        }
    }

  return (
      <div style={{ height: `calc(100% - 64px)` }} className={'w-full'}>
          {isLoading && <Loading />}
          {!isLoading &&
              <div className={'w-full min-h-full space-y-8 p-4 lg:px-20'}>
                  {status !== 'authenticated' &&
                      <div className={'bg-warning-100 flex items-center gap-5 text-blacl font-medium text-sm rounded-sm shadow-sm p-4 w-full'}>
                          <CiCircleAlert />
                          <span>You are not logged in. Please <Link href={'/auth/login'} className="text-blue-500 underline">login</Link> to access your account information.</span>
                      </div>
                  }
                  <div className={'grid grid-cols-1 lg:grid-cols-2 gap-5'}>
                      <div className={'flex flex-col gap-5 w-full'}>
                          <div className={'bg-white font-medium text-medium text-default-700 p-4 rounded-sm shadow-sm space-y-4'}>
                              <div className={'text-secondary'}>
                                  Account Information
                              </div>
                              <Divider/>
                              <div className={'flex justify-between items-center'}>
                                  <div className={'text-sm font-semibold'}>
                                      Name: {session?.user?.name || "N/A"}
                                  </div>
                                  <div className="font-semibold text-sm">
                                      {/* @ts-ignore */}
                                      Credits: <span className="text-danger">{credits && typeof credits.amount === 'number' ? credits.amount.toFixed(2) : "N/A"}</span>
                                  </div>

                              </div>
                          </div>
                          <div id={'provider-information'} className={'bg-white font-medium text-medium text-default-700 p-4 rounded-sm shadow-sm space-y-4'}>
                              <div className={'text-secondary'}>
                                  Provider Information
                              </div>
                              <Divider/>
                              <div>
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
                                                              <span className={'text-primary mr-4 font-semibold'}>{index + 1}</span>
                                                              <div className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                                  <Image src={provider.image} width={32} height={32} alt={provider.provider} />
                                                              </div>
                                                              <span>{provider.provider}</span>
                                                          </div>
                                                      </TableCell>
                                                      <TableCell className={'text-danger text-sm font-medium'}>{provider.price.toFixed(2)}</TableCell>
                                                  </TableRow>
                                              ))}

                                      </TableBody>
                                  </Table>
                              </div>
                          </div>
                          <div className={'bg-white font-medium text-medium text-default-700 p-4 rounded-sm shadow-sm space-y-4'}>
                              <div className={'text-secondary'}>
                                  Plans and Pricing
                              </div>
                              <Divider/>
                              <div>
                                  You can view our plans and pricing <Link href={'/pricing'} className={'text-primary underline'}>here</Link>
                              </div>
                          </div>
                          <div className={'bg-white font-medium text-medium text-default-700 p-4 rounded-sm shadow-sm space-y-4'}>
                              <div className={'text-secondary'}>
                                  Support and Help
                              </div>
                              <Divider/>
                              <div className={'flex items-center gap-2'}>
                                  <div>
                                      For any queries or support, please contact us at:
                                  </div>
                                  <Link href={'https://t.me/AyazSheikh079'}>
                                      <Image
                                          src={'/telegram.png'}
                                          width={32}
                                          height={32}
                                          alt={'telegram'}
                                      />
                                  </Link>
                              </div>
                          </div>
                      </div>
                      <div id={'redeem'} className={'flex flex-col gap-5 w-full text-medium font-medium text-default-700'}>
                          <div className={'bg-white rounded-sm shadow-sm p-4 space-y-4'}>
                              <div className={'text-secondary'}>
                                    Redeem Code
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
                                          isLoading={isRedeeming}
                                      >
                                          Redeem
                                      </Button>
                                  </form>
                              </div>
                          </div>
                          <div className={'bg-white rounded-sm shadow-sm p-4 space-y-4'}>
                              <div className={'text-secondary'}>
                                  Our Tools
                              </div>
                              <Divider/>
                              <div className={'space-y-2'}>
                                  <Table hideHeader aria-label="services list" isStriped className={'w-full'}>
                                      <TableHeader>
                                          <TableColumn>NAME</TableColumn>
                                          <TableColumn>ACCESS</TableColumn>
                                      </TableHeader>
                                      <TableBody>
                                          <TableRow key="1">
                                              <TableCell>
                                                  <div className={'flex items-center gap-2 capitalize'}>
                                                      <div className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                          <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuA7ZTMWmVQhL_qZE7Z750dpoQKTSETbbwZw&s'} width={32} height={32}
                                                                 alt={'Envato elements'}/>
                                                      </div>
                                                      <span>Envato Elements</span>
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                    <Button
                                                        color={'success'}
                                                        size={'sm'}
                                                        variant={'flat'}
                                                        onClick={() => router.push('/envato')}
                                                    >
                                                        Access
                                                    </Button>
                                              </TableCell>
                                          </TableRow>
                                          <TableRow key="2">
                                              <TableCell>
                                                  <div className={'flex items-center gap-2 capitalize'}>
                                                      <div className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                          <Image src={'https://i.pinimg.com/736x/d3/49/36/d349363dc3c7297aa97363e6ec641d9d.jpg'} width={32} height={32}
                                                                 alt={'Freepik'}/>
                                                      </div>
                                                      <span>Freepik</span>
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  <Button
                                                      color={'success'}
                                                      size={'sm'}
                                                      variant={'flat'}
                                                      onClick={() => router.push('/freepik')}
                                                  >
                                                      Access
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                          <TableRow key="3">
                                              <TableCell>
                                                  <div className={'flex items-center gap-2 capitalize'}>
                                                      <div className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                          <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s'} width={32} height={32}
                                                                 alt={'Artlist'}/>
                                                      </div>
                                                      <span>Artlist Music</span>
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  <Button
                                                      color={'success'}
                                                      size={'sm'}
                                                      variant={'flat'}
                                                      onClick={() => router.push('/artlist-music')}
                                                  >
                                                      Access
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                          <TableRow key="4">
                                              <TableCell>
                                                  <div className={'flex items-center gap-2 capitalize'}>
                                                      <div className={'rounded-full w-8 h-8 overflow-hidden flex justify-center items-center border'}>
                                                          <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61AcQ3S7yYjYGw_dDyXv7y3mSYrZJeIPFvQ&s'} width={32} height={32}
                                                                 alt={'Artlist'}/>
                                                      </div>
                                                      <span>Artlist Footage</span>
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  <Button
                                                      color={'success'}
                                                      size={'sm'}
                                                      variant={'flat'}
                                                      onClick={() => router.push('/artlist-footage')}
                                                  >
                                                      Access
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                      </TableBody>
                                  </Table>
                                  <Link href={'/tools'}>
                                        <div className={'flex items-center gap-2 text-primary text-sm font-semibold translate-x-2'}>
                                            View More <FaArrowRightLong />
                                        </div>
                                  </Link>
                              </div>
                          </div>
                          <div className={'bg-white rounded-sm shadow-sm p-4 space-y-4 h-[300px]'}>
                              <div className={'text-secondary'}>
                                  Active Plans
                              </div>
                              <Divider/>
                              <div>
                                  {plans.length < 1 &&
                                      <div className={'text-sm text-danger'}>
                                          You do not have any active plans.
                                      </div>
                                  }
                                  {plans.length > 0 &&
                                      <div>
                                            <Table aria-label="Active Plans" isStriped className={'w-full'}>
                                                <TableHeader>
                                                    <TableColumn>NAME</TableColumn>
                                                    <TableColumn>START DATE</TableColumn>
                                                    <TableColumn>END DATE</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    {plans.map((plan, index) => (
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
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                      </div>
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          }
      </div>
  );
}
