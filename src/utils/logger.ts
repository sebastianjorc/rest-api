import dayjs from 'dayjs'
import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  colorize: true
})
const log = pino(stream)

//
/*const log = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true }
    },
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});*/

log.info('hi');
export default log;