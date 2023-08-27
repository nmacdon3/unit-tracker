const Timestamp = ({ date }: { date: string }) => {
  const dateObject = new Date(date);
  return (
    <div className="text-stone-400">
      {dateObject.toLocaleDateString()} {dateObject.toLocaleTimeString()}
    </div>
  );
};

export default Timestamp;
