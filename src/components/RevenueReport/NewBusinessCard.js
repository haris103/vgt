import * as React from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
const localeMap = {
  en: enLocale,
  ru: ruLocale,
};
export default function ViewsDatePicker() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap.enLocale}
    >
      <Stack spacing={3}>
        <DatePicker
          views={["year"]}
          label="Year only"
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          //   minDate={dayjs("2012-03-01")}
          //   maxDate={dayjs("2023-06-01")}

          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          label="Year, month and date"
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <DatePicker
          views={["day", "month", "year"]}
          label="Invert the order of views"
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <DatePicker
          views={["day"]}
          label="Just date"
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
