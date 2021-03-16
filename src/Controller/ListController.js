import listService from '../Service/ListService';

class ListController {
    async createList(req, res) {
        try {
            const { name } = req.body;
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            let userId = req.decoded.id;
            const data = await listService.createList(name, date, userId);

            res.status(200).send(data);
            
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteList(req, res) {
        try {
            const { listId } = req.params;
            await listService.deleteList(listId);

            res.status(204).send();
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new ListController();
