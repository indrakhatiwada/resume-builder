import { text } from "stream/consumers";

const STEPS = [
  { title: "Add a resume pdf", text: "or create from Scratch" },
  { title: "Preview the design", text: "and make changes" },
  { title: "Download in PDF", text: "and apply to the jobs" },
];

export const Steps = () => {
  return (
    <section className="mx-auto mt-8 rounded-2xl bg-sky-50 px-8 pb-12 pt-10  lg:mt-2">
      <h1 className="text-center text-3xl font-bold">
        Follow Three Simple Steps
      </h1>
      <div className="mt-8 flex justify-center ">
        <dl className="flex flex-col gap-10 lg:flex-row lg:justify-center lg:gap-20">
          {STEPS.map(({ title, text }, index) => (
            <div className="relative self-start pl-14" key={index}>
              <dt className="text-lg font-bold">
                <div className="bg-primary absolute top-1 left-0 d-flex h-10 w-10 select-none items-center justify-center rounded-full p-[3.5px] opacity-80">
                  <div className="h-full mb-14 w-full justify-center rounded-full bg-white items-center">
                    <div className="text-primary -mt-0 5 text-2xl text-center">
                      {index + 1}
                    </div>
                  </div>
                </div>
                {title}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
