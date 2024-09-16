import { createWarranty } from "./dispatch";
import { Job } from "@/lib/types";

export default function ExtendOrEndWarrantyModal(job: Job) {

    const extendWarranty = async () => {
        console.log('hit')
        await createWarranty(job.warranty + 1, job.id);
        window.location.href = "/";
      }

      const endWarranty = async () => {
        console.log('hit')
        await createWarranty(0, job.id);
        window.location.href = "/";
      }


    return (<div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5">
          <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h2 className="text-xl">Extend or End Warranty</h2>
          <span>1 Year Warranty or 3 Year Warranty</span>
          <div className="flex w-full">
            <button onClick={extendWarranty} className="btn btn-error btn-block">Extend</button>
            <button onClick={endWarranty} className="btn btn-primary btn-block">End</button>
          </div>
        </div>
      </div>)
}
