
import { formCultureUA as ua } from '../../../translations';

export const cultureList = [
  { label: ua.cultureWheat, value: 'wheat', fertilizers: ua.cultureWheatFertilizers },
  { label: ua.cultureSoy, value: 'soy', fertilizers: ua.cultureWheatFertilizers },
  { label: ua.cultureCorn, value: 'corn', fertilizers: ua.cultureWheatFertilizers },
  { label: ua.cultureBarley, value: 'barley', fertilizers: ua.cultureWheatFertilizers },
  { label: ua.cultureRapeseed, value: 'rapeseed', fertilizers: ua.cultureWheatFertilizers },
  { label: ua.cultureFlax, value: 'flax', fertilizers: ua.cultureWheatFertilizers },
];

export const regionList = [
  { label: ua.regionOdesa, value: 'odesa', group: 1 },
  { label: ua.regionMykolaiv, value: 'mykolaiv', group: 1 },
  { label: ua.regionKherson, value: 'kherson', group: 1 },
  { label: ua.regionZaporizhzhia, value: 'zaporizhzhia', group: 1 },
  { label: ua.regionDnipro, value: 'dnipro', group: 2 },
  { label: ua.regionKyiv, value: 'kyiv', group: 2 },
  { label: ua.regionZhytomyr, value: 'zhytomyr', group: 2 },
  { label: ua.regionPoltava, value: 'poltava', group: 2 },
];


// Значення культур для кожної групи
export const cultureValuesByGroup: Record<
  number,
  Record<string, number>
> = {
  1: {
    wheat: 190,
    soy: 120,
    corn: 25,
    barley: 130,
    rapeseed: 3,
    flax: 40,
  },
  2: {
    wheat: 230,
    soy: 140,
    corn: 25,
    barley: 170,
    rapeseed: 5,
    flax: 40,
  },
};