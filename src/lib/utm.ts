import { TYPEFORM_HIDDEN_FIELDS } from '../constants';

export const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    [TYPEFORM_HIDDEN_FIELDS.UTM_SOURCE]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_SOURCE) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_MEDIUM]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_MEDIUM) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_CAMPAIGN]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_CAMPAIGN) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_TERM]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_TERM) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_CONTENT]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_CONTENT) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_ADID]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_ADID) || '',
    [TYPEFORM_HIDDEN_FIELDS.UTM_ADGROUP]:
      params.get(TYPEFORM_HIDDEN_FIELDS.UTM_ADGROUP) || '',
  };
};
