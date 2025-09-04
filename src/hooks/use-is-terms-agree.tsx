import { getItem, removeItem, setItem } from '@/lib/storage';

//recommended Flag Storage
const IS_TERMS_AGREE = 'IS_TERMS_AGREE';
export const getIsTermsAgree = () => {
  try {
    return getItem<boolean>(IS_TERMS_AGREE);
  } catch {
    return false;
  }
};
export const removeIsTermsAgree = () => removeItem(IS_TERMS_AGREE);
export const setIsTermsAgree = (value: boolean) =>
  setItem<boolean>(IS_TERMS_AGREE, value);
