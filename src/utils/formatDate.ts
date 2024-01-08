import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/es";

const formatDate = (date: Date, locale: string) => {
  if (locale === "en") {
    return dayjs(date).locale("en").format("MMM DD, YYYY");
  }

  if (locale === "es") {
    return `el ${dayjs(date).format("DD")} de ${dayjs(date)
      .locale("es")
      .format("MMM")} de ${dayjs(date).format("YYYY")}`;
  }
};

export { formatDate };
