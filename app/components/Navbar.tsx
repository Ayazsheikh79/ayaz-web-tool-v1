'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {useSession, signOut} from "next-auth/react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {useRouter} from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { MdOutlineDeveloperMode } from "react-icons/md";

export default function NavbarComponent() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {data: session, status} = useSession();
    const menuItems = [
        {
            name: 'Home',
            icon: <IoHomeOutline   />,
            href: '/'
        },
        {
            name: 'Profile',
            icon: <CiUser />,
            href: '/profile'
        },
        {
            name: 'Downloader / Tools',
            icon: <IoCloudDownloadOutline  />,
            href: '/tools'
        },
        {
            name: 'Pricing',
            icon: <MdOutlineAttachMoney   />,
            href: '/pricing'
        },
        {
            name: 'API / Developer',
            icon: <MdOutlineDeveloperMode    />,
            href: '/developer'
        },
        {
            name: 'Contact',
            icon: <RiMessage2Fill/>,
            href: '/contact'
        },
        {
            name: 'Sign Out',
            icon: <LiaSignOutAltSolid />,
        }
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered={true} className={'h-16 select-none'}>
            <NavbarContent>
                <NavbarBrand
                    className={'cursor-pointer'}
                >
                    <Link href={'/'} className={'text-black'}>
                        <p className="font-bold text-inherit">
                            PremiumGfx
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8 text-medium font-medium text-default-700" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/" className={'flex gap-1 text-default-700 justify-center items-center'}>
                        <MdDashboard />
                            Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={'/pricing'} className={'flex gap-1 text-default-700 justify-center items-center'}>
                        <IoIosPricetag />
                        Pricing
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={'/developer'} className={'flex gap-1 text-default-700 justify-center items-center'}>
                        # API
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={'/tools'} className={'flex gap-1 text-default-700 justify-center items-center'}>
                        <MdDownload />
                        Download
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={'/contact'} className={'flex gap-1 text-default-700 justify-center items-center'}>
                        <RiMessage2Fill  />
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {status === 'authenticated' &&
                <NavbarContent justify="end">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className=""
                    />
                </NavbarContent>
            }
            {status !== 'authenticated' &&
                <NavbarContent justify="end">
                    <NavbarItem className={''}>
                        <Button as={Link} color={'default'} variant={'flat'} href={'/auth/login'}>Login</Button>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            }
            <NavbarMenu className={'gap-0'}>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className={'border-b w-full cursor-pointer flex gap-5 items-center py-4 px-4 text-base font-semibold'}
                            href={item.href}
                            size="lg"
                            onClick={() => {
                                index === menuItems.length - 1 && signOut();
                            }}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
