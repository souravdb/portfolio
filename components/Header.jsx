import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getCategories } from '../services'

const Header = () => {
    const bio = { firstName: 'SOURAV', lastName: 'DEB BARMA', location: 'Woodstock, GA', phoneNo: '(469)-803-8830', email: 'souravd.now@gmail.com' }
	
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result)
        })
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/" passHref>
                        <span className='cursor-pointer'>
                            <Image
                                alt="SDB"
                                height="100px"
                                width="100px"
                                unoptimized
                                className="align-middle rounded-full"
                                src="https://media.graphcms.com/output=format:jpg/resize=width:100,height:100,fit:crop/YGzRFywYTYSasVxx6Nk3"
                            />
                        </span>
                    </Link>
                </div>
                <div>
                    {/* <table>
                        <tr>
                            <td>
                                <table>
                                    <tr><td><span className="md:float-left mt-2 align-left text-white ml-4 text-md px-4 font-semibold">{bioData.firstName} {bioData.lastName}</span></td></tr>
                                    <tr><td><span className="md:float-left mt-2 align-left text-white ml-4 text-sm px-4">{bioData.location}</span></td></tr>
                                    <tr><td><span className="md:float-left mt-2 align-left text-white ml-4 text-sm px-4">{bioData.phoneNo}</span></td></tr>
                                    <tr><td><span className="md:float-left mt-2 align-left text-white ml-4 text-sm px-4">{bioData.email}</span></td></tr>
                                </table>
                            </td>
                        </tr>
                    </table> */}
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`} passHref>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 px-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header