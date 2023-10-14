import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative bg-neutral-800 p-4 lg:px-16 mt-32 w-screen h-60">
      <footer>
        {/* NAV BRAND */}
        <Link href="/algorithms" className="group flex items-center gap-x-4 w-fit">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="group-hover:animate-spin-slow"
          />
          <p className="text-2xl text-white font-semibold">
            {process.env.NEXT_PUBLIC_BRAND_NAME}
          </p>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
