import { BaseCalculatorForm } from '../shared/baseCalculatorForm/BaseCalculatorForm';
import { formCultureUA as ua } from '../../translations';

export const AreaForm = () => {
  return <BaseCalculatorForm mode="area" label={ua.inputQuantAreaLabel} />;
};