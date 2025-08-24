import { useEffect, useMemo, useState } from "react";

export function ProgressCard({
  items = [],
  statusKey = "status",
  title = "Progress",
  statusOptions = [],
  isLoading,
  isError
}) {
  const total = items.length;

  const [type, setType] = useState(statusOptions[0]?.value || "");
  const [displayValue, setDisplayValue] = useState(0);

  const counts = useMemo(() => {
    const countsMap = {};
    statusOptions.forEach(({ value }) => {
      countsMap[value] = items.filter((item) => item[statusKey] === value).length;
    });
    return countsMap;
  }, [items, statusOptions, statusKey]);

  const targetProgress = useMemo(() => {
    if (!type || total === 0) return 0;
    return Math.round((counts[type] / total) * 100);
  }, [type, counts, total]);

  useEffect(() => {
    let current = displayValue;
    const step = targetProgress > current ? 1 : -1;

    const interval = setInterval(() => {
      current += step;
      setDisplayValue(current);
      if (current === targetProgress) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [targetProgress]);

  const currentColor = statusOptions.find((opt) => opt.value === type)?.color || "text-info";

  if (isLoading) return (
        <div className="card skeleton shadow-md flex justify-center items-center">
          <span className="loading loading-bars loading-xl "></span>
        </div>
  )

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body items-center">
        <div className="flex justify-between w-full mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <select
            className="select select-primary select-bordered select-sm"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`radial-progress ${currentColor}`}
          style={{
            "--value": displayValue,
            "--size": "8rem",
            "--thickness": "12px"
          }}
        >
          {displayValue}%
        </div>

        <div className="text-center mt-4">
          <p>{total} Total</p>
          {statusOptions.map((opt) => (
            <p key={opt.value} className={opt.color}>
              {counts[opt.value]} {opt.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
