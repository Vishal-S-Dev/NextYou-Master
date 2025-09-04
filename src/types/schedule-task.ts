export interface Task {
  id: number;
  title: string;
  subText: string;
  time: string;
  countdown: string;
  mustDo: boolean;
  people: number;
  points: number;
  image: string;
  status: string;
  images: string[];
}

export interface TaskDay {
  id: string;
  label: string;
  subLabel: string;
  date: Date;
  status: string;
}
