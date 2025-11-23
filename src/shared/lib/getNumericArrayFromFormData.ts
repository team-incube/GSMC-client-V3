interface GetNumericArrayFromFormData {
  key: string;
  formData: FormData;
}

export default function getNumericArrayFromFormData({
  formData,
  key,
}: GetNumericArrayFromFormData): number[] {
  return formData
    .getAll(key)
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));
}
