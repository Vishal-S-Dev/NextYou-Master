//
//Challenge
//
export type Challenge = {
  _id: string;
  banner: string;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  benefits: string[];
  sortOrder: number;
  peoples?: string[];
  tasksByDay?: TasksByDay[];
  //benefits1: BenefitItem[];
  //isActive: boolean;
  //isDeleted: boolean;
  //createdBy: string;
  //updatedBy: string;
  //createdAt: string;
  //updatedAt: string;
  //__v: number;
};

export type BenefitItem = {
  label: string;
  value: string;
  _id: string;
};

export interface People {
  name: string;
  image: string;
}

export type TaskStatus = 'pending' | 'completed' | 'skipped';
export interface TaskDetails {
  _id: string;
  title: string;
  subTitle?: string;
  description?: string;
  minValue?: number;
  maxValue?: number;
  type: string;
  points: number;
  bannerImage: string;
  bannerVideo?: string;
  isCapturePicture?: boolean;
  subQuestions?: string[];
  taskVideoBanner?: string;
  taskVideo?: string;
  taskAudio?: string;
  sessionUrl?: string;
  sortOrder?: number;
  isMustDo?: boolean;
  peoples?: People[];
  scheduledDate: string;
  status: TaskStatus;
  startTime?: string;
  endTime?: string;
  //isActive: boolean;
  //isDeleted: boolean;
  //createdBy: string;
  //updatedBy: string;
  //createdAt: string;
  //updatedAt: string;
  //__v: number;
}

export interface Task {
  taskId: TaskDetails;
  startTime: string;
  status?: TaskStatus;
  _id: string;
}

export interface TasksByDay {
  day: number;
  tasks: TaskDetails[];
}
