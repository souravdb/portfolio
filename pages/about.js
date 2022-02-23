import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'

import { getAbout } from '../services'

export default function About() {
	const [bio, setBio] = useState([])

	useEffect(() => {
		getAbout().then((result) => {
			setBio(result)
		})
	}, [])

	console.log(bio)

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
						<div className="relative overflow-hidden shadow-md mb-6">
							<img
								alt=""
								width="100%"
								height="100%"
								// src={bio.featuredImage.url}
								className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
							/>
						</div>

						<div className="px-4 lg:px-0">
							<h1 className="transition duration-700 text-center mb-8 hover:text-green-600 text-3xl font-semibold">
								About...
							</h1>

							<div className='mb-6'>
								<Markdown className='prose text-xl'>{bio.intro}</Markdown>
							</div>

							<h1 className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Education
							</h1>

							<div className='mb-6'>
								<Markdown className='prose text-sm'>{bio.contactInfo}</Markdown>
							</div>

							<h1 className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Contact
							</h1>

							<div className='mb-6'>
								<Markdown className='prose text-sm'>{bio.education}</Markdown>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-4 col-span-1">
				</div>
			</div>
		</div>
	);
}