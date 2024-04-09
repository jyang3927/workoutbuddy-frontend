export interface UserActivity {
  _id?: string;
  uId: string;
  date: Date;
  routines: string[];
  workedOut: boolean;
}
