import { sendMessageService } from '../services/ContactsService';
 
export const sendMessageController = async (req, res) => {
    console.log(333, req.body);
    try { 
        const response = await sendMessageService(req.body);
        if(response) {
            res.status(500).send({ error: 'Something failed!' });
        }
            else {
                res.status(200).send('Message successfully sended');
        }
        res.json(response);
    } catch(e) {
        res.status(400).send('Bad request');
    }
};
