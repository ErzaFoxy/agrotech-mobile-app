
import { formCultureUA as ua } from '../../../translations';

export const cultureList = [
  { label: ua.cultureWheat, value: 'wheat' },
  { label: ua.cultureSoy, value: 'soy' },
  { label: ua.cultureCorn, value: 'corn' },
  { label: ua.cultureBarley, value: 'barley' },
  { label: ua.cultureRapeseed, value: 'rapeseed' },
  { label: ua.cultureFlax, value: 'flax' },
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