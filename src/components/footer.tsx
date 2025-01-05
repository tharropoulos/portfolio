function Footer() {
  return (
    <footer className="w-full border-t border-muted py-6 pb-12 px-6 mt-32">
      <div className="mx-auto max-w-screen-sm flex justify-between items-center">
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
    </footer>
  );
}

export default Footer;
