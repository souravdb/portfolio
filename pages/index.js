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

	// const data = {
    //     name: 'xx Sourav, Deb Barma',
    //     intro: '> xx I am a **Director of Engineering** projects with rich IT experience in *BFSI*, *Telecom* and *T&H* domains. I am hands deep into software development and testing, and is an active consultant and thought leader in **test automation**, **quality engineering** and **quality assurance**. I have been playing a significant role, for past few years, to help my clients to adopt **cloud-based technology**, as well as my engineering teams on ground to continuously code, test and deliver quality software in **Azure**.\n' +
    //         '\n' +
    //         '> xx As a senior **QE&A Leader at Cognizant Technologies**, North America – I always value principles such as *ownership*, *reliability* and *repeatability*. Above all, I esteem “team work” and individual focus towards “**quality**”. Being a **technology enthusiast**, I derive great pleasure in learning new things and aptly apply them at work.',
    //     education: '- Production Engineering\n- **Jadavpur University**, Kolkata, India \n- 1997',
    //     contactInfo: '- **469 803 8830**\n- *souravd.now@gmail.com*\n- *Woodstock, GA*',
    //     photo: { url: 'https://media.graphcms.com/YGzRFywYTYSasVxx6Nk3' }
    // }

	return {
		props: { bio: data },
	}
}
