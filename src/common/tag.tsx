export default function Tag({
  name,
  custom
}: {
  name: any;
  custom: any
}) {
  return (
    <>
      <div
        className={`p-[2px] px-[4px] max-w-fit font-normal gap-2 text-xs rounded-lg ${custom}`}
      >
        {name}
      </div>
    </>
  );
}
