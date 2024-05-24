'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Loading from "@/app/components/Loading";
import {Button, Divider, Input} from "@nextui-org/react";
import axios from "axios";
import {toast} from "sonner";
import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [redeemCode, setRedeemCode] = useState('');
    const [isRedeeming, setIsRedeeming] = useState(false);

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
            setIsRedeeming(false);
        } catch (e:any) {
            toast.error(e.response.data.message);
            setIsRedeeming(false);
        }
    }

  return (
      <div style={{ height: `calc(100% - 64px)` }} className={'w-full'}>
          {isLoading && <Loading />}
          {!isLoading &&
              <div className={'w-full h-full space-y-16 p-4'}>
                  <div className={'space-y-4'}>
                      <div className={'font-semibold text-3xl text-center'}>
                          Our Tools
                      </div>
                      <div className={'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                          <button
                              className={'relative bg-white text-center w-full p-4 border rounded-md shadow-sm cursor-pointer'}
                              onClick={() => router.push('/freepik')}
                          >
                        <span className={'text-xl font-medium'}>
                            Freepik
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzpNey6VIMF1a7oadCGXKvq9rYo7bu9PKDKk6Ln0cyAQ&s'}
                                  alt={'freepik'}
                                  width={42}
                                  height={42}
                                  className={'absolute left-5 top-1/2 transform -translate-y-1/2'}
                              />
                          </button>
                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/envato')}
                          >
                        <span className={'text-xl font-medium'}>
                            Envato Elements
                        </span>
                              <Image
                                  src={'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/92c1faae-4f9e-4efd-ab56-0c1423bcf470.png'}
                                  alt={'envato'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/artlist-music')}
                          >
                        <span className={'text-xl font-medium'}>
                            Artlist Music
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                  alt={'artlist'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/artlist-footage')}
                          >
                        <span className={'text-xl font-medium'}>
                            Artlist Footage (video)
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                  alt={'artlist'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/artlist-sfx')}
                          >
                        <span className={'text-xl font-medium'}>
                            Artlist Sound Effects
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                  alt={'artlist'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/artlist-sfx')}
                          >
                        <span className={'text-xl font-medium'}>
                            Artlist Sound Effects
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                  alt={'artlist'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/artlist-templates')}
                          >
                        <span className={'text-xl font-medium'}>
                            Artlist Video Templates
                        </span>
                              <Image
                                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                  alt={'artlist'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                          <button
                              className={'relative bg-white text-center w-full p-4 border cursor-pointer rounded-md shadow-sm'}
                              onClick={() => router.push('/vectorstock')}
                          >
                        <span className={'text-xl font-medium'}>
                            VectorStock
                        </span>
                              <Image
                                  src={'https://cdn.vectorstock.com/img/icons/vectorstock-fb-logo.jpg'}
                                  alt={'vectorstock'}
                                  width={52}
                                  height={52}
                                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full'}
                              />
                          </button>

                      </div>
                  </div>
                  <Divider/>
                  <div id={'redeem'} className={'space-y-4'}>
                      <div className={'font-semibold text-3xl text-center'}>
                          Redeem Code
                      </div>
                      <div className={'flex flex-col lg:flex-row justify-between items-center px-8 gap-5'}>
                          <form className={'w-full h-full'} onSubmit={submit}>
                              <div className={'w-full h-full flex justify-center items-center flex-col gap-8 '}>
                                  <Input
                                      label="Redeem Code"
                                      radius="lg"
                                      placeholder="Enter your redeem code here"
                                      variant={'flat'}
                                      className={'w-full max-w-[700px]'}
                                      value={redeemCode}
                                      onChange={(e) => setRedeemCode(e.target.value)}
                                  />
                                  <Button
                                      isLoading={isRedeeming}
                                      variant={'flat'}
                                      className={'w-full max-w-[700px]'}
                                      color={'secondary'}
                                      type={'submit'}
                                  >
                                      Redeem
                                  </Button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <Divider/>
                  <div className={'space-y-8 pb-4'} id={'plans'}>
                      <div className={'font-semibold text-3xl text-center'}>
                          Our Plans
                      </div>
                      <div className={'space-y-2'}>
                          <div className={'font-semibold text-xl'}>
                              Individual Plan (daily limit)
                          </div>
                          <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 text-default-100'}>
                              <div className={'p-4 rounded-md bg-gradient-to-r from-slate-900 to-teal-900 space-y-4'}>
                                  <div className={'font-semibold text-xl text-center'}>
                                      Envato Elements
                                  </div>
                                  <Divider className={'bg-default-300'}/>
                                  <div className={'space-y-4'}>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Basic
                                          </span>
                                          <span className={'text-center'}>
                                              10 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;150 / $2.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Standard
                                          </span>
                                          <span className={'text-center'}>
                                              20 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;250 / $4.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Premium
                                          </span>
                                          <span className={'text-center'}>
                                              30 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;400 / $6.5
                                          </span>
                                      </div>
                                      <Button
                                          variant={'flat'}
                                          color={'primary'}
                                          fullWidth
                                          className={'text-default-100 font-thin'}
                                          onPress={() => router.push('https://t.me/AyazSheikh079')}
                                      >
                                          Subscribe
                                      </Button>
                                  </div>
                                  <div>
                                      <Divider className={'bg-default-300'}/>
                                      <div className={'text-xs font-thin text-default-300'}>
                                          Note: All plans are monthly based
                                      </div>
                                  </div>
                              </div>
                              <div className={'p-4 rounded-md bg-gradient-to-r from-slate-900 to-teal-900 space-y-4'}>
                                  <div className={'font-semibold text-xl text-center'}>
                                      Freepik
                                  </div>
                                  <Divider className={'bg-default-300'}/>
                                  <div className={'space-y-4'}>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Basic
                                          </span>
                                          <span className={'text-center'}>
                                                10 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;150 / $2.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Standard
                                          </span>
                                          <span className={'text-center'}>
                                              20 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;250 / $4.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Premium
                                          </span>
                                          <span className={'text-center'}>
                                              30 files / day
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;400 / $6.5
                                          </span>
                                      </div>
                                      <Button
                                          variant={'flat'}
                                          color={'primary'}
                                          fullWidth
                                          className={'text-default-100 font-thin'}
                                          onPress={() => router.push('https://t.me/AyazSheikh079')}
                                      >
                                          Subscribe
                                      </Button>
                                  </div>
                                  <div>
                                      <Divider className={'bg-default-300'}/>
                                      <div className={'text-xs font-thin text-default-300'}>
                                          Note: All plans are monthly based
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className={'space-y-2'}>
                          <div className={'font-semibold text-xl'}>
                              Individual Plan (monthly limit)
                          </div>
                          <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 text-default-100'}>
                              <div className={'p-4 rounded-md bg-gradient-to-r from-slate-900 to-teal-900 space-y-4'}>
                                  <div className={'font-semibold text-xl text-center'}>
                                      Envato Elements
                                  </div>
                                  <Divider className={'bg-default-300'}/>
                                  <div className={'space-y-4'}>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Basic
                                          </span>
                                          <span className={'text-center'}>
                                              100 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;150 / $2.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Standard
                                          </span>
                                          <span className={'text-center'}>
                                              200 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;250 / $4.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Premium
                                          </span>
                                          <span className={'text-center'}>
                                              300 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;400 / $6.5
                                          </span>
                                      </div>
                                      <Button
                                          variant={'flat'}
                                          color={'primary'}
                                          fullWidth
                                          className={'text-default-100 font-thin'}
                                          onPress={() => router.push('https://t.me/AyazSheikh079')}
                                      >
                                          Subscribe
                                      </Button>
                                  </div>
                                  <div>
                                      <Divider className={'bg-default-300'}/>
                                      <div className={'text-xs font-thin text-default-300'}>
                                          Note: All plans are monthly based
                                      </div>
                                  </div>
                              </div>
                              <div className={'p-4 rounded-md bg-gradient-to-r from-slate-900 to-teal-900 space-y-4'}>
                                  <div className={'font-semibold text-xl text-center'}>
                                      Freepik
                                  </div>
                                  <Divider className={'bg-default-300'}/>
                                  <div className={'space-y-4'}>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Basic
                                          </span>
                                          <span className={'text-center'}>
                                                100 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;150 / $2.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Standard
                                          </span>
                                          <span className={'text-center'}>
                                              200 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;250 / $4.5
                                          </span>
                                      </div>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              Premium
                                          </span>
                                          <span className={'text-center'}>
                                              300 files / month
                                          </span>
                                          <span className={'text-end'}>
                                              &#8377;400 / $6.5
                                          </span>
                                      </div>
                                      <Button
                                          variant={'flat'}
                                          color={'primary'}
                                          fullWidth
                                          className={'text-default-100 font-thin'}
                                          onPress={() => router.push('https://t.me/AyazSheikh079')}
                                      >
                                          Subscribe
                                      </Button>
                                  </div>
                                  <div>
                                      <Divider className={'bg-default-300'}/>
                                      <div className={'text-xs font-thin text-default-300'}>
                                          Note: All plans are monthly based
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className={'space-y-2'}>
                          <div className={'font-semibold text-xl'}>
                              On Demand Credits
                          </div>
                          <div className={'grid grid-cols-1 gap-5 text-default-100'}>
                              <div className={'p-4 rounded-md bg-gradient-to-r from-slate-900 to-teal-900 space-y-4'}>
                                  <div className={'font-semibold text-xl text-center'}>
                                      1 Credit = &#8377;10 / $0.2
                                  </div>
                                  <Divider className={'bg-default-300'}/>
                                  <div className={'space-y-4'}>
                                      <div className={'grid grid-cols-3'}>
                                          <span>
                                              1 Credit = 1 File (from envato or freepik)
                                          </span>

                                      </div>
                                      <Button
                                          variant={'flat'}
                                          color={'primary'}
                                          fullWidth
                                          className={'text-default-100 font-thin'}
                                          onPress={() => router.push('https://t.me/AyazSheikh079')}
                                      >
                                          Subscribe
                                      </Button>
                                  </div>
                                  <div>
                                      <Divider className={'bg-default-300'}/>
                                      <div className={'text-xs font-thin text-default-300'}>
                                          Note: Credits are valid for 1 month
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          }
      </div>
  );
}
