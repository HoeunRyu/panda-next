// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (err: any) => {
  if (err?.response?.data) {
    return err.response.data;
  }
  return { status: 500, message: 'Unknown error occurred' };
};
