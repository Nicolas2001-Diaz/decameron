export default function PaginationLinks({ meta, onPageClick }) {
    function onClick(ev, link) {
      ev.preventDefault();
  
      if (!link.url) {
        return;
      }
  
      onPageClick(link);
    }
  
    return (
      <div className="flex items-center justify-between border-t border-zinc-900 bg-zinc-800 px-4 py-3 sm:px-6 shadow-md mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={ev => onClick(ev, meta.links[0])}
            className="relative inline-flex items-center rounded-md border border-gray-950 bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Anterior
          </a>
  
          <a
            href="#"
            onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-950 bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Siguiente
          </a>
        </div>
  
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm">
              Mostrando <span className="font-medium">{meta.from}</span> a{" "}
              <span className="font-medium">{meta.to}</span> de{" "}
              <span className="font-medium">{meta.total}</span> resultados
            </p>
          </div>
  
          <div>
            {meta.total > meta.per_page && (
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-950 text-gray-500 hover:bg-gray-50" */}
                {meta.links &&
                  meta.links.map((link, ind) => (
                    <a
                      href="#"
                      onClick={(ev) => onClick(ev, link)}
                      key={ind}
                      aria-current="page"
                      className={
                        "relative z-10 inline-flex items-center border   px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 " +
                        (ind === 0 ? "rounded-l-md " : "") +
                        (ind === meta.links.length - 1 ? "rounded-r-md " : "") +
                        (link.active
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600 "
                          : "")
                      }
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    ></a>
                  ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    );
  }
  