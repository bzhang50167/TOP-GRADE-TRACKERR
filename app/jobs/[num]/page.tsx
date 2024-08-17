"use client";

import { useEffect, useState } from "react";
import { fetchJob } from "../../components/dispatch";
import { redirect } from "next/navigation";

const loadScript = (url: string, callback: () => void) => {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
  }
  if (existingScript && callback) callback();
};

const Jobs = ({ params }: { params: { num: number } }) => {
  const [job, setJob] = useState<any>(null);
  const { num } = params;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await fetchJob(num);
      setJob(fetchedJob);
    };
    fetchData();
  }, [num]);
  let YOUR_API_KEY: string = process.env.REACT_APP_YOUR_API_KEY as string;
  console.log(job);
  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDnKEeDUQ_wf2JhICaZYoSSzYi8SlaeaDI&libraries=places`, () => {
    });
  }, []);

  return (
    <div className="container">
      <div>
        <div>{job && <StreetViewPage job={job} />}</div>
      </div>
    </div>
  );
};

interface StreetViewPageProps {
  job: any;
}


const StreetViewPage: React.FC<StreetViewPageProps> = ({ job }) => {


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const fetchedUser = await fetchUser(user.email);
  //       setUserData(fetchedUser);
  //       console.log('user logged in', user)
  //       console.log('fetchedUser in useEffect => ', fetchedUser)
  //     } catch (err) {
  //       console.log("Error has occured => ", err);
  //     }
  //   }
  //   fetchData();
  // }, [user]);

  useEffect(() => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: job.address }, (results: any, status) => {
      if (status === "OK" && results[0]) {
        const position = results[0].geometry.location;

        const streetViewPano = document.getElementById("street-view-pano");
        if (!streetViewPano) return;

        const panorama = new window.google.maps.StreetViewPanorama(streetViewPano, {
          position: position,
          pov: { heading: 165, pitch: 1 },
          zoom: 1,
          disableDefaultUI: true,
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason: ",
          status
        );
      }
    });
  }, [job]);

  const handleClickCall = () => {
    const uri = `tel:${job.clientPhone}`;

    window.open(uri);
  };
  const handleClickText = () => {
    const uri = `sms:${job.clientPhone}`;

    window.open(uri);
  };
  const handleDirection = () => {
    const address = encodeURIComponent(job.address);
    const uri = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(uri, "_blank");
  }

  // const warrentyData1 = async () => {
  //   const data = {
  //     "duration": 1,
  //     "jobId": job.id
  //   }

  //   await createWarrenty(data);
  //   window.location.href = "/";

  // }

  // const warrentyData3 = async () => {
  //   const data = {
  //     "duration": 3,
  //     "jobId": job.id
  //   }

  //   await createWarrenty(data);
  //   window.location.href = "/";

  // }

  // const extendWarrenry = async (num: number) => {
  //   const data = {
  //     "duration": job.warrenties[0].duration + 1,
  //     "jobId": job.id
  //   }

  //   await editWarrenty(data, num);
  //   window.location.href = "/";
  // }



  return (
    <div className="p-10 w-full" style={{ width: "100vw" }}>
      <div className="text-red-100 text-xs mb-5">{job.address}</div>
      <div className="rounded border-opacity-5 shadow-outline" id="street-view-pano" style={{ width: "100%", height: "300px" }}></div>
      <div className="mt-8">
        Description
      </div>
      <div className="mb-5">
        {job.description}
      </div>
      <div>
        Warrenty Duration:
        {job.warranty ? job.warranty :
          <span>
            <label htmlFor="modal-1">Add Warrenty</label>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
              <label className="modal-overlay" htmlFor="modal-1"></label>
              <div className="modal-content flex flex-col gap-5">
                <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <h2 className="text-xl">Add Warrenty</h2>
                <span>1 Year Warrenty or 3 Year Warrenty</span>
              </div>
            </div>
          </span>}
        {/* Warrenty Duration:
       
                <span>1 Year Warrenty or 3 Year Warrenty</span> */}
        {/* <div className="flex gap-3">
                  <button onClick={warrentyData1} className="btn btn-error btn-block">Add 1 Year Warrenty</button>

                  <button onClick={warrentyData3} className="btn btn-primary btn-block">Add 3 Year Warrenty</button>
                </div> */}
        {/* </div>
            </div></span>} */}
        {job?.warrenties?.length > 0 && (
          <div>
            <label htmlFor="modal-1">Extend or Edit Warranty</label>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
              <label className="modal-overlay" htmlFor="modal-1"></label>
              <div className="modal-content flex flex-col gap-5">
                <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <h2 className="text-xl">Extend or Edit Warranty</h2>
                <span>1 Year Warranty or 3 Year Warranty</span>
                {/* <div className="flex w-full">
                  <button onClick={() => extendWarranty(job.warrenties[0].id)} className="btn btn-error btn-block">Extend</button>
                  <button className="btn btn-primary btn-block">Edit</button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          {job.clientName}
        </div>
        <div className="flex">
          <button onClick={handleClickCall} className="mr-6">
            {/* <FontAwesomeIcon icon={faPhone} /> */}
            phone
          </button>
          <button onClick={handleClickText}>
            sms
            {/* <FontAwesomeIcon icon={faSms} /> */}
          </button>
        </div>
      </div>
      <button onClick={handleDirection}>Directions</button>
    </div>
  );
};

export default Jobs;
