import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useRouter } from "next/navigation";

export const TopBar = ({ collapsed, toggled, showSidebar = true }: { collapsed: any, toggled: any, showSidebar: boolean }) => {
    const [isMobileSize, setIsMobileSize] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const isMobileSize = width <= 640
            setIsMobileSize(isMobileSize)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [])

    return (
        <div className='bg-custom_primary border-b p-2'>
            <div className='flex items-center justify-between'>
                {
                    showSidebar && (
                        <button className='bg-gray-800 ' style={{ borderRadius: 100, padding: 5, backgroundColor: 'transparent' }}
                            onClick={isMobileSize ? toggled : collapsed}
                        >
                            <RxHamburgerMenu size={20} style={{
                                color: 'white'
                            }} />
                        </button>
                    )
                }

                <div className='flex ml-auto'>
                    <div className='hidden sm:flex sm:items-center sm:ml-6'>
                        <div className='ml-3 relative'>
                            <DropDown>
                                <DropDown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {"TestsUser"}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </DropDown.Trigger>
                                <DropDown.Content>
                                    <button className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '

                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            router.push("/");
                                        }}
                                    >
                                        Log Out
                                    </button>

                                </DropDown.Content>
                            </DropDown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
