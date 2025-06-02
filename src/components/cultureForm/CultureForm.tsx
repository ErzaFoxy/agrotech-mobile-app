import { BaseCalculatorForm } from '../shared/baseCalculatorForm/BaseCalculatorForm';
import { formCultureUA as ua } from '../../translations';

export const CultureForm = () => {
  return <BaseCalculatorForm title={ua.titleLabel} mode="culture" label={ua.inputQuantCulturLabel} />;
};