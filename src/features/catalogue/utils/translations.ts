import type { TFunction } from 'i18next';

export function getOptionTranslation(t: TFunction, key: string, opt: string) {
  if (key === 'category') {
    if (opt === 'Lounge & Daybeds') return t('catalogue.categoryOptions.loungeDaybeds', 'Lounge & Daybeds');
    if (opt === 'Dining Sets') return t('catalogue.categoryOptions.diningSets', 'Dining Sets');
    if (opt === 'Tables') return t('catalogue.categoryOptions.tables', 'Tables');
    if (opt === 'Living Room Furniture') return t('catalogue.categoryOptions.livingRoom', 'Living Room Furniture');
    if (opt === 'Dining Room Furniture') return t('catalogue.categoryOptions.diningRoom', 'Dining Room Furniture');
    if (opt === 'Bathroom Furniture') return t('catalogue.categoryOptions.bathroom', 'Bathroom Furniture');
  }
  if (key === 'material') {
    if (opt === 'Acacia') return t('catalogue.materialOptions.acacia', 'Acacia');
    if (opt === 'Aluminium') return t('catalogue.materialOptions.aluminium', 'Aluminium');
    if (opt === 'Teak') return t('catalogue.materialOptions.teak', 'Teak');
  }
  if (key === 'moq') {
    if (opt === 'Under 10') return t('catalogue.moqOptions.under10', 'Under 10');
    if (opt === '10–50') return t('catalogue.moqOptions.10to50', '10–50');
    if (opt === '50–100') return t('catalogue.moqOptions.50to100', '50–100');
    if (opt === '100+') return t('catalogue.moqOptions.100plus', '100+');
  }
  if (key === 'color') {
    const cKey = opt.charAt(0).toLowerCase() + opt.replace(/\s+/g, '').slice(1);
    const trans = t(`catalogue.colorOptions.${cKey}`);
    return trans !== `catalogue.colorOptions.${cKey}` ? trans : opt;
  }
  if (key === 'style') {
    const sKey = opt.charAt(0).toLowerCase() + opt.replace(/\s+/g, '').slice(1);
    const trans = t(`catalogue.styleOptions.${sKey}`);
    return trans !== `catalogue.styleOptions.${sKey}` ? trans : opt;
  }
  return opt;
}
