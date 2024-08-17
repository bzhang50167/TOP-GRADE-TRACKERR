"use client";

import { useEffect, useState } from 'react';
import { createJob, fetchJobs } from '../components/dispatch';
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure to import the CSS for DatePicker
import Nav from '../components/nav';

interface Job {
  id: number;
  description: string;
  address: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  userId: number;
  scheduledDate: string;
  warranty: number;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]); // Initialize as an empty array
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [date, setDate] = useState<string | null>(null); // Change type to string | null
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [warranty, setWarranty] = useState<string>('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleWarrantyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWarranty(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      // Format date in ISO string format
      const isoString = date.toISOString();
      setDate(isoString);
    }
  };

  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && street.trim() !== "" && city.trim() !== "" && state.trim() !== "" && description.trim() !== "";
  };

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

  const submitData = async () => {
    console.log('clicked');
    if (street === "" || city === "" || state === "" || description === "" || name === "" || phone === "" || date === null || email === "") {
      console.error('Form validation failed');
      return;
    }

    const address = `${street}, ${city}, ${state}`;
    const passingData = {
      address,
      description,
      userId: 1,
      clientName: name,
      clientPhone: phone,
      scheduledDate: date,
      clientEmail: email,
      warranty: +warranty
    };

    try {
      const res = await createJob(passingData);
      console.log('Job created:', res);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>

      <Nav />
      <div className="container border-red-600 border-2">
        <div className="text-blue-500 text-3xl m-10">Your Jobs</div>
        <label className="btn btn-primary" htmlFor="modal-1">Add New Job</label>
        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-1"></label>
          <div className="modal-content flex flex-col gap-5">
            <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 className="text-xl">Adding Job</h2>
            <section className="bg-gray-2 rounded-xl">
              <div className="p-8 shadow-lg">
                <form className="space-y-4">
                  <div className="w-full">
                    <label className="sr-only" htmlFor="name">Client Name</label>
                    <input
                      className="input input-solid max-w-full"
                      placeholder="Client Name"
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">Client Email</label>
                      <input
                        className="input input-solid"
                        placeholder="Client Email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">Client Phone</label>
                      <input
                        className="input input-solid"
                        placeholder="Client Phone Number"
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="address">Address</label>
                      <input
                        className="input input-solid"
                        placeholder="Address"
                        type="text"
                        id="address"
                        value={street}
                        onChange={handleStreetChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="city">City</label>
                      <input
                        className="input input-solid"
                        placeholder="City"
                        type="text"
                        id="city"
                        value={city}
                        onChange={handleCityChange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="state">State</label>
                      <input
                        className="input input-solid"
                        placeholder="State"
                        type="text"
                        id="state"
                        value={state}
                        onChange={handleStateChange}
                      />
                    </div>
                  </div>


                  <div>
                    <label className="sr-only" htmlFor="warranty">Warranty</label>
                    <textarea
                      className="input input-solid"
                      placeholder="Warranty"
                      id="warranty"
                      value={warranty}
                      onChange={handleWarrantyChange}
                    ></textarea>
                  </div>

                  <div className="w-full">
                    <label className="sr-only" htmlFor="description">Description</label>
                    <textarea
                      className="textarea textarea-solid max-w-full"
                      placeholder="Description"
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                    ></textarea>
                  </div>

                  <div className="w-full">
                    <label className="sr-only" htmlFor="dateTime">Select Date and Time</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}
                      className="input input-solid"
                    />
                  </div>
                  <button onClick={submitData} className={`btn btn-error btn-block ${isFormValid() ? '' : 'disabled'}`} disabled={!isFormValid()}>Add</button>

                  <button className="btn btn-block">Cancel</button>
                </form>
              </div>
            </section>
          </div>
        </div>
        <div>
          {jobs.length > 0 ? (
            sortByDate(jobs).map((job: Job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <div className="flex pl-10 pr-10 mt-8">
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
                <div className="card bg-primary w-screen">
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
              </Link>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>

  );
}
