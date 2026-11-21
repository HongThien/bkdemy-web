"use client";

// Form PH ĐĂNG KÝ TEST xếp lớp. Dữ liệu + ghi đi qua Edge Function `dang-ky-test`
// (project ERP, xem bkdemy-erp-v2/spec-dang-ky-test.md) — web KHÔNG giữ key ERP nào,
// chỉ biết URL function (NEXT_PUBLIC_DANG_KY_TEST_URL). Giờ hợp lệ / giờ xong / môn mở
// theo khối đều do DB trả; ở đây chỉ hiển thị + làm mờ lựa chọn chồng giờ giữa các môn.
//
// Luồng (Thùy 21/11) — chọn lần lượt, bước sau hiện theo bước trước:
//   1. MÔN muốn test (tích) → 2. KHỐI (3, 4, 4 CLC, 5, 5 CLC, 6…12; chỉ khối mở ĐỦ các môn đã tích)
//   → 3. LỊCH test từng môn → 4. tên con + SĐT → màn xác nhận (khối, ngày, giờ, thời gian làm bài).
// Thời lượng bài test theo (môn × khối) — DB trả trong `lop[].mon[].thoi_luong_phut`. KHÔNG hỏi trường.

import { useEffect, useState } from "react";
import clsx from "clsx";
import { SITE } from "@/lib/site-config";

const API = process.env.NEXT_PUBLIC_DANG_KY_TEST_URL ?? "";

type GioOpt = { bat_dau: string; xong: string };
type Buoi = { khung_id: string; ngay: string; thu: number; tu: string; den: string; gio: Record<string, GioOpt[]> };
type Khoi = { lop: string; ten: string; mon: { mon: string; thoi_luong_phut: number }[] }; // ten do DB đặt ('Lớp 4 CLC')
type FormData = { lop: Khoi[]; lich: Buoi[] };
type Chon = { khung_id: string; ngay: string; gio_bat_dau: string | null };
type KetQua = {
  ho_ten_hs: string;
  ten_lop?: string | null;
  mon: { mon: string; ngay: string; thu: number; gio_bat_dau: string; gio_xong: string; thoi_luong_phut: number }[];
};

const THU: Record<number, string> = { 1: "T2", 2: "T3", 3: "T4", 4: "T5", 5: "T6", 6: "T7", 7: "CN" };
const THU_DAI: Record<number, string> = { 1: "Thứ 2", 2: "Thứ 3", 3: "Thứ 4", 4: "Thứ 5", 5: "Thứ 6", 6: "Thứ 7", 7: "Chủ nhật" };
const ddmm = (ymd: string) => `${ymd.slice(8, 10)}/${ymd.slice(5, 7)}`;
const phut = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const tenKhoi = (ten: string) => ten.replace(/^Lớp/, "Khối"); // DB gọi "Lớp 4 CLC", web hiện "Khối 4 CLC"

function chip(on: boolean, dis = false) {
  return clsx(
    "rounded-xl border px-3.5 py-2.5 text-[15px] font-medium transition-colors",
    dis
      ? "cursor-not-allowed border-ink/5 bg-paper-dim text-slate-soft/40 line-through"
      : on
        ? "border-ink bg-ink text-white shadow-sm"
        : "border-ink/15 bg-white text-slate hover:border-ink/40"
  );
}

function Buoc({ so, ten, children }: { so: number; ten: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 py-5 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center gap-2.5 font-semibold text-ink">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-sm text-gold">{so}</span>
        {ten}
      </div>
      {children}
    </div>
  );
}

