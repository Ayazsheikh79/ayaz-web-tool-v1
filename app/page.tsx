'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Loading from "@/app/components/Loading";
import {Button, Divider, Input, Link} from "@nextui-org/react";
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
                          Ferramenta
                      </div>
                      <div className={'flex justify-center items-center'}>
                          <button
                              className={'relative bg-white text-center w-full max-w-[700px] p-4 border rounded-md shadow-sm cursor-pointer'}
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
                      </div>
                  </div>
                  <Divider/>
                  <div id={'redeem'} className={'space-y-4'}>
                      <div className={'font-semibold text-3xl text-center'}>
                          Ativar código
                      </div>
                      <div className={'flex flex-col lg:flex-row justify-between items-center px-8 gap-5'}>
                          <form className={'w-full h-full'} onSubmit={submit}>
                              <div className={'w-full h-full flex justify-center items-center flex-col gap-8 '}>
                                  <Input
                                      label="Resgatar código"
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
                                      color={'primary'}
                                      type={'submit'}
                                  >
                                      Ativar
                                  </Button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <Divider/>
                  <div
                  className={'text-center'}>
                      <Link
                          href={'https://brazil.uaitool.in/member'}
                          className={'text-center'}
                      >
                          Retornar ao painel
                      </Link>
                  </div>
              </div>
          }
      </div>
  );
}
