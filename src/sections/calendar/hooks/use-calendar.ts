import type FullCalendar from '@fullcalendar/react';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import type { EventDropArg, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import type { ICalendarView, ICalendarRange, ICalendarEvent } from 'src/types/calendar';

import { useRef, useState, useCallback } from 'react';

import { useResponsive } from 'src/hooks/use-responsive';

import useCalendarStore from "../../../store/calendarStore";

// ----------------------------------------------------------------------

export function useCalendar(events: ICalendarEvent[]) {
  const calendarRef = useRef<FullCalendar>(null);
  const [dayEvents, setDayEvents] = useState<ICalendarEvent[]>([])
  const calendarEl = calendarRef.current;

  const smUp = useResponsive('up', 'sm');

  const [date, setDate] = useState(new Date());

  const [openForm, setOpenForm] = useState(false);

  const [selectEventId, setSelectEventId] = useState('');

  const [selectedRange, setSelectedRange] = useState<ICalendarRange>(null);

  const [view, setView] = useState<ICalendarView>(smUp ? 'dayGridMonth' : 'listWeek');

  // zustand state:
  const setCurrentEvent = useCalendarStore((state) => state.setCurrentEvent);
  const setActiveEvent = useCalendarStore((state) => state.setActiveEvent);
  const setClickedDate = useCalendarStore((state) => state.setClickedDate);

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectEventId('');
  }, []);

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = smUp ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarEl, smUp]);

  const onChangeView = useCallback(
    (newView: ICalendarView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarEl]
  );

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onSelectRange = useCallback(
    (arg: DateSelectArg) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.unselect();
      }

      onOpenForm();
      setSelectedRange({ start: arg.startStr, end: arg.endStr });
    },
    [calendarEl, onOpenForm]
  );


  // on click event
  const onClickEvent = useCallback(
    (arg: EventClickArg) => {
      const { event } = arg;
      if(!event.extendedProps.clickable) return;
      const filteredEvents = events.filter((evt) => evt.start === event.startStr);
      setDayEvents(filteredEvents)
      setClickedDate(event.startStr);
      setSelectEventId(event.id);
      // update zustand:
      const find = events.find((evt) => evt.id === event.id);
      setCurrentEvent(find as ICalendarEvent);
      setActiveEvent(find as ICalendarEvent);
      onOpenForm();

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onOpenForm, events]
  );

  const onResizeEvent = useCallback(
    (arg: EventResizeDoneArg, updateEvent: (eventData: Partial<ICalendarEvent>) => void) => {
      const { event } = arg;

      updateEvent({
        id: event.id,
        start: event.startStr,
        end: event.endStr,
      });
    },
    []
  );

  const onDropEvent = useCallback(
    (arg: EventDropArg, updateEvent: (eventData: Partial<ICalendarEvent>) => void) => {
      const { event } = arg;
      updateEvent({
        id: event.id,
        start: event.startStr,
        end: event.endStr,
      });
    },
    []
  );

  const onClickEventInFilters = useCallback(
    (eventId: string) => {
      if (eventId) {
        onOpenForm();
        setSelectEventId(eventId);
      }
    },
    [onOpenForm]
  );

  return {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onClickEvent,
    onChangeView,
    onSelectRange,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    setSelectEventId,
    selectedRange,
    //
    onClickEventInFilters,
    //
    dayEvents,
    setDayEvents,
  };
}
