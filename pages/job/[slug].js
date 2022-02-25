import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'

const JobDetails = ({ job }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <JobDetail job={job} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <JobWidget slug={job.slug} category='' employers={job.employers.map((employer) => employer.slug)} />
                            <Employers />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default JobDetails

// Fetch data at build time
// Function "getStaticProps" is for static site generation
// Note: "props" will be passed to the page component as props
// Note: get details of the job from job-slug e.g. details of cox
export async function getStaticProps({ params }) {
    const data = {
        timePeriod: 'Since Aug, 2018',
        slug: 'alaska',
        title: 'Alaska Airlines',
        content: '> paragraph 1...\n' +
            '- bullet 1\n' +
            '- bullet 2\n' +
            '- bullet 3\n' +
            '> paragraph 2',
        featuredImage: { url: 'https://media.graphcms.com/WHG34KqRTmqiKfOlPNev' },
        employers: [{name: 'Cognizant Technologies', slug: 'cognz'}]
    }

    return {
        props: { job: data },
    }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
// Function "getStaticPaths" pre-renders HTML page with dynamic routes. Here data comes from headless CMS
// Note: data is publicly cached (not user specific). "getStaticPaths" only runs at build time on server side.
// Note: "slug" is job-slug e.g. /job/cox - routed from job-widget or employers components
export async function getStaticPaths() {
    const categories = [{slug: 'alaska'}]
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}
// gets all jobs and creates dynamic paths based on unique job-slugs