import { BaseCalculatorForm } from '../shared/baseCalculatorForm/BaseCalculatorForm';
import { formCultureUA as ua } from '../../translations';

export const AreaForm = () => {
  return <BaseCalculatorForm title={ua.inputQuantCulturLabel} mode="area" label={ua.inputQuantAreaLabel} />;
};