import { Router} from 'express';
import {database} from '../Firebase/FirebaseDb'

const routerTeste = Router();


routerTeste.get('/delivery', async (req, res) => {
    console.log('GET');
    
    try {
        const snapshot = await database.ref('DELIVERY').once('value');
        const users = snapshot.val();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

routerTeste.post('/delivery', async (req, res) => {
    const data = req.body;
    console.log('POST',data);
    try {
        const newUserRef = await database.ref('DELIVERY').push(data);
        const key = newUserRef.key;
        res.status(200).send(key);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding data');
    }
});

export default routerTeste;