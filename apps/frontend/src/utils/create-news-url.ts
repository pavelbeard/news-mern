export const createNewsURL = ({
  archive = false,
  main = false,
  id,
  title,
}: {
  archive?: boolean;
  main?: boolean;
  id: string;
  title: string;
}) => {
  if (main) {
    return `/${archive ? "news-archive" : "news"}/id/${id}/title/${title.replaceAll(/\s/g, "-")}`.toLocaleLowerCase();
  }

  return `/id/${id}/title/${title.replaceAll(/\s/g, "-")}`.toLocaleLowerCase();
};
