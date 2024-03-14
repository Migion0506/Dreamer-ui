import { MdExpandCircleDown } from "react-icons/md";

export const Alert = ({
  alert,
  handleClose,
}: {
  alert: { active: boolean; autoClose: boolean; message: string; type: string };
  handleClose: any;
}) => {
  if (alert && alert.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 4000);
  }
  return (
    <>
      {alert.active && alert.type === "alert" && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 bottom-5 right-3 fixed"
          role="alert"
        >
          <p className="font-bold">{alert.type}</p>
          <p>{alert.message}</p>
        </div>
      )}
      {alert.active && alert.type === "error" && (
        <div role="alert" className="fixed bottom-5 right-3">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {alert.type}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{alert.message}</p>
          </div>
        </div>
      )}
      {alert.active && alert.type === "success" && (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md fixed bottom-5 right-3 z-10"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{alert.type}</p>
              <p className="text-sm">
                {alert.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
