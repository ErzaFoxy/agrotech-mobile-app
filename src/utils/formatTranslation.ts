
export const formatTranslation = (
  template: string,
  values: Record<string, string | number>
): string => {
  return Object.entries(values).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    template
  );
};