"use client";

import { getHasUsedBefore } from "@/lib/redux/localStorage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumeImportPage() {
  const [hasUsedBefore, setHasUsedBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedBefore(getHasUsedBefore());
  }, []);

  return (
    <main className="flex items-center justify-center mt-10">
      <div className="mx-auto tm-14 max-w-3-xl rounded-md border border-gray-200 px-10 py-10 text-center shadow-md">
        {!hasUsedBefore && (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              Import data from Existing Resume
            </h1>
            <h2>Resume Dropzone</h2>
            {!hasAddedResume ? (
              <>
                <Divider />
                <SectionWithHeadingAndCreateButton
                  heading="Dont have a resume?"
                  buttonText="Create a new one"
                />
              </>
            ) : (
              <>
                {!hasAddedResume && (
                  <>
                    <SectionWithHeadingAndCreateButton
                      heading="You have a Saved Data in Browser"
                      buttonText="Start from where you left"
                    />
                    <Divider />
                  </>
                )}
                <h1>Overwrite Data with a New Resume</h1>
                <h2>Resume Dropzone Component</h2>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

const Divider = () => {
  return (
    <div
      className="mx-[-2.5rem] flex items-center pb-6 pt-8  "
      aria-hidden="true"
    >
      <div className="flex-grow border-t border-gray-200">
        <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">
          {" "}
          or
        </span>
      </div>
    </div>
  );
};

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          href="resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-gray-50"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};
