export const createJob = async (info:any) => {
    const res = await fetch('/api/jobs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const error = await res.text();
      throw new Error(error);
    }
};

export const fetchJobs = async () => {
    const res = await fetch(`/api/job`, {
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};

export const fetchJob = async (num: number) => {
    const res = await fetch(`/api/job/${num}`, {
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};
