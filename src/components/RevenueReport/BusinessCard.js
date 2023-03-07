import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { URL, config, token } from "../../utils/config";
import { createTheme } from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import moment from "moment";
import { InputLabel } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import getWeek from "date-fns/getWeek";
import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays, getDay, getMonth, getYear, setWeek, setYear } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { convertLength } from "@mui/material/styles/cssUtils";

// setting the US Locale week to start from 'monday'
console.log("sssss", (enLocale.options.weekStartsOn = 1));
const localeMap = {
  en: enLocale,
  ru: ruLocale,
};
console.log("enlocaleeeee:", enLocale);
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 20,
    },
  },
};

// weeks array
const weeks = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
];

// Day Theme
const dayTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:focus": {
            boxShadow: "none !important",
          },
        },
      },
    },
  },
});

//Month Theme
// const monthTheme = createTheme({
//   components: {
//     MuiOutlinedInput: {
//       styleOverrides: {
//         input:{
//             // background: "#dd7711",
//             '&:focus':{
//             // background: "#dd7711",
//             boxShadow: "none !important",
//             },
//             '&:hover':{
//               // background:'#dd7711',
//               // height:40
//             },
//         },
//       },
//     },

//   },
// });

const monthTheme = createTheme({
  // shadows: ["none"],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 0px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "#7F99CC",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "green",
          "&.Mui-focused": {
            backgroundColor: "yellow",
            boxShadow: "none",
          },
        },
        focused: {
          backgroundColor: "yellow",
          boxShadow: "none",
        },
      },
    },

    // MuiOutlinedInput: {
    //   root: {
    //     '&$focused $notchedOutline': {
    //       borderColor: 'green !important',
    //       borderWidth: 4,
    //     },
    //   }
    // },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "green",
    //       boxShadow: "none",
    //     },
    //     focused: {
    //       backgroundColor: "yellow",
    //       boxShadow: "none",

    //     }
    //   }
    // },
    MuiInputBase: {
      styleOverrides: {
        input: {
          // background: "#dd7711",
          // padding: 10,
          // boxShadow: "none",
        },
        "&:focus": {
          background: "#dd7711",
        },
      },
    },

    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     input:{
    //       borderColor: "green !important",
    //         // background: "#dd7711",
    //         '&:focus':{
    //         // background: "#dd7711",
    //         boxShadow: "none !important",
    //         },
    //         '&:hover':{
    //           // background:'#dd7711',
    //           // height:40
    //         },
    //     },

    //     root: {
    //       // color: "#000a01",
    //       // boxShadow: "none !important",
    //       // // backgroundColor: "green !important",
    //       // borderColor: "red !important",

    //       // focused: {
    //       //   borderColor: "red !important"
    //       // },
    //       // '&$focused $notchedOutline': {
    //       //   borderColor: "black !important",
    //       //   borderWidth: 1,
    //       //   boxShadow: "none !important",

    //       // },
    //       // "&.MuiOutlinedInput-input": {
    //       //   borderColor: "black !important"
    //       // },
    //       // "&.MuiOutlinedInput-notchedOutline": {
    //       //   borderColor: "black !important"
    //       // },
    //       // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //       //   borderColor: "green !imporatnt",
    //       //   boxShadow: "none !important",

    //       // },
    //       // "&.MuiInputBase-input":{
    //       //   boxShadow: "none !important",
    //       //   borderColor: "green !imporatnt",
    //       // },
    //       // "&.MuiInputBase-inputAdornedEnd":{
    //       //   boxShadow: "none !important",
    //       //   borderColor: "red !imporatnt",
    //       // },
    //       // "&.MuiInputBase-inputAdornedStart":{
    //       //   boxShadow: "none !important",
    //       //   borderColor: "aqua !imporatnt",
    //       // },

    //       border: "1px solid black",

    //       // "&:hover": {
    //       //   backgroundColor: "#fafafa !important",
    //       //   color: "#000a01 !important",
    //       //   boxShadow: "none",
    //       //   border: "2px solid #fc03db"

    //       // },
    //       // "&.focused": {
    //       //   backgroundColor: "#fc03db !important",
    //       //   color: "#000a01 !important",
    //       //   boxShadow: "none !important",
    //       //   border: "2px solid #fc03db !important "
    //       // },
    //         // "&.Mui-focused":{
    //         //   // backgroundColor: "#56fc03 !important",
    //         //   color: "#000a01 !important",
    //         //   boxShadow: "none !important",
    //         //   // border: "2px solid #fc03db !important"
    //         //   borderColor: "red !important"

    //         // },
    //       // "&.MuiInputBase-adornedStart":{
    //       //   color: "#000a01 !important",
    //       //   boxShadow: "none !important",
    //       //   border: "2px solid red !important"
    //       //   // borderColor: "black !important"
    //       // },
    //       // "&.MuiInputBase-adornedEnd":{
    //       //   color: "#000a01 !important",
    //       //   boxShadow: "none !important",
    //       //   border: "2px solid orange !important"
    //       //   // borderColor: "black !important"
    //       // }
    //     },
    //   },
    // },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:focus": {
            boxShadow: "none !important",
          },
        },
      },
    },

    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fcba03",
    //       fontWeight: 600,
    //     },
    //   },
    // },
    // MuiCalendarPicker: {
    //   styleOverrides: {
    //     root: {
    //       // backgroundColor: "#7F99CC",
    //       borderRadius: "60px",
    //     },
    //   },
    // },
    // MuiMonthPicker: {
    //   styleOverrides: {
    //     root: {
    //       // backgroundColor:"#f207d7 !important"
    //     },
    //   },
    // },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fafafa !important",
    //       backgroundColor: "#000a01 !important",
    //       "&:hover": {
    //         backgroundColor: "#fafafa !important",
    //         color: "#000a01 !important",
    //       },
    //       "&.Mui-selected": {
    //         backgroundColor: "red !important",
    //         "&:hover": {
    //           backgroundColor: "#fafafa !important",
    //           color: "#000a01 !important",
    //         },
    //       },
    //     },
    //   },
    // },
  },
});

