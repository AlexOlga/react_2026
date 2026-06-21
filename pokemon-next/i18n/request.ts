import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
const locale = (await requestLocale) ?? 'en';
  return {
    locale: routing.locales.includes(locale as 'en' | 'ru')
      ? locale
      : routing.defaultLocale,
    messages: (
      await import(`../app/messages/${locale}.json`)
    ).default
  };
});