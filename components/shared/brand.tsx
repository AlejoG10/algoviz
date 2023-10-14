import Link from "next/link";
import Image from "next/image";

const Brand = () => {
  return (
    <Link href="/algorithms" className="group flex items-end gap-x-4 w-fit">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={50}
        height={50}
        className="group-hover:hidden"
      />
      <Image
        src="/images/logo-sorted.svg"
        alt="logo"
        width={50}
        height={50}
        className="hidden group-hover:inline"
      />
      <p className="relative top-2 text-2xl text-neutral-800 font-semibold">
        AlgoViz
      </p>
    </Link>
  );
};

export default Brand;
