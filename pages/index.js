import { About } from '../components'

import { getBio } from '../services'

export default function Home({ bio }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<About bio={bio} />
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps() {
	const data = (await getBio()) || []
	return {
		props: { bio: data },
	}
}
