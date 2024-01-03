import { createStream } from 'rotating-file-stream';

// {
//   size: '1000B',
//   interval: '10m',
//   compress: 'gzip',
//   destination: '',
// }

export default function transportStream(options) {
  // const { size, interval, compress } = options;
  console.log('options--', options);
  return createStream(options.destination, {
    size: '10M',
    interval: '1d',
    // compress: true,
    // maxSize: '10M',
    // maxSize: '2K',
    // maxFiles: 3,
    // teeToStdout: true,
    path: './logs',
  });
}
