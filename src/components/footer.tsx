import { ModeToggle } from "@/components/mode-toggle";

function Footer() {
  return (
    <footer className="mt-28 w-full border-t border-muted px-4 py-6 pb-12 sm:px-6 md:mt-48">
      <div className="flex">
        <div className="mx-auto flex max-w-screen-sm flex-col justify-between gap-6 md:flex-row md:items-center md:gap-0">
          <p>{new Date().getFullYear()} | Fanis Tharropoulos</p>
          <p className="w-1/2">
            Built with{" "}
            <a href="https://vite.dev/" className="font-bold hover:underline">
              Vite
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="font-bold hover:underline"
            >
              Tailwind
            </a>{" "}
            and{" "}
            <a
              href="https://tanstack.com/router/latest"
              className="font-bold hover:underline"
            >
              Tanstack Router
            </a>
            , deployed with{" "}
            <a href="https://vercel.com/" className="font-bold hover:underline">
              Vercel
            </a>
          </p>
        </div>
        <ModeToggle className="flex px-6 md:hidden" />
      </div>
    </footer>
  );
}

export default Footer;
