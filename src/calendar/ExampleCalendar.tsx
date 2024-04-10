// // import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// // import { useState } from 'react';
// // import dayjs, {Dayjs} from 'dayjs'; 



// // export default function MyCalendar() {
// //   const [date, setDate] = useState<Dayjs | null>(dayjs(Date()))

// //   return (
// //     <div>
// //        <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
// //     </div>
// //   );
// // }

// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// // import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { Container } from '@mui/material';
// import Badge from '@mui/material/Badge';
// import  {PickersDay} from '@mui/x-date-pickers/PickersDay'; 

// export default function MyCalendar() {
//    return(
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         {/* components={[
//           'DatePicker',
//           'MobileDatePicker',
//           'DesktopDatePicker',
//           'StaticDatePicker',
//         ]} */}
      
//         {/* <DemoItem label="Desktop variant">
//           <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//         {/* <DemoItem label="Mobile variant"> */}
//           {/* <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */} 
//         {/* <DemoItem label="Responsive variant">
//           <DatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */}
//         <Container>
//           <StaticDatePicker orientation="landscape" defaultValue={dayjs(Date())} />
//         </Container>
//     </LocalizationProvider>
//    )
// }




import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs(new Date());

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '✅' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([10, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}