import { JobDetail, Employers, JobWidget } from '../components';

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
	);
}

export async function getStaticProps() {
	const data = [{
		node: {
			timePeriod: 'Since Aug, 2018',
			slug: 'alaska',
			title: 'Alaska Airlines',
			content: '> paragraph 1...\n' +
				'- bullet 1\n' +
				'- bullet 2\n' +
				'- bullet 3\n' +
				'> paragraph 2',
			featuredImage: { url: 'https://media.graphcms.com/WHG34KqRTmqiKfOlPNev' },
			employers: ['cognizant']
		}
	}]
	
	return {
		props: { jobs: data },
	};
}
