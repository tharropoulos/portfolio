import { ModeToggle } from "@/components/mode-toggle";

function Footer() {
  return (
    <footer className="w-full border-t border-muted py-6 pb-12 mt-32 px-4 sm:px-6">
      <div className="flex">
        <div className="mx-auto max-w-screen-sm flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:items-center">
          <p>2025 | Fanis Tharropoulos</p>
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
        <ModeToggle className="px-6 flex md:hidden" />
      </div>
    </footer>
  );
}

export default Footer;
