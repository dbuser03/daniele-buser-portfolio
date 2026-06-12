import Logo from "./Logo";
import Navbar from "./Navbar";
export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 z-30 w-full max-w-480 -translate-x-1/2 p-4 mix-blend-difference pointer-events-none">
      <div className="grid w-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        <div className="col-span-2 col-start-1 flex items-start pointer-events-auto">
          <Logo />
        </div>
        <div className="col-span-2 col-start-3 sm:col-start-5 md:col-start-7 lg:col-start-9 xl:col-start-11 pointer-events-auto">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
