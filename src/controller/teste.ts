import { Router, Request, Response } from 'express';

const routerTeste = Router();


routerTeste.get('/', (req: Request, res: Response) => {
    res.send('List of users');
});

export default routerTeste;