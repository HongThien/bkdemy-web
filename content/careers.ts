// Vị trí tuyển dụng — nội dung thật do vận hành cung cấp, sửa trong
// content/data/careers.json (không sửa file này), chuẩn bị sẵn cho Decap CMS sau này.
import careersData from "@/content/data/careers.json";

export type CareerPosition = {
  slug: string;
  title: string;
  type: string;
  description: string;
};

export const CAREERS: CareerPosition[] = careersData;
