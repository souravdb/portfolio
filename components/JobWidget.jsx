import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import { getRecentJobs, getSimilarJobsExceptSlug, getSimilarJobsByCategoryExceptSlug } from '../services'

const JobWidget = ({ slug, category, employers }) => {
    const [relatedJobs, setRelatedJobs] = useState([])

    useEffect(() => {
        if (category) {
            getSimilarJobsByCategoryExceptSlug(category, slug).then((result) => {
                setRelatedJobs(result)
            })
        } else if (slug) {
            getSimilarJobsExceptSlug(employers, slug).then((result) => {
                setRelatedJobs(result)
            })
        } else {
            getRecentJobs().then((result) => {
                setRelatedJobs(result)
            })
        }
    }, [slug, category, employers])

    if (relatedJobs.length > 0) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-4">
                <h3 className="text-3xl mb-8 font-semibold border-b text-blue-900 pb-4">{slug ? 'Related Jobs' : 'Recent Jobs'}</h3>
                {relatedJobs.map((job, index) => (
                    <div key={index} className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                            <Image
                                alt={job.title}
                                height="60px"
                                width="60px"
                                className="align-middle rounded-full"
                                src={`/${job.slug}.jpg`}
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <Link key={index} href={`/job/${job.slug}`} passHref>
                                <span className={`cursor-pointer block ${(index === job.title.length) ? 'border-b-0' : 'border-b'} font-semibold hover:text-blue-600 pb-1 mt-4`}>{job.title}</span>
                            </Link>
                            <p className='text-xs'>{job.location}</p>
                            <p className='text-md'>
                                <span className="align-middle text-sm">{job.fromDate ? moment(job.fromDate).format('YYYY') : moment(Date.now()).format('YYYY')}</span>
                                <span className="p-2">-</span><span className="align-middle text-sm">{job.toDate ? moment(job.toDate).format('YYYY') : moment(Date.now()).format('YYYY')}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default JobWidget