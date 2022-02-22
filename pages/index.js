import { JobDetail, Employers, JobWidget } from '../components';

export default function Home() {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					<JobDetail />
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						<JobWidget />
						<Employers />
					</div>
				</div>
			</div>
		</div>
	);
}