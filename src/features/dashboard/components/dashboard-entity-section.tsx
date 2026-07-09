"use client";

import { ChevronDown, ChevronUp, Edit, Power, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface DashboardEntitySectionProps<TItem> {
    title: string;
    count: number;
    items: TItem[];
    isLoading: boolean;
    error: string | null;
    searchPlaceholder: string;
    getId: (item: TItem) => string;
    getSearchValue: (item: TItem) => string;
    renderTitle: (item: TItem) => string;
    renderSubtitle: (item: TItem) => string;
    renderMeta?: (item: TItem) => string;
    renderStatusLabel?: (item: TItem) => string;
    getIsActive?: (item: TItem) => boolean;
    getToggleLabel?: (item: TItem) => string;
    getToggleDisabled?: (item: TItem) => boolean;
    onToggleActive?: (item: TItem) => void;
    onEdit?: (item: TItem) => void;
}

const VISIBLE_LIMIT = 10;

export function DashboardEntitySection<TItem>({
    title,
    count,
    items,
    isLoading,
    error,
    searchPlaceholder,
    getId,
    getSearchValue,
    renderTitle,
    renderSubtitle,
    renderMeta,
    renderStatusLabel,
    getIsActive,
    getToggleLabel,
    getToggleDisabled,
    onToggleActive,
    onEdit,
}: DashboardEntitySectionProps<TItem>) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return items;
        }

        return items.filter((item) =>
            getSearchValue(item).toLowerCase().includes(normalizedSearch),
        );
    }, [items, search, getSearchValue]);

    const visibleItems = filteredItems.slice(0, VISIBLE_LIMIT);

    return (
        <section className="rounded-3xl border border-border-subtle/70 bg-white shadow-sm">
            <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-surface-light/60"
            >
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-primary">
                            {title}
                        </h2>

                        <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-bold text-primary">
                            {count}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-muted">
                        Mostrando máximo {VISIBLE_LIMIT} registros.
                    </p>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle text-primary">
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </span>
            </button>

            {isExpanded ? (
                <div className="border-t border-border-subtle/70 px-5 pb-5 pt-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-2xl border border-border-subtle bg-surface px-11 py-3 text-sm text-slate-950 outline-none transition focus:border-primary"
                        />
                    </div>

                    <div className="mt-4 space-y-3">
                        {isLoading ? (
                            <div className="rounded-2xl border border-border-subtle bg-surface-light px-4 py-8 text-center text-sm font-medium text-muted">
                                Cargando registros...
                            </div>
                        ) : null}

                        {!isLoading && error ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                                {error}
                            </div>
                        ) : null}

                        {!isLoading && !error && visibleItems.length === 0 ? (
                            <div className="rounded-2xl border border-border-subtle bg-surface-light px-4 py-8 text-center">
                                <p className="text-sm font-bold text-primary">
                                    No hay resultados.
                                </p>

                                <p className="mt-1 text-xs text-muted">
                                    Intenta cambiar la búsqueda.
                                </p>
                            </div>
                        ) : null}

                        {!isLoading && !error
                            ? visibleItems.map((item) => {
                                  const isActive = getIsActive
                                      ? getIsActive(item)
                                      : true;

                                  const statusLabel = renderStatusLabel
                                      ? renderStatusLabel(item)
                                      : isActive
                                        ? "Activo"
                                        : "Inactivo";

                                  const toggleLabel = getToggleLabel
                                      ? getToggleLabel(item)
                                      : isActive
                                        ? "Desactivar"
                                        : "Activar";

                                  const isToggleDisabled = getToggleDisabled
                                      ? getToggleDisabled(item)
                                      : false;

                                  return (
                                      <article
                                          key={getId(item)}
                                          className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                                      >
                                          <div className="min-w-0">
                                              <div className="flex flex-wrap items-center gap-2">
                                                  <h3 className="truncate text-sm font-bold text-primary">
                                                      {renderTitle(item)}
                                                  </h3>

                                                  {getIsActive || renderStatusLabel ? (
                                                      <span
                                                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                                              isActive
                                                                  ? "bg-surface-light text-primary"
                                                                  : "bg-red-50 text-danger"
                                                          }`}
                                                      >
                                                          {statusLabel}
                                                      </span>
                                                  ) : null}
                                              </div>

                                              <p className="mt-1 text-sm text-muted">
                                                  {renderSubtitle(item)}
                                              </p>

                                              {renderMeta ? (
                                                  <p className="mt-1 text-xs text-muted">
                                                      {renderMeta(item)}
                                                  </p>
                                              ) : null}
                                          </div>

                                          <div className="flex shrink-0 items-center gap-2">
                                              {onEdit ? (
                                                  <div className="group relative">
                                                      <button
                                                          type="button"
                                                          onClick={() => onEdit(item)}
                                                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle text-primary transition hover:bg-surface-light"
                                                          aria-label="Editar"
                                                      >
                                                          <Edit className="h-4 w-4" />
                                                      </button>

                                                      <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white shadow-lg group-hover:block">
                                                          Editar registro
                                                      </span>
                                                  </div>
                                              ) : null}

                                              {onToggleActive ? (
                                                  <div className="group relative">
                                                      <button
                                                          type="button"
                                                          onClick={() => onToggleActive(item)}
                                                          disabled={isToggleDisabled}
                                                          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                                              isActive
                                                                  ? "border-red-200 text-danger hover:bg-red-50"
                                                                  : "border-border-subtle text-primary hover:bg-surface-light"
                                                          }`}
                                                          aria-label={toggleLabel}
                                                      >
                                                          <Power className="h-4 w-4" />
                                                      </button>

                                                      <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white shadow-lg group-hover:block">
                                                          {toggleLabel}
                                                      </span>
                                                  </div>
                                              ) : null}
                                          </div>
                                      </article>
                                  );
                              })
                            : null}
                    </div>
                </div>
            ) : null}
        </section>
    );
}