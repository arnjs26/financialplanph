import Link from "next/link";
import React from "react";

const VideoPresentaionPage = ({ params }) => {

  const { clientID } = params

  return (
    <div className="mt-4 bg-white justify-between border rounded-lg">
      <div className="">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/Hmof1vfH8TI?si=IndtV6iZ8pSF9HKj"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="sticky bottom-0 bg-white  py-4 flex justify-between mt-4 p-2">
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
          href={`/admin/clients/financial-plan/${clientID}`}
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0 4-4m-4 4h18"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4">
            {" "}
            Back{" "}
          </span>
        </Link>
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
          href={`/admin/clients/financial-priorities/${clientID}`}
        >
          <span className="absolute -end-full transition-all group-hover:end-4">
            <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            {" "}
            Proceed{" "}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default VideoPresentaionPage;
