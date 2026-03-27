export function getOptionTranslation(t: any, key: string, opt: string) {
  if (key === 'moq') {
    if (opt === 'Under 10') return t('catalogue.moqOptions.under10');
    if (opt === '10–50') return t('catalogue.moqOptions.10to50');
    if (opt === '50–100') return t('catalogue.moqOptions.50to100');
    if (opt === '100+') return t('catalogue.moqOptions.100plus');
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
