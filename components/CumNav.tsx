import Link from "next/link";
import clsx from "clsx";

// Thanh chuyển giữa 3 trang chi tiết của "Cách BK hoạt động": Phân lớp · Bổ trợ · BK Math Map.
const MUC = [
  { id: "phan-lop", ten: "Phân lớp", href: "/cach-bk-hoat-dong/phan-lop" },
  { id: "bo-tro", ten: "Bổ trợ", href: "/cach-bk-hoat-dong/bo-tro" },
  { id: "math-map", ten: "BK Math Map", href: "/cach-bk-hoat-dong/math-map" },
];

export function CumNav({ dangO }: { dangO: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-4">
      <div className="flex max-w-md overflow-hidden rounded-xl border border-ink/15 bg-white text-sm">
        {MUC.map((m) => (
          <Link
            key={m.id}
            href={m.href}
            className={clsx("flex-1 px-2 py-2 text-center", m.id === dangO ? "bg-ink font-semibold text-white" : "text-ink hover:bg-ink/5")}
          >
            {m.ten}
          </Link>
        ))}
      </div>
    </div>
  );
}
