const screenUrl = (str: string, url: string): string =>
  str
    .split('\n')
    .map((e) => {
      if (e.includes('![screenshot]')) {
        return `![screenshot](${url.substring(0, url.lastIndexOf('/'))}${e.substring(
          15,
          e.length - 1,
        )})`;
      }
      return e;
    })
    .join('\n');

export default screenUrl;