export function DangKyTestForm() {
  const [fd, setFd] = useState<FormData | null>(null);
  const [loiTai, setLoiTai] = useState<string | null>(null);
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [monChon, setMonChon] = useState<string[]>([]); // các môn đã tích
  const [lop, setLop] = useState<string | null>(null); // khối đã chọn (mã DB: '8', '4T'…)
  const [lichChon, setLichChon] = useState<Record<string, Chon | null>>({}); // khoá = tên môn
  const [bay, setBay] = useState(""); // ô bẫy bot — người thật không thấy
  const [dangGui, setDangGui] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);
  const [kq, setKq] = useState<KetQua | null>(null);

  useEffect(() => {
    if (!API) { setLoiTai("Đăng ký online đang tạm đóng."); return; }
    fetch(API)
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d?.error ?? "Không tải được lịch test."); setFd(d); })
      .catch((e) => setLoiTai(e.message ?? "Không tải được lịch test."));
  }, []);

  // Môn tích được = môn đang mở test ở ít nhất 1 khối (Toán đứng đầu)
  const monAll = Array.from(new Set((fd?.lop ?? []).flatMap((k) => k.mon.map((m) => m.mon))))
    .sort((a, b) => (a === "Toán" ? -1 : b === "Toán" ? 1 : a.localeCompare(b, "vi")));
  const moDu = (k: Khoi, mons: string[]) => mons.every((m) => k.mon.some((x) => x.mon === m));
  // Khối chọn được = khối mở TẤT CẢ các môn đã tích
  const khoiMo = (fd?.lop ?? []).filter((k) => moDu(k, monChon));
  const khoiDang = fd?.lop.find((k) => k.lop === lop) ?? null;
  const tl = (m: string) => khoiDang?.mon.find((x) => x.mon === m)?.thoi_luong_phut ?? 0;

  function tichMon(m: string) {
    const moi = monChon.includes(m) ? monChon.filter((x) => x !== m) : [...monChon, m];
    setMonChon(moi);
    setLichChon((p) => Object.fromEntries(Object.entries(p).filter(([k]) => moi.includes(k))));
    // Khối đã chọn mà không còn mở đủ các môn ⇒ bỏ chọn khối, chọn lại
    if (lop && !(khoiDang && moDu(khoiDang, moi))) { setLop(null); setLichChon({}); }
  }
  function chonKhoi(l: string) {
    setLop(l);
    setLichChon({}); // thời lượng đổi theo khối ⇒ chọn lại lịch
  }
  const biChong = (m: string, ngay: string, bd: string) => {
    const a0 = phut(bd), a1 = a0 + tl(m);
    return Object.entries(lichChon).some(([m2, c]) => m2 !== m && c?.gio_bat_dau && c.ngay === ngay && a0 < phut(c.gio_bat_dau) + tl(m2) && phut(c.gio_bat_dau) < a1);
  };

  const sdtSo = sdt.replace(/\D/g, "").replace(/^84/, "0");
  const thieu: string[] = [];
  if (monChon.length === 0) thieu.push("môn");
  if (monChon.length > 0 && !lop) thieu.push("khối");
  if (lop) monChon.forEach((m) => { if (!lichChon[m]?.gio_bat_dau) thieu.push(`giờ test ${m}`); });
  if (ten.trim().length < 2) thieu.push("họ tên con");
  if (!/^0[35789]\d{8}$/.test(sdtSo)) thieu.push("SĐT");

  async function gui() {
    if (thieu.length || !lop) return;
    setDangGui(true); setLoi(null);
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ho_ten_hs: ten, sdt_ph: sdt, lop, website: bay,
          mon: monChon.map((m) => ({ mon: m, khung_id: lichChon[m]!.khung_id, ngay: lichChon[m]!.ngay, gio_bat_dau: lichChon[m]!.gio_bat_dau })),
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.error ?? "Chưa gửi được, bố mẹ thử lại giúp trung tâm.");
      setKq(d);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setLoi(e instanceof Error ? e.message : "Chưa gửi được, bố mẹ thử lại giúp trung tâm.");
    } finally { setDangGui(false); }
  }

  const input = "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base text-slate outline-none placeholder:text-slate-soft/60 focus:border-ink";

  if (kq) {
    const khoi = kq.ten_lop ? tenKhoi(kq.ten_lop) : khoiDang ? tenKhoi(khoiDang.ten) : "";
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-3xl">✓</div>
        <p className="font-display text-xl font-semibold text-ink sm:text-2xl">Đăng ký thành công</p>
        <p className="mx-auto mt-3 max-w-md text-slate">
          Trung tâm xác nhận con <b className="text-ink">{kq.ho_ten_hs}</b> sẽ làm bài test{khoi ? <> <b className="text-ink">{khoi}</b></> : null} như sau:
        </p>
        {kq.mon.length > 0 && (
          <div className="mx-auto mt-5 max-w-sm space-y-2 text-left">
            {kq.mon.map((m) => (
              <div key={m.mon} className="rounded-xl bg-paper px-4 py-3 text-sm text-slate">
                <div className="font-semibold text-ink">{m.mon}{khoi ? ` · ${khoi}` : ""}</div>
                <div>{THU_DAI[m.thu]} {ddmm(m.ngay)} · bắt đầu <b>{m.gio_bat_dau}</b></div>
                <div>Thời gian làm bài <b>{m.thoi_luong_phut} phút</b> · dự kiến xong <b>{m.gio_xong}</b></div>
              </div>
            ))}
          </div>
        )}
        <p className="mx-auto mt-5 max-w-md text-sm text-slate-soft">
          Bố mẹ lưu lại thông tin này và đưa con đến đúng giờ giúp trung tâm. Trung tâm sẽ liên hệ lại để xác nhận.
        </p>
        <p className="mt-4 text-sm text-slate-soft">Cần đổi lịch, bố mẹ nhắn Zalo cho trung tâm.</p>
        <a href={SITE.zaloUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white hover:bg-gold-light">Nhắn Zalo</a>
      </div>
    );
  }

  if (!fd) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 text-center text-slate-soft shadow-sm">
        {loiTai ? (
          <>
            <p>{loiTai}</p>
            <a href={SITE.zaloUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white">Nhắn Zalo để đăng ký</a>
          </>
        ) : "Đang tải lịch test…"}
      </div>
    );
  }

  // Lộc chưa dựng khung lịch / chưa khai thời lượng ⇒ chưa có gì để chọn: chỉ đường Zalo, không bày form rỗng
  if (fd.lop.length === 0 || fd.lich.length === 0) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 text-center text-slate-soft shadow-sm">
        <p>Lịch test online đang được cập nhật. Bố mẹ nhắn Zalo để trung tâm xếp lịch cho con nhé.</p>
        <a href={SITE.zaloUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white">Nhắn Zalo</a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm sm:p-8">
      <Buoc so={1} ten="Môn muốn test">
        <div className="flex flex-wrap gap-2">
          {monAll.map((m) => {
            const on = monChon.includes(m);
            return (
              <button key={m} type="button" onClick={() => tichMon(m)} className={chip(on)}>
                <span className="mr-1.5">{on ? "☑" : "☐"}</span>{m}
              </button>
            );
          })}
        </div>
      </Buoc>

      {monChon.length > 0 && (
        <Buoc so={2} ten="Khối con muốn test">
          {khoiMo.length === 0 ? (
            <p className="text-sm text-slate-soft">Chưa có khối nào mở test đủ các môn đã tích cùng lúc. Bố mẹ bỏ bớt một môn, hoặc nhắn Zalo để trung tâm xếp lịch.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {khoiMo.map((k) => (
                <button key={k.lop} type="button" onClick={() => chonKhoi(k.lop)} className={clsx(chip(lop === k.lop), "whitespace-nowrap")}>{tenKhoi(k.ten)}</button>
              ))}
            </div>
          )}
        </Buoc>
      )}

      {lop && khoiDang && monChon.map((m, i) => (
        <Buoc key={m} so={3 + i} ten={`Lịch test môn ${m}`}>
          <p className="mb-3 rounded-lg bg-paper px-3 py-2 text-sm text-slate">{tenKhoi(khoiDang.ten)} · bài test dự kiến <b>{tl(m)} phút</b></p>
          <LichMon lich={fd.lich} tl={tl(m)} chon={lichChon[m] ?? null} onChon={(c) => setLichChon((p) => ({ ...p, [m]: c }))} biChong={(ngay, bd) => biChong(m, ngay, bd)} />
        </Buoc>
      ))}

      {lop && (
        <Buoc so={3 + monChon.length} ten="Thông tin của con">
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={input} placeholder="Họ tên của con" autoComplete="off" value={ten} onChange={(e) => setTen(e.target.value)} />
            <input className={input} placeholder="Số điện thoại bố/mẹ" type="tel" inputMode="tel" autoComplete="tel" value={sdt} onChange={(e) => setSdt(e.target.value)} />
          </div>
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" value={bay} onChange={(e) => setBay(e.target.value)} />
        </Buoc>
      )}

      <div className="border-t border-ink/10 pt-5">
        {loi && <p className="mb-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{loi}</p>}
        <button type="button" onClick={gui} disabled={thieu.length > 0 || dangGui}
          className={clsx("w-full rounded-full px-6 py-4 text-base font-semibold transition-colors",
            thieu.length || dangGui ? "cursor-not-allowed bg-paper-dim text-slate-soft" : "bg-ink text-white hover:bg-ink-dark")}>
          {dangGui ? "Đang gửi…" : "Gửi đăng ký"}
        </button>
        {thieu.length > 0 && <p className="mt-2 text-center text-sm text-slate-soft">Còn thiếu: {thieu.join(", ")}</p>}
      </div>
    </div>
  );
}

