// for database connection
import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

async function connect(){
    const dbUri = config.get<string>("dbUri") 
    try {
      mongoose.set('strictQuery', true);
      await mongoose
        .connect(dbUri)
      logger.info('DB connected')
    } catch (error) {
      logger.error("Could not connect to the db bc:\n"+error+"\n\n"+dbUri+"\n");
      process.exit(1);
    }
}

export default connect; 