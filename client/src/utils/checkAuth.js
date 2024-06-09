export const checkAuthCookie = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token")) !== undefined
  );
};
