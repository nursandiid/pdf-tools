export type Log = {
  id: number;
  user_id: number;
  token: string;
  total: number;
  processing: number;
  service: string;
  status: Status;
  download_path: string;
  created_at: string;
  updated_at: string;
};

type Status = "processing" | "success" | "failed" | "deleted";
