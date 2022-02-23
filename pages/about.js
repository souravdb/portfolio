import Markdown from 'react-markdown'

import { getAuthor } from '../services'

export default function About({ author }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<div className="bg-white shadow-lg rounded-lg lg:p-8 mb-8">
						<div className="float align-middle mb-6">
							<img
								id="author-photo"
								alt=""
								width="300px"
								height="300px"
								src={author.photo.url}
								className="align-middle rounded-full p-10"
							/>
						</div>

						<div className="px-4 lg:px-0">
							<h1 id="author-name" className="transition duration-700 text-center mb-8 hover:text-green-600 text-3xl font-semibold">
								{author.name}
							</h1>

							<div id="author-intro" className='mb-6'>
								<Markdown className='prose text-xl text-justify'>{author.intro}</Markdown>
							</div>

							<h1 id="author-edu-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Education
							</h1>

							<div id="author-edu" className='mb-6'>
								<Markdown className='prose text-sm'>{author.education}</Markdown>
							</div>

							<h1 id="author-con-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
								Contact
							</h1>

							<div id="author-con" className='mb-6'>
								<Markdown className='prose text-sm'>{author.contactInfo}</Markdown>
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
