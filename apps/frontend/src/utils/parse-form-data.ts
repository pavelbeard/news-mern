export async function parseFormData(
  request: Request
): Promise<Record<string, string>> {
  const formData = await request.formData();
  const result: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    result[key] = typeof value === "string" ? value : String(value);
  }

  return result;
}
