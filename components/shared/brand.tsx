import Link from "next/link";
import Image from "next/image";

const Brand = () => {
  return (
    <Link href="/" className="group flex items-end gap-x-4 w-fit">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={32}
        height={32}
        className="group-hover:hidden"
      />
      <Image
        src="/images/logo-sorted.svg"
        alt="logo"
        width={32}
        height={32}
        className="hidden group-hover:inline"
      />
      <p className="relative top-2 text-xl text-neutral-800 font-semibold">
        AlgoViz
      </p>
    </Link>
  );
};

export default Brand;
