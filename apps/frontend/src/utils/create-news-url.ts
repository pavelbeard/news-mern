export const createNewsURL = ({
  main = false,
  id,
  title,
}: {
  main?: boolean;
  id: string;
  title: string;
}) => {
  if (main) {
    return `/news/id/${id}/title/${title.replaceAll(/\s/g, "-")}`.toLocaleLowerCase();
  }

  return `/id/${id}/title/${title.replaceAll(/\s/g, "-")}`.toLocaleLowerCase();
};