//Week Theme
const weekTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        borderColor: "black !important",

        input: {
          borderColor: "black !important",

          "&:focus": {
            boxShadow: "none !important",
          },
        },
      },
      root: {
        "&.MuiOutlinedInput-input": {
          borderColor: "black !important",
        },
        "&.MuiOutlinedInput-notchedOutline": {
          borderColor: "black !important",
        },
        // '&$focused $notchedOutline': {
        //   borderColor: 'aqua',
        //   borderWidth: 1,
        //   boxShadow: "none !important",

        // },
        "&.MuiOutlinedInput-input": {
          borderColor: "black !important",
        },
        "&.MuiOutlinedInput-notchedOutline": {
          borderColor: "black !important",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "green !imporatnt",
          boxShadow: "none !important",
        },
        "&$focused $notchedOutline": {
          borderColor: "green !important",
          borderWidth: 4,
        },
        "&.MuiInputBase-input": {
          boxShadow: "none !important",
          borderColor: "green !imporatnt",
        },
        "&.MuiInputBase-inputAdornedEnd": {
          boxShadow: "none !important",
          borderColor: "red !imporatnt",
        },
        "&.MuiInputBase-inputAdornedStart": {
          boxShadow: "none !important",
          borderColor: "aqua !imporatnt",
        },
        "&.focused": {
          backgroundColor: "#fc03db !important",
          color: "#000a01 !important",
          boxShadow: "none !important",
          border: "2px solid #fc03db !important ",
        },
        "&.Mui-focused": {
          // backgroundColor: "#56fc03 !important",
          color: "#000a01 !important",
          boxShadow: "none !important",
          border: "2px solid #fc03db !important",
        },
        "&.MuiInputBase-adornedStart": {
          color: "#000a01 !important",
          boxShadow: "none !important",
          border: "2px solid red !important",
        },
        "&.MuiInputBase-adornedEnd": {
          color: "#000a01 !important",
          boxShadow: "none !important",
          border: "2px solid orange !important",
        },
      },
    },
  },
});

// Custom Start Theme
const customStartTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:focus": {
            boxShadow: "none !important",
          },
        },
      },
    },
  },
});

// Custom Start Theme
const customEndTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:focus": {
            boxShadow: "none !important",
          },
        },
      },
    },
  },
});

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

