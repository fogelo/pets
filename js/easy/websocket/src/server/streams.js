const streams = new Map();

export const removeStream = (id) => {
  if (streams.has(id)) {
    const stream = streams.get(id);
    stream.close();
    streams.delete(id);
  }
};
