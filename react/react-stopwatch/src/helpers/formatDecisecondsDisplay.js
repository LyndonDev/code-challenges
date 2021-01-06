/**
 * Format an integer of deciseconds for display.
 * 1 decisecond = 0.1 seconds / 600 deciseconds = 60 seconds.
 * @param   {int}       decisecond    Number of deciseconds
 * @return  {string}                  Time displayed in format HH:MM:SS.S
 */
export default (deciseconds) => {
  const tenthsOfSecond = deciseconds.toString().slice(-1);
  const seconds = ('0' + (Math.floor(deciseconds / 10) % 60)).slice(-2);
  const minutes = ('0' + (Math.floor(deciseconds / (10 * 60)) % 60)).slice(-2);
  const hours = ('0' + (Math.floor(deciseconds / (10 * 60 * 60)) % 60))
    .slice(-2);

  return `${ hours }:${ minutes }:${ seconds }.${ tenthsOfSecond }`;
};
