import Link from 'next/link'

const Employers = () => {
    const employers = [{
        description: "Location: USA, India, Australia | From: 2015 | To: 2022",
        jobs: [{ slug: 'alaska' },],
        name: "Cognizant Technologies",
        slug: "cognz"
    }]

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-4">
            <h3 className="text-3xl mb-8 font-semibold border-b pb-4">Work History</h3>
            {employers.map((employer, index) => (
                <div key={index}>
                    <Link key={index} href={`/job/${employer.jobs[0].slug}`} passHref>
                        <span className={`cursor-pointer block ${(index === employers.length) ? 'border-b-0' : 'border-b'} font-semibold pb-1 mb-3`}>{employer.name}</span>
                    </Link>
                    <p className='text-sm pb-6'>{employer.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Employers