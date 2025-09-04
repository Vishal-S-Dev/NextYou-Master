export interface UserRef {
  _id: string;
  name: string;
}

export interface ChallengeReview {
  _id: string;
  rating: number;
  review: string;
  //isActive: boolean;
  //isDeleted: boolean;
  createdBy: UserRef;
  updatedBy: UserRef;
  createdAt: string; // ISO date string
  //updatedAt: string; // ISO date string
  //__v: number;
  challenge: string;
}
