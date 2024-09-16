import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure to import the CSS for DatePicker
import { createJob } from "./dispatch";

export default function AddNewJobModal() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [date, setDate] = useState<string | null>(null); // Change type to string | null
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");

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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      street.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      description.trim() !== ""
    );
  };

  const submitData = async () => {
    console.log("clicked");
    if (
      street === "" ||
      city === "" ||
      state === "" ||
      description === "" ||
      name === "" ||
      phone === "" ||
      date === null ||
      email === ""
    ) {
      console.error("Form validation failed");
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
      warranty: +warranty,
    };

    try {
      const res = await createJob(passingData);
      console.log("Job created:", res);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="modal">
      <label className="modal-overlay" htmlFor="modal-1"></label>
      <div className="modal-content flex flex-col gap-5">
        <label
          htmlFor="modal-1"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </label>
        <h2 className="text-xl">Adding Job</h2>
        <section className="bg-gray-2 rounded-xl">
          <div className="p-8 shadow-lg">
            <form className="space-y-4">
              <div className="w-full">
                <label className="sr-only" htmlFor="name">
                  Client Name
                </label>
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
                  <label className="sr-only" htmlFor="email">
                    Client Email
                  </label>
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
                  <label className="sr-only" htmlFor="phone">
                    Client Phone
                  </label>
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
                  <label className="sr-only" htmlFor="address">
                    Address
                  </label>
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
                  <label className="sr-only" htmlFor="city">
                    City
                  </label>
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
                  <label className="sr-only" htmlFor="state">
                    State
                  </label>
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
                <label className="sr-only" htmlFor="warranty">
                  Warranty
                </label>
                <textarea
                  className="input input-solid"
                  placeholder="Warranty"
                  id="warranty"
                  value={warranty}
                  onChange={handleWarrantyChange}
                ></textarea>
              </div>

              <div className="w-full">
                <label className="sr-only" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="textarea textarea-solid max-w-full"
                  placeholder="Description"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>

              <div className="w-full">
                <label className="sr-only" htmlFor="dateTime">
                  Select Date and Time
                </label>
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
              <button
                onClick={submitData}
                className={`btn btn-error btn-block ${
                  isFormValid() ? "" : "disabled"
                }`}
                disabled={!isFormValid()}
              >
                Add
              </button>

              <button className="btn btn-block">Cancel</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
