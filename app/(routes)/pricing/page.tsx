'use client'

import {Button, Divider} from "@nextui-org/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import tools from "@/app/data/subscription-tools";

export default function Page() {
    return (
        <div style={{ height: `calc(100% - 64px)` }} className={'w-full'}>
            <div className={'w-full min-h-full space-y-8 p-4 lg:px-20'}>
                <div className={'text-center space-y-4 text-medium font-medium text-default-700'}>
                    <div className={'text-lg text-secondary'}>
                        Choose the plan that works best for you
                    </div>
                </div>
                <Divider/>
                <div className={'font-semibold text-lg space-y-2'}>
                    <div className={'text-primary text-center'}>
                        Daily Downloads
                    </div>
                    <div
                        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-medium font-medium text-default-700'}>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Starter
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>150</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>3</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Daily 10 downloads
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Basic
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>270</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>4.5</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Daily 20 downloads
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Standard
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>405</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>7</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Daily 30 downloads
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Premium
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>540</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>9</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Daily 40 downloads
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={'font-semibold text-lg space-y-2'}>
                    <div className={'text-primary text-center'}>
                        Monthly Downloads
                    </div>
                    <div
                        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-medium font-medium text-default-700'}>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Starter
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>100</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>2</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            50 downloads per month
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Basic
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>180</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>3.6</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            100 downloads per month
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Standard
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>360</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>7.2</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            200 downloads per month
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Premium
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup className={'font-light'}>₹</sup>540</span><span
                                    className={'text-3xl'}> / </span><span className={'text-3xl'}><sup
                                    className={'font-light'}>$</sup>9</span>
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            300 downloads per month
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            1 month validity (30 days)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    {tools.map((tool, index) => (
                                        <div className={'flex items-center gap-2'} key={index}>
                                            <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                            <span className={'text-sm font-medium text-danger'}>
                                                {tool.provider}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={'font-semibold text-lg space-y-2'}>
                    <div className={'text-primary text-center'}>
                        Credits
                    </div>
                    <div
                        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-medium font-medium text-default-700'}>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Starter
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup
                                        className={'font-light'}>$</sup>5</span> / No Expiry
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Get Instant <span
                                            className={'bg-danger p-0.5 px-2 text-white text-xs rounded-sm'}>$5.00</span> Credits
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Lifetime validity (No Expiry)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access API
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            All Websites available in our platform
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Basic
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup
                                        className={'font-light'}>$</sup>10</span> / No Expiry
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Get Instant <span
                                            className={'bg-danger p-0.5 px-2 text-white text-xs rounded-sm'}>$10.00</span> Credits
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Lifetime validity (No Expiry)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access API
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            All Websites available in our platform
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Standard
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup
                                        className={'font-light'}>$</sup>20</span> / No Expiry
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Get Instant <span
                                            className={'bg-danger p-0.5 px-2 text-white text-xs rounded-sm'}>$20.00</span> Credits
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Lifetime validity (No Expiry)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access API
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            All Websites available in our platform
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                        <div className={'flex w-full justify-center'}>
                            <div className={'bg-white rounded-sm shadow-sm p-4 py-8 space-y-4 w-full lg:w-80'}>
                                <div className={'text-xl'}>
                                    Premium
                                </div>
                                <div>
                                    <span className={'text-3xl'}><sup
                                        className={'font-light'}>$</sup>40</span> / No Expiry
                                </div>
                                <Divider/>
                                <div className={'space-y-2'}>
                                    <div className={'capitalize'}>
                                        what you get
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Get Instant <span
                                            className={'bg-danger p-0.5 px-2 text-white text-xs rounded-sm'}>$40.00</span> Credits
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Lifetime validity (No Expiry)
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access API
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            24/7 Support
                                        </span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            Access more things in future
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <div className={'space-y-4'}>
                                    <div>
                                        Supported Websites
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <IoMdCheckmarkCircleOutline className={'text-success'}/>
                                        <span className={'text-sm font-medium text-danger'}>
                                            All Websites available in our platform
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'flat'}
                                    color={'primary'}
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}