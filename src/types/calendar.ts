
// ----------------------------------------------------------------------


export type ICalendarDate = string | number;

export type ICalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek' | 'dayGridWeek';

export type ICalendarRange = { start: ICalendarDate; end: ICalendarDate } | null;

export type ICalendarEvent = {
  id: string;
  color: string;
  title: string;
  allDay?: boolean;
  end: ICalendarDate;
  start: ICalendarDate;
  extendedProps: Record<string, any>; // ExtendedProps is now an object
};
