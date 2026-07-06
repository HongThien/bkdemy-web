// TODO(content): vị trí tuyển dụng thật — cập nhật khi vận hành cung cấp.
export type CareerPosition = {
  slug: string;
  title: string;
  type: string;
  description: string;
};

export const CAREERS: CareerPosition[] = [
  {
    slug: "ta",
    title: "Trợ giảng (TA)",
    type: "Bán thời gian",
    description: "TODO(content): mô tả công việc, yêu cầu, quyền lợi cho vị trí Trợ giảng.",
  },
  {
    slug: "gv",
    title: "Giáo viên Toán",
    type: "Toàn thời gian / bán thời gian",
    description: "TODO(content): mô tả công việc, yêu cầu, quyền lợi cho vị trí Giáo viên.",
  },
];
