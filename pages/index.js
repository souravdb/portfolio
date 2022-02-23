import { JobDetail, Employers, JobWidget } from '../components'

// (1) The "getJobs" (async) function will fetch "jobs" data from Graph CMS...
import { getJobs } from '../services'

// (3) The "props" data (jobs) is rendered as HTML page...
export default function Home({ jobs }) {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<JobDetail job={jobs[0].node} />
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						{(jobs.length > 0) ? <JobWidget /> : ""}
						<Employers />
					</div>
				</div>
			</div>
		</div>
	)
}

// (2) The "getStaticProps" (async) function exports data at build time (ahead of user's request)...
// The data (e.g. "jobs" from headless CMS in this case) is exported inside the HTML page component as "props"...
export async function getStaticProps() {
	const data = (await getJobs()) || []
	return {
		props: { jobs: data },
	}
}
