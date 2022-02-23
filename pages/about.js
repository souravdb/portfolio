import Markdown from 'react-markdown'
import Image from 'next/image'

import { getAuthor } from '../services'

export default function About({ author }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
						<div className="text-center mt-20 mb-8 p-12 relative rounded-lg">
							<Image
								id="author-photo"
								alt={author.name}
								height="300px"
								width="300px"
								className="align-middle rounded-full"
								src={author.photo.url}
							/>
						</div>

						<div className="px-4 lg:px-0">
							<h1 id="author-name" className="transition duration-700 text-center mb-8 hover:text-green-600 text-3xl font-semibold">
								{author.name}
							</h1>

							<div className='mb-6'>
								<Markdown id="author-intro" className='prose text-xl text-justify'>{author.intro}</Markdown>
							</div>

							<h1 id="author-edu-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Education
							</h1>

							<div className='mb-6'>
								<Markdown id="author-edu" className='prose text-sm'>{author.education}</Markdown>
							</div>

							<h1 id="author-con-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Contact
							</h1>

							<div className='mb-6'>
								<Markdown id="author-con" className='prose text-sm'>{author.contactInfo}</Markdown>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-4 col-span-1">
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps() {
	const data = (await getAuthor()) || []
	return {
		props: { author: data },
	}
}
