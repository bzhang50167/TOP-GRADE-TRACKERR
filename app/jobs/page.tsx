"use client";

import { useEffect, useState } from 'react';
import { fetchJobs } from '../components/dispatch';
import Nav from '../components/nav';
import { useRouter } from 'next/navigation';
import AddNewJobModal from '../components/AddNewJobModal';
import { Job } from '@/lib/types';

export default function Jobs() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchData() {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    }
    fetchData();
  }, []);

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return (
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
      );
    });
  };

  const handleClick = (job: Job) => {
    router.push(`/jobs/${job.id}`)
  }
  console.log('jobs: ',jobs)

  return (
    <div className=''>

      <Nav />
      <div className="flex-col w-screen border-red-600 border-2">
        <h3 className="text-blue-500 text-3xl m-10">Your Jobs</h3>
        <label className="btn btn-primary" htmlFor="modal-1">Add New Job</label>
        <input className="modal-state" id="modal-1" type="checkbox" />
        <AddNewJobModal />
        {/* All Cards */}
        <div className='flex-col w-10/12 items-center self-center mt-8 p-4 border-2 border-black-400 gap-3'>
          {jobs.length > 0 ? (
            sortByDate(jobs).map((job: Job) => (
              <div onClick={() => handleClick(job)} key={job.id}>
                <div className="flex justify-between px-4">
                  <div className="text-content2 text-black">
                    DATE: {new Date(job.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="text-content2 text-black">
                    TIME:{" "}
                    {new Date(job.scheduledDate).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
                {/* SINGLE CARD */}
                <div className=" bg-primary w-11/12 items-center self-center">
                  <div className="card-body">
                    <div>
                      <div className="card-header p-4">{job.address}</div>
                    </div>
                    <div className="text-content2 flex justify-between">
                      <div>
                        {job.clientName}
                      </div>
                      <div>
                        {job.clientPhone}
                      </div>
                    </div>
                    <div className="text-content2 flex justify-left">
                      <div>
                        <h3>
                          Description:
                        </h3>
                        <div className="text-content3 text-black">
                          {job.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>

  );
}
