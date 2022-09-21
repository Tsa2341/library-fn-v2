export function capitalizeFirstLetter(word) {
  if (!word) {
    return word;
  }
  const splitSpace = word.trim().split(' ');
  const arrayWord = splitSpace.map((item) => {
    const splitWord = item.trim().toLowerCase().split('');
    return [splitWord.at(0).toUpperCase(), ...splitWord.slice(1)].join('');
  });

  return arrayWord.join(' ');
}
