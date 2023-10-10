export const HeadingSkeleton = () => {
  return <div className="animate-pulse bg-neutral-200 rounded w-1/2 h-6" />;
};

export const TextSkeleton = () => {
  return <div className="animate-pulse bg-neutral-200 rounded w-full h-4" />;
};

export const ColorIndexRowSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-x-5">
      <div className="bg-neutral-200 rounded-full ring-neutral-200 ring-2 ring-offset-4 aspect-square w-[18px]" />
      <TextSkeleton />
    </div>
  );
};

export const ButtonSkeleton = () => {
  return <div className="animate-pulse bg-neutral-200 rounded w-full h-10" />;
};

export const CircleButtonSkeleton = () => {
  return (
    <div className="animate-pulse bg-neutral-200 rounded-full aspect-square w-9" />
  );
};

export const InputGroupSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-x-5">
      <div className="w-24">
        <TextSkeleton />
      </div>
      <div className="bg-neutral-200 rounded w-full" />
    </div>
  );
};