function BusinessCard(props) {
  console.log("----BUSINESS CARD-----");
  const value = props.value;
  const setValue = props.setValue;
  const active = props.activeCalTab;
  const setActive = props.setActiveCalTab;
  const month = props.month;
  // const setMonth = props.setMonth;
  // const SSS = props.setMonth;

  const location = useLocation();
  const { state } = location;
  console.log("Business state is:", state);
  // const week = props.week;
  const weekk = props.weekk;
  const [endDate, setEndDate] = useState("");
  const [businesslist, setBusinessList] = useState([]);
  const [locationslist, setLocationsList] = useState([]);
  // const [loading, Setloading] = useState(true);
  const [locationsId, setLocationsId] = useState(null);
  const [year, setYear] = useState(getYear(new Date()));
  const [date, setDate] = useState(new Date());
  const StartDate = moment(`${year}`)
    .add(moment(date).isoWeek(), "weeks")
    .startOf("isoweek");
  const [startRange, getStartRange] = useState();
  const EndDate = moment(`${year}`)
    .add(moment(new Date()).isoWeek(), "weeks")
    .endOf("isoweek");
  const [endRange, getendRange] = useState();

  const [customendRange, getcustomendRange] = useState(new Date());
  const [customstartRange, getcustomStartRange] = useState(new Date());
  const a = getWeek(new Date()) - 2;
  const b = getWeek(new Date()) - 1;
  const [w, setW] = useState(moment(new Date()).isoWeek());
  const [v, setV] = useState(new Date());
  const [m, setM] = useState(new Date());
  const [weekdays, setWeekDays] = useState(
    Array(moment(new Date()).isoWeek())
      .fill(0)
      .map((e, i) => i + 1)
  );

  // console.log("businessId", locationsId);
  // console.log("Month", month);
  // console.log("valuee::", value);

  console.log("weekk::", v);
  // console.log("active:::", active);
  // console.log(w);
  // console.log("WeekDays:", weekdays);
  // console.log(customstartRange);
  // console.log(customendRange);

  useEffect(() => {
    //   if (state !== null) {
    //   console.log('OOOOOOOOOOOOOOOOO');
    //   props.setActive(state.isActive? true: false)
    //   props.setBusinessid(state.business? state.business.businessInfo.businessId: state.location.id)
    // }
    // else {
    //   console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
    //   // setActive(true)
    //   // setBusinessid(null)
    // }
    // if (state !== null) {
    // if(state === null){
    //   getbusinessData();

    // }else{
    //   getbusinessData();
    //   getbusinessData2();

    // }
    // const o = state.business?state.business.businessInfo.businessId : state.location.id;

    async function getbusinessData2() {
      props.Setloading(true);
      const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

      const StartDate = moment(`${year}`)
        .add(moment(date).isoWeek(), "weeks")
        .startOf("isoweek");
      const EndDate = moment(`${year}`)
        .add(moment(new Date()).isoWeek(), "weeks")
        .endOf("isoweek");

      props.setWeekk(StartDate._d); //to pass the start date in week picker

      const requestBody = {
        // businessId: state.business?state.business.businessInfo.businessId : state.location.id,
        businessId: props.businessId ? props.businessId : null,
        startDate: moment(StartDate._d).format("YYYY-MM-DD"),
        endDate: moment(EndDate._d).format("YYYY-MM-DD"),
      };

      console.log("Requestbody of SBC:", requestBody);

      const response = await fetch(
        `${URL}/api/Business/GetBusinessRevenueReport`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("Business data is ", data.data);
      // const p = state.business?state.business.businessInfo.businessId : state.location.id;
      const filterdata = data.data.businessRevenueReport.filter((item) =>
        item.business.businessInfo.businessId === props.businessId
          ? props.businessId
          : props.locationId
      );
      console.log("Filtered[0]:", filterdata[0]);
      const { totalSummary, revenueReport } = filterdata[0];
      const filterObject = {
        businessRevenueReport: filterdata,
        totalSummary,
        revenueReport,
      };
      props.data(filterObject);
      // props.getStartRange(startRange);
      // props.getendRange(endRange);
    }

    // getbusinessData2();
    async function getLocationData2() {
      props.Setloading(true);
      const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      const StartDate = moment(`${year}`)
        .add(moment(date).isoWeek(), "weeks")
        .startOf("isoweek");
      const EndDate = moment(`${year}`)
        .add(moment(new Date()).isoWeek(), "weeks")
        .endOf("isoweek");

      props.setWeekk(StartDate._d); //to pass the start date in week picker

      const requestBodyMonth = {
        businessId: props.locationId ? props.locationId : null,
        storeId: props.locationId ? props.locationId : null,
        startDate: moment(StartDate._d).format("YYYY-MM-DD"),
        endDate: moment(EndDate._d).format("YYYY-MM-DD"),
      };
      console.log("Body Location:", requestBodyMonth);
      const { data } = await axios({
        method: "post",
        url: `${URL}/api/Store/GetRevenueReport`,
        config,
        data: requestBodyMonth,
      });
      props.setMonth(m);
      //now we will sent this data to our revenue report component
      if (
        requestBodyMonth.businessId !== null &&
        requestBodyMonth.businessId !== "select"
      ) {
        const filterdata = data.data.revenueReport.filter(
          (item) => item.store.id === requestBodyMonth.businessId
        );
        console.log("datedate", filterdata);
        const { summary } = filterdata[0];
        const filterObject = {
          revenueReport: filterdata,
          totalSummary: summary,
        };

        props.data(filterObject);
      } else {
        props.data(data.data);
      }
    }
    if (props.active) {
      getbusinessData2();
    } else {
      getLocationData2();
    }
    props.Setloading(false);

    // } else {

    try {
      async function getbusinessData() {
        props.Setloading(true);
        const { data } = await axios.post(
          `${URL}/api/Business/GetAllBusiness`,
          config
        );
        const response = await axios.post(
          `${URL}/api/Business/GetAllLocation`,
          config
        );
        console.log(data.data.allBusiness);
        setBusinessList(data.data.allBusiness);
        setLocationsList(response.data.data.allLocations);
        props.Setloading(false);
      }
      getbusinessData();

      // setting the startRange
      console.log("aaa", weekk);
      const a = startOfWeek(weekk);
      getStartRange(addDays(a, 1));

      // setting the endRange
      const s = endOfWeek(weekk);
      getendRange(addDays(s, 1));
    } catch (error) {
      console.log(error);
    }
    // }

    //setting the start and end date when page first renders
    const StartDate = moment(`${year}`)
      .add(moment(date).isoWeek(), "weeks")
      .startOf("isoweek");
    getStartRange(StartDate);
    const EndDate = moment(`${year}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .endOf("isoweek");
    getendRange(EndDate);
  }, []);

  const handleDateChange = (date) => {
    setValue(date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    props.setSelectedMonth(month);
    props.setSelectedYear(year);
  };

  const fetchReports = async () => {
    console.log(v);
    console.log(weekk);
    console.log(m);
    console.log(v);
    if (active === "day" && (isNaN(v) || v === null)) {
      alert("Please enter correct date");
      setV(new Date());
    }
    if (
      active === "week" &&
      (isNaN(weekk) || weekk === "Invalid Date" || weekk === null)
    ) {
      alert("Please enter correct week");
      setW(new Date());
      props.setWeekk(new Date());

      // passing week days
      setWeekDays(
        Array(moment(new Date()).isoWeek())
          .fill(0)
          .map((e, i) => i + 1)
      );

      // passing week select value
      setW(moment(new Date()).isoWeek());

      // setting the startRange
      const d = new Date();
      const startDate = moment(getYear(new Date()))
        .add(moment(d).isoWeek(), "weeks")
        .startOf("isoweek");
      getStartRange(startDate._d);

      // setting the endRange
      const endDate = moment(getYear(new Date()))
        .add(moment(d).isoWeek(), "weeks")
        .endOf("isoweek");
      getendRange(endDate._d);
    }
    if (active === "month" && (isNaN(m) || m === null)) {
      alert("Please enter correct month");
      setM(new Date());
    }
    if (
      active === "custom" &&
      (isNaN(customstartRange) || customstartRange === null)
    ) {
      alert("Please enter correct start date");
      getcustomStartRange(new Date());
    }
    if (
      active === "custom" &&
      (isNaN(customendRange) || customendRange === null)
    ) {
      alert("Please enter correct end date");
      getcustomendRange(new Date());
    }

    if (
      v !== null &&
      !isNaN(weekk) &&
      m !== null &&
      customstartRange !== null &&
      customendRange !== null
    ) {
      console.log("---fetchReports---");
      console.log(v);
      console.log(weekk);
      console.log(m);
      console.log(customstartRange);
      console.log(customendRange);

      props.Setloading(true);
      props.setRevenueCard(true);
      props.setBusinessCard(true);
      props.setLocationCard(true);

      //converting the date to only year and month
      const Date = v
        ? v.getFullYear() +
          "-" +
          ("0" + (v.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + v.getDate()).slice(-2)
        : "";

      const end = endDate
        ? endDate.getFullYear() +
          "-" +
          ("0" + (endDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + endDate.getDate()).slice(-2)
        : "";

      console.log("Date::::", Date);
      console.log("End::::", end);

      // const monthh = month
      //   ? month.getFullYear() + "-" + ("0" + (month.getMonth() + 1)).slice(-2)
      //   : "";
      // console.log("VAlue::::", v);
      // console.log("Week:::", weekk);
      // console.log("Date::::", Date);
      // console.log("End::::", end);
      // console.log("Month::::", m);
      // console.log("Custom-start::::", customstartRange);
      // console.log("Custom-ens::::", customendRange);

      // const Datee = startRange
      //   ? startRange.getFullYear() +
      //     "-" +
      //     ("0" + (startRange.getMonth() + 1)).slice(-2) +
      //     "-" +
      //     ("0" + startRange.getDate()).slice(-2)
      //   : "";

      // const endd = endRange
      //   ? endRange.getFullYear() +
      //     "-" +
      //     ("0" + (endRange.getMonth() + 1)).slice(-2) +
      //     "-" +
      //     ("0" + endRange.getDate()).slice(-2)
      //   : "";

      const c_start = customstartRange
        ? customstartRange.getFullYear() +
          "-" +
          ("0" + (customstartRange.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + customstartRange.getDate()).slice(-2)
        : "";
      const c_end = customendRange
        ? customendRange.getFullYear() +
          "-" +
          ("0" + (customendRange.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + customendRange.getDate()).slice(-2)
        : "";

      // console.log("Custom start:", c_start);
      // props.setCStart(c_start);
      // console.log("Custom end:", c_end);
      // props.setCEnd(c_end);
      // console.log("Start--", Datee);
      // console.log("End--", endd);
      console.log("Start--", StartDate._d);
      console.log("End--", EndDate._d);
      console.log("Start--", moment(startRange).format("YYYY MM DD"));
      console.log("End--", endRange);

      if (active === "month") {
        console.log("Month -----------------------------------------------");

        var months = new window.Date(m.getFullYear(), m.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        var monthe = new window.Date(m.getFullYear(), m.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0];
        console.log("Months is ", months);
        console.log("Monthe is ", monthe);

        const requestBody = {
          businessId: props.businessId,
          storeId: props.businessId ? props.businessId : null,
          startDate: months ? months : "",
          endDate: monthe ? monthe : "",
        };

        const requestBodyMonth = {
          // businessId: props.locationId ? props.locationId : null,
          storeId: props.locationId ? props.locationId : null,
          startDate: months ? months : "",
          endDate: monthe ? monthe : "",
        };

        //as though after clicking buttion we are gettng the month so now we will call api in this function

        try {
          async function pullSummaryData() {
            console.log(`my props is ${props.active}`);
            if (props.active) {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Business/GetBusinessRevenueReport`,
                config,
                data: requestBody,
              });
              props.data(data.data);
              props.setMonth(m);

              //business card is our child component
            } else {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Store/GetRevenueReport`,
                config,
                data: requestBodyMonth,
              });
              props.setMonth(m);
              //now we will sent this data to our revenue report component
              if (
                requestBodyMonth.storeId !== null &&
                requestBodyMonth.storeId !== "select"
              ) {
                const filterdata = data.data.revenueReport.filter(
                  (item) => item.store.id === requestBodyMonth.storeId
                );
                console.log("datedate", filterdata);
                const { summary } = filterdata[0];
                const filterObject = {
                  revenueReport: filterdata,
                  totalSummary: summary,
                };

                props.data(filterObject);
              } else {
                props.data(data.data);
              }
            }
          }

          pullSummaryData();
        } catch (error) {
          console.log(error);
        }
      } else if (active === "week") {
        console.log(
          "RANGE -------------------------------------------------------"
        );
        const requestBody = {
          // businessId: props.businessId || props.businessId === null?props.businessId : state.business.businessInfo.businessId,
          businessId: props.businessId,
          // storeId: props.businessId || props.businessId === ""? props.businessId : state.business.businessInfo.businessId,
          storeId: props.businessId,
          startDate: startRange ? moment(startRange).format("YYYY-MM-DD") : "",
          endDate: endRange ? moment(endRange).format("YYYY-MM-DD") : "",
        };
        const requestBodyMonth = {
          // businessId: props.locationId,
          storeId: props.locationId ? props.locationId : null,
          startDate: startRange ? moment(startRange).format("YYYY-MM-DD") : "",
          endDate: endRange ? moment(endRange).format("YYYY-MM-DD") : "",
        };
        console.log("Business Body:", requestBody);
        console.log("Location Body:", requestBodyMonth);

        //as though after clicking buttion we are gettng the month so now we will call api in this function

        try {
          async function pullSummaryData() {
            console.log(`my props is ${props.active}`);
            if (props.active) {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Business/GetBusinessRevenueReport`,
                config,
                data: requestBody,
              });
              //now we will sent this data to our revenue report component
              props.enddate(end);
              props.start(Date);
              props.data(data.data);
              props.getStartRange(startRange);
              props.getendRange(endRange);
              props.setWeek(w);

              //business card is our child component
            } else {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Store/GetRevenueReport`,
                config,
                data: requestBodyMonth,
              });
              props.enddate(end);
              props.start(Date);
              props.data(data.data);
              props.getStartRange(startRange);
              props.getendRange(endRange);
              props.setWeek(w);

              //now we will sent this data to our revenue report component
              if (
                requestBodyMonth.storeId !== null &&
                requestBodyMonth.storeId !== "select"
              ) {
                const filterdata = data.data.revenueReport.filter(
                  (item) => item.store.id === requestBodyMonth.storeId
                );
                console.log("Location Filtered:", filterdata[0]);
                const { summary } = filterdata[0];
                const filterObject = {
                  revenueReport: filterdata,
                  totalSummary: summary,
                };

                props.data(filterObject);
              } else {
                props.data(data.data);
              }
            }
          }

          pullSummaryData();
        } catch (error) {
          console.log(error);
        }
      } else if (active === "day") {
        console.log(
          "DATE ---------------------------------------------------------",
          v
        );
        const requestBody = {
          businessId: props.businessId,
          storeId: props.businessId ? props.businessId : null,
          startDate: Date ? Date : "",
          endDate: end ? end : Date,
        };
        const requestBodyMonth = {
          // businessId: props.locationId ? props.locationId : null,
          storeId: props.locationId ? props.locationId : null,
          startDate: Date ? Date : "",
          endDate: Date ? Date : "",
        };

        //as though after clicking buttion we are gettng the month so now we will call api in this function

        try {
          async function pullSummaryData() {
            console.log(`my props is ${props.active}`);
            if (props.active) {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Business/GetBusinessRevenueReport`,
                config,
                data: requestBody,
              });
              props.data(data.data);
              props.setValue(v);

              //business card is our child component
            } else {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Store/GetRevenueReport`,
                config,
                data: requestBodyMonth,
              });
              props.setValue(v);
              //now we will sent this data to our revenue report component
              if (
                requestBodyMonth.storeId !== null &&
                requestBodyMonth.storeId !== "select"
              ) {
                const filterdata = data.data.revenueReport.filter(
                  (item) => item.store.id === requestBodyMonth.storeId
                );
                console.log("datedate", filterdata);
                const { summary } = filterdata[0];
                const filterObject = {
                  revenueReport: filterdata,
                  totalSummary: summary,
                };

                props.data(filterObject);
              } else {
                props.data(data.data);
              }
            }
          }

          pullSummaryData();
        } catch (error) {
          console.log(error);
        }
      } else if (active === "custom") {
        console.log(
          "CUSTOM -----------------------------------------------------------"
        );

        const requestBody = {
          businessId: props.businessId,
          storeId: props.businessId ? props.businessId : null,
          startDate: c_start ? c_start : "",
          endDate: c_end ? c_end : "",
        };
        const requestBodyMonth = {
          // businessId: props.locationId? props.locationId : null,
          storeId: props.locationId ? props.locationId : null,
          startDate: c_start ? c_start : "",
          endDate: c_end ? c_end : "",
        };
        //as though after clicking buttion we are gettng the month so now we will call api in this function

        try {
          async function pullSummaryData() {
            console.log(`my props is ${props.active}`);
            if (props.active) {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Business/GetBusinessRevenueReport`,
                config,
                data: requestBody,
              });
              console.log("Business data is :) ", data.data);
              //now we will sent this data to our revenue report component
              props.data(data.data);
              // props.getStartRange(Datee);
              // props.getendRange(endd);

              //business card is our child component
            } else {
              const { data } = await axios({
                method: "post",
                url: `${URL}/api/Store/GetRevenueReport`,
                config,
                data: requestBodyMonth,
              });
              console.log("Location data is :) ", data);
              console.log("Location data is :) ", requestBodyMonth);

              // props.getStartRange(Datee);
              // props.getendRange(endd);
              //now we will sent this data to our revenue report component
              if (
                requestBodyMonth.storeId !== null &&
                requestBodyMonth.storeId !== "select"
              ) {
                const filterdata = data.data.revenueReport.filter(
                  (item) => item.store.id === requestBodyMonth.storeId
                );
                console.log("datedate", filterdata);
                const { summary } = filterdata[0];
                const filterObject = {
                  revenueReport: filterdata,
                  totalSummary: summary,
                };

                props.data(filterObject);
              } else {
                props.data(data.data);
              }
            }
          }

          pullSummaryData();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("+++++++++++++++++++++++");
      }
      // }

      props.setCStart(c_start);
      props.setCEnd(c_end);
      props.Setloading(false);

      // to set the dates again to curent date
      // getcustomendRange(new Date())
      // getcustomendRange(new Date())
      // getcustomStartRange(new Date());
      // getcustomendRange(new Date());
    }
  };

  const handlWeekChange = (event) => {
    setW(event.target.value);
    console.log("Week No. :", event.target.value);
    const date = moment(`${year}`)
      .add(event.target.value, "weeks")
      .startOf("isoweek");
    console.log("date:", date._d);
    props.setWeekk(date._d);

    // setting the startRange
    const start = startOfWeek(date._d);
    console.log("Start Range:", start);
    getStartRange(addDays(start, 1));

    // setting the endRange
    const end = endOfWeek(date._d);
    console.log("End Range:", end);
    getendRange(addDays(end, 1));
  };

  const handleWeekPickerChange = (event) => {
    console.log("::", event);
    console.log("rrrr", moment(event).isoWeek());
    // console.log('ooo',getMonth(event));
    // setValue(event);
    // props.setWeekk(event);

    const startDate = moment(`${year}`)
      .add(moment(event).isoWeek(), "weeks")
      .startOf("isoweek");
    const endDate = moment(`${year}`)
      .add(moment(event).isoWeek(), "weeks")
      .endOf("isoweek");
    // console.log('Start-Date',startDate._d);
    // console.log('End-Date',endDate._d);

    const week = getWeek(event);
    console.log("Week No::", week);
    console.log("Year from Date:", getYear(event));
    setYear(getYear(event));

    props.setWeekk(startDate._d); //to pass the start date in week picker
    // props.setWeek(week);
    // setW(week);
    // if(getDay(event) === 0){
    //   const week = getWeek(event)- 2;
    //   console.log("Week No:::", week);
    //   setWeekDays(Array(week).fill(0).map((e,i)=>i+1))

    //   setW(week);

    // }else{
    //   const week = getWeek(event) - 1;
    //   console.log("Week No::", week);
    // props.setWeek(week);
    const a =
      getYear(event) === getYear(new Date())
        ? moment(new Date()).isoWeek()
        : 52;
    console.log("Week Days:", a);
    setWeekDays(
      Array(a)
        .fill(0)
        .map((e, i) => i + 1)
    );
    setW(moment(event).isoWeek());
    // }

    // setting the startRange
    getStartRange(startDate._d);

    // setting the endRange
    getendRange(endDate._d);
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!weekk) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(new Date(weekk), { weekStartsOn: 1 });

    const end = endOfWeek(new Date(weekk), { weekStartsOn: 1 });

    // console.log(start + "  " + end);

    if (isNaN(start) || isNaN(end)) {
      // console.log("Invalid Date");

      return <PickersDay {...pickersDayProps} />;
    } else;

    const dayIsBetween = isWithinInterval(date, { start, end });

    const isFirstDay = isSameDay(date, start);

    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const onDayClick = () => {
    setActive("day");

    props.setRevenueCard(false);
    props.setBusinessCard(false);
    props.setLocationCard(false);

    setM(new Date());
    getcustomStartRange(new Date());
    getcustomendRange(new Date());

    setW(new Date());
    props.setWeekk(new Date());

    // passing week days
    setWeekDays(
      Array(moment(new Date()).isoWeek())
        .fill(0)
        .map((e, i) => i + 1)
    );

    // passing week select value
    setW(moment(new Date()).isoWeek());

    // passing start & end date
    const startDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .startOf("isoweek");
    const endDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .endOf("isoweek");
    getStartRange(startDate._d);
    getendRange(endDate._d);
  };
  const onWeekClick = () => {
    setActive("week");
    props.setRevenueCard(false);
    props.setBusinessCard(false);
    props.setLocationCard(false);
    setV(new Date());
    setM(new Date());
    getcustomStartRange(new Date());
    getcustomendRange(new Date());
  };
  const onMonthClick = () => {
    setActive("month");
    props.setRevenueCard(false);
    props.setBusinessCard(false);
    props.setLocationCard(false);

    setV(new Date());
    getcustomStartRange(new Date());
    getcustomendRange(new Date());

    setW(new Date());
    props.setWeekk(new Date());

    // passing week days
    setWeekDays(
      Array(moment(new Date()).isoWeek())
        .fill(0)
        .map((e, i) => i + 1)
    );

    // passing week select value
    setW(moment(new Date()).isoWeek());

    // passing start & end date
    const startDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .startOf("isoweek");
    const endDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .endOf("isoweek");
    getStartRange(startDate._d);
    getendRange(endDate._d);
  };
  const onCustomClick = () => {
    setActive("custom");
    props.setRevenueCard(false);
    props.setBusinessCard(false);
    props.setLocationCard(false);

    setV(new Date());
    setM(new Date());

    setW(new Date());
    props.setWeekk(new Date());

    // passing week days
    setWeekDays(
      Array(moment(new Date()).isoWeek())
        .fill(0)
        .map((e, i) => i + 1)
    );

    // passing week select value
    setW(moment(new Date()).isoWeek());

    // passing start & end date
    const startDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .startOf("isoweek");
    const endDate = moment(`${getYear(new Date())}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .endOf("isoweek");
    getStartRange(startDate._d);
    getendRange(endDate._d);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {props.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="flex items-center mt-3 mb-5">
            {props.active ? (
              <>
                {" "}
                <p className="text-md px-2 ">Business:</p>{" "}
              </>
            ) : (
              <>
                {" "}
                <p className="text-md px-2 ">Location:</p>
              </>
            )}

            <div className="flex items-center">
              {props.active ? (
                <>
                  {" "}
                  <select
                    // className=" ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                    className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                    // value={props.businessId || props.businessId === "" || props.businessId === null?props.businessId : state.business.businessInfo.businessId}
                    // value={state.business?state.business.businessInfo.businessId :props.businessId}
                    value={props.businessId}
                    onChange={(e) => props.setBusinessid(e.target.value)}
                  >
                    <option value="">All Businesses</option>
                    {businesslist.map((data, index) => (
                      <>
                        <option
                          value={data.businessInfo.businessId}
                          key={data.businessInfo.businessId}
                        >
                          {data.businessInfo.name}
                        </option>
                      </>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  {" "}
                  <select
                    // className=" ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                    className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                    value={props.locationId}
                    onChange={(e) => props.setLocationid(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locationslist.map((data, index) => (
                      <>
                        <option value={data.id}>{data.name}</option>
                      </>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-around rounded-full ">
            <div
              className={`border border-black w-full border-r-0 text-center p-2 rounded-l-md text-xs pointer ${
                active === "day" ? "bg-[#7F99CC] text-white " : ""
              }`}
              onClick={onDayClick}
            >
              Day
            </div>

            <div
              className={`border border-black  border-r-0 w-full text-center p-2 text-xs ${
                active === "week" ? "bg-[#7F99CC] text-white " : ""
              }`}
              onClick={onWeekClick}
            >
              Week
            </div>

            <div
              className={`border border-black w-full  border-r-0 text-center p-2 text-xs ${
                active === "month" ? "bg-[#7F99CC] text-white " : ""
              }`}
              onClick={onMonthClick}
            >
              Month
            </div>
            <div
              className={`border border-black w-full text-center p-2 rounded-r-md text-xs ${
                active === "custom" ? "bg-[#7F99CC] text-white " : ""
              }`}
              onClick={onCustomClick}
            >
              Custom
            </div>
          </div>
          <div>
            {active === "day" ? (
              <>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={localeMap.en}
                >
                  <Box m={2}>
                    <DatePicker
                      showToolbar={false}
                      views={["year", "month", "day"]}
                      label="Day"
                      maxDate={new Date()}
                      value={v}
                      onChange={(date) => setV(date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={null}
                          onKeyDown={onKeyDown}
                        />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
                <button
                  type="submit"
                  onClick={fetchReports} //after selecting month when we will click get report button this fetchreport function will be executed.
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black}`}
                >
                  Get Report
                </button>
              </>
            ) : (
              ""
            )}
            {active === "week" ? (
              <>
                <Box m={2} className="flex flex-row  sm:items-center">
                  <div className="">
                    <FormControl className="mr-4 md:m-0 w-20 md:w-28">
                      <InputLabel id="Week">Week</InputLabel>
                      <Select
                        label="Week"
                        labelId="Week"
                        id="Week"
                        value={w}
                        maxDate={new Date()}
                        onChange={handlWeekChange}
                        MenuProps={MenuProps}
                        renderDay={renderWeekPickerDay}
                        renderInput={(params) => <TextField {...params} />}
                      >
                        {weekdays.map((weeks) => (
                          <MenuItem key={weeks} value={weeks}>
                            {weeks}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={localeMap.en}
                    >
                      {/* <ThemeProvider theme={weekTheme}> */}
                      <DatePicker
                        showToolbar={false}
                        label="Starting"
                        views={["year", "month", "day"]}
                        value={weekk}
                        maxDate={new Date()}
                        onChange={handleWeekPickerChange}
                        renderDay={renderWeekPickerDay}
                        renderInput={(params) => (
                          <TextField {...params} onKeyDown={onKeyDown} />
                        )}
                      />
                      {/* </ThemeProvider> */}
                    </LocalizationProvider>
                  </div>
                </Box>

                <button
                  type="submit"
                  // disabled={`${weekk === "Invalid Date"? 'true' : 'false'}`}
                  // disabled={weekk !== 'Invalid Date'}
                  onClick={fetchReports} //after selecting month when we will click get report button this fetchreport function will be executed.
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black"
                >
                  Get Report
                </button>
              </>
            ) : (
              ""
            )}
            {active === "month" ? (
              <>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={localeMap.en}
                >
                  <Box m={2}>
                    {/* <ThemeProvider theme={monthTheme}> */}
                    <DatePicker
                      showToolbar={false}
                      inputFormat="MM-yyyy"
                      views={["year", "month"]}
                      label="Month and Year"
                      maxDate={new Date()}
                      value={m}
                      onChange={(date) => setM(date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={null}
                          onKeyDown={onKeyDown}
                        />
                      )}
                    />
                    {/* </ThemeProvider> */}
                  </Box>
                </LocalizationProvider>
                <button
                  type="submit"
                  onClick={fetchReports} //after selecting month when we will click get report button this fetchreport function will be executed.
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black"
                >
                  Get Report
                </button>
              </>
            ) : (
              ""
            )}
            {active === "custom" ? (
              <>
                <div date-rangepicker class="flex items-center">
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>

                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={localeMap.en}
                    >
                      <Box m={2}>
                        {/* <ThemeProvider theme={customStartTheme}> */}
                        <DatePicker
                          showToolbar={false}
                          views={["year", "month", "day"]}
                          label="Month Day Year"
                          maxDate={customendRange}
                          value={customstartRange}
                          onChange={getcustomStartRange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={null}
                              onKeyDown={onKeyDown}
                            />
                          )}
                        />
                        {/* </ThemeProvider> */}
                      </Box>
                    </LocalizationProvider>
                  </div>
                  <span class="mx-4 text-black">to</span>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={localeMap.en}
                    >
                      <Box m={2}>
                        {/* <ThemeProvider theme={customEndTheme}> */}
                        <DatePicker
                          showToolbar={false}
                          views={["year", "month", "day"]}
                          label="Month Day Year"
                          maxDate={new Date()}
                          minDate={customstartRange}
                          value={customendRange}
                          onChange={getcustomendRange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={null}
                              onKeyDown={onKeyDown}
                            />
                          )}
                        />
                        {/* </ThemeProvider> */}
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fetchReports} //after selecting month when we will click get report button this fetchreport function will be executed.
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black "
                >
                  Get Report
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BusinessCard;
