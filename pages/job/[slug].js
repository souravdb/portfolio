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
// The "getStaticProps" is an "async" function that we need to "export data" inside the page component as "props" e.g. "job"...
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

// The "getStaticPaths" is an "async" function to statically pre-render pages using dynamic routes e.g. "job/alaska", or "job/cox", etc...
export async function getStaticPaths() {
    const categories = [{slug: 'alaska'}]
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}