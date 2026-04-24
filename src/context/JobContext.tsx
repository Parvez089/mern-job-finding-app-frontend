"use client";

import React, { createContext, useContext, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  city: string;
  location: string;
  [key: string]: any;
}

interface JobContextType {
  searchResults: Job[];
  setSearchResults: (jobs: Job[]) => void;
  clearSearch: () => void;
}

const JobContext = createContext<JobContextType>({
  searchResults: [],
  setSearchResults: () => {},
  clearSearch: () => {},
});

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  const clearSearch = () => setSearchResults([]);

  return (
    <JobContext.Provider value={{ searchResults, setSearchResults, clearSearch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);