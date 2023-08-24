export default function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions,
  locales?: Intl.LocalesArgument
) {
  return new Date(date).toLocaleDateString(
    locales ? locales : "en-Us",
    options
  );
}
