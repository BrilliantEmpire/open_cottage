import moment from "moment";

export const convertDate = (date) =>
  moment(new Date(date)).format("YYYY-MM-DD");
