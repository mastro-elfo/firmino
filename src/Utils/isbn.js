import { validate, toIsbn13, hyphenate, dehyphenate } from 'beautify-isbn';

export function anyToIsbn13(any) {
  const to = any.toUpperCase().replace(/[^\d^X^-]/g, '');
  const hyphens = to.split('-').length -1;
  if (
    (hyphens === 0 || ((hyphens === 3 || hyphens === 4) && to[to.length - 2] === '-')) &&
    validate(to)
  ) {
    const dehyph = dehyphenate(to);
    if (dehyph.length === 10) {
      return hyphenate(toIsbn13(dehyph));
    }
    return hyphenate(dehyph);
  }
  return to;
}
