import { About, Employers, JobWidget } from '../components'

// (1) The "getBio" (async) function will fetch "bio" data from Graph CMS...
import { getBio } from '../services'

// (3) The "props" data (jobs) is rendered as HTML page...
export default function Home({ bio }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<About bio={bio} />
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						<JobWidget />
						<Employers />
					</div>
				</div>
			</div>
		</div>
	)
}

// (2) The "getStaticProps" (async) function exports data at build time (ahead of user's request)...
// The data (e.g. "bio" data from headless CMS in this case) is exported inside the HTML page component as "props"...
export async function getStaticProps() {
	const data = (await getBio()) || []
	return {
		props: { bio: data },
	}
}
