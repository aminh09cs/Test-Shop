export const required = (val) =>
  (val && String(val).length > 0) || 'Field is required!';
