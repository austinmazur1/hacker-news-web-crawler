"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FilterSelectorProps {
  filter: string;
}

export default function FilterSelector({ filter }: FilterSelectorProps) {
  // This component is used to select the filter for the Hacker News entries
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filter);

  useEffect(() => {
    setSelectedFilter(selectedFilter);
  }, [selectedFilter]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);
    router.push(`/?filter=${newFilter}`);
  };
  
  return (
    <div className="my-4 flex flex-col items-start gap-2">
      <label htmlFor="filter" className="mr-2">
        Choose filtering method:
      </label>
      <select
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        className="p-2 border-1 border-slate-500 rounded-md"
        name="filter"
      >
        <option value="none">None</option>
        <option value="more-than-five">
          Titles more than five words, comments descending
        </option>
        <option value="less-than-five">
          Titles five words or less, ordered by points
        </option>
      </select>
    </div>
  );
}
