import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './Note.styles';
import { Note } from '../../services/notes';
import { formCultureUA as ua } from '../../translations';
import { formatTranslation } from '../../utils/formatTranslation';

// Ключи для переводу культур і регіонів
const cultureKeys: Record<string, string> = {
  wheat: ua.cultureWheat,
  soy: ua.cultureSoy,
  corn: ua.cultureCorn,
  barley: ua.cultureBarley,
  rapeseed: ua.cultureRapeseed,
  flax: ua.cultureFlax,
};

const regionKeys: Record<string, string> = {
  odesa: ua.regionOdesa,
  mykolaiv: ua.regionMykolaiv,
  kherson: ua.regionKherson,
  zaporizhzhia: ua.regionZaporizhzhia,
  dnipro: ua.regionDnipro,
  kyiv: ua.regionKyiv,
  zhytomyr: ua.regionZhytomyr,
  poltava: ua.regionPoltava,
};

interface Props {
  note: Note;
}

export const NoteCard: React.FC<Props> = ({ note }) => {
  const {
    culture,
    region,
    inputValue,
    result,
    createdAt,
    mode,
  } = note;

  const cultureLabel = cultureKeys[culture] ?? culture;
  const regionLabel = regionKeys[region] ?? region;

  const isCultureMode = mode === 'culture';

  const inputLine = isCultureMode
    ? `${ua.inputQuantCulturLabel}: ${inputValue}`
    : `${ua.inputQuantAreaLabel}: ${inputValue}`;

  const resultFix = result % 1 === 0 ? result.toString() : result.toFixed(5);

  const resultLine = isCultureMode
    ? formatTranslation(ua.noteResultValueCulture, { value: resultFix, culture: cultureLabel })
    : formatTranslation(ua.noteResultValueArea, { value: resultFix });

  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>{ua.saveTxt}: {createdAt}</Text>
      <Text style={styles.lineText}>{ua.cultureTxt}: <Text style={styles.highlight}>{cultureLabel}</Text></Text>
      <Text style={styles.lineText}>{ua.regionTxt}: <Text style={styles.highlight}>{regionLabel}</Text></Text>
      <Text style={styles.lineText}>{inputLine}</Text>
      <Text style={styles.resultText}>{ua.resultBtn}: <Text style={styles.highlight}>{resultLine}</Text></Text>
    </View>
  );
};