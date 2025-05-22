import { cultureValuesByGroup, regionList } from "./CalculatorData";

/**
 * Вычисляет результат на основе культуры, группы региона, пользовательского ввода и режима.
 *
 * @param culture - значение культуры (например, "wheat")
 * @param region - строка, значение выбранного региона ('kyiv', 'odesa' и т.п.)
 * @param userValue - введённое пользователем число
 * @param mode - режим вычисления: "culture (x * y) или "area" (x / y)
 */

type Mode = "culture" | "area";

export const calculateValue = (
  culture: string,
  region: string,
  userValue: number,
  mode: Mode
): number | null => {
  const regionInfo = regionList.find((r) => r.value === region);
  if (!regionInfo) {
    console.error(`Region not found: ${region}`);
    return null;
  }

  const group = regionInfo.group;
  const x = cultureValuesByGroup[group]?.[culture];

  if (x === undefined) {
    console.error(`Coefficient not found for culture "${culture}" in group ${group}`);
    return null;
  }

  return mode === "culture" ? x * userValue : x / userValue;
};
