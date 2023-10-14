import Brand from "../shared/brand";

const Footer = () => {
  return (
    <div className="relative bg-neutral-100 p-4 lg:px-16 mt-32 w-screen h-60">
      <footer>
        {/* NAV BRAND */}
        <Brand />
      </footer>
    </div>
  );
};

export default Footer;