function LichMon({ lich, tl, chon, onChon, biChong }: {
  lich: Buoi[]; tl: number; chon: Chon | null; onChon: (c: Chon) => void; biChong: (ngay: string, bd: string) => boolean;
}) {
  const buoi = lich.filter((b) => b.gio[String(tl)]?.length);
  const dang = buoi.find((b) => b.khung_id === chon?.khung_id && b.ngay === chon?.ngay) ?? null;
  const gio = dang?.gio[String(tl)] ?? [];
  const xong = gio.find((g) => g.bat_dau === chon?.gio_bat_dau)?.xong;
  if (!buoi.length) return <p className="text-sm text-slate-soft">Hiện chưa có buổi test trống, bố mẹ nhắn Zalo để trung tâm xếp lịch.</p>;
  return (
    <div>
      <p className="mb-2 text-sm text-slate-soft">Chọn ngày</p>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {buoi.map((b) => {
          const on = dang === b;
          return (
            <button key={b.khung_id + b.ngay} type="button" onClick={() => onChon({ khung_id: b.khung_id, ngay: b.ngay, gio_bat_dau: null })}
              className={clsx(chip(on), "shrink-0 text-left leading-tight")}>
              <div>{THU[b.thu]} {ddmm(b.ngay)}</div>
              <div className={clsx("text-xs font-normal", on ? "text-white/75" : "text-slate-soft")}>{b.tu}–{b.den}</div>
            </button>
          );
        })}
      </div>
      {dang && (
        <div className="mt-3">
          <p className="mb-2 text-sm text-slate-soft">Giờ bắt đầu</p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {gio.map((g) => {
              const dis = biChong(dang.ngay, g.bat_dau);
              return (
                <button key={g.bat_dau} type="button" disabled={dis}
                  onClick={() => onChon({ khung_id: dang.khung_id, ngay: dang.ngay, gio_bat_dau: g.bat_dau })}
                  className={clsx(chip(chon?.gio_bat_dau === g.bat_dau, dis), "px-1")}>{g.bat_dau}</button>
              );
            })}
          </div>
          {xong && (
            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-[15px] text-emerald-800">
              ⏰ Dự kiến xong lúc <b>{xong}</b> — bố mẹ đón con lúc này nhé.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
