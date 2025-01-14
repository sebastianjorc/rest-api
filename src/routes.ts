import { Express, Request, Response } from 'express';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler} from './controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';

import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
import User from './models/user.model';

function routes(app: Express) {

  app.get('', (req: Request, res: Response) => { res.send('Express + TypeScript Server is running'); });
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // User creation route - UserHandler is validated with middleware
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);
  app.get('/api/users', async (req : Request, res : Response) => {
        try {
          //const id = req.params.id;
          const user = await User.find();
          return res.json(user);
        } 
        catch (err : any) {
          return res.status(500).json({ message: err.message });
        }    
      });

  // Session CRUD routes
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // Product CRUD routes
  app.post(
    '/api/products',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
