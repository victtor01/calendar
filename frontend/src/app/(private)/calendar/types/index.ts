export interface Event {
  id: number;
  name: string;
  code: string;
  end: Date | string;
  start: Date | string;
  allDay?: boolean;
  color?: string;
  comments?: CommentsEvents[]
}

interface CommentsEvents {
  id: number
  content: string
  eventId: number
}