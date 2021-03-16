import productListService from '../Service/ProductListService';

class ProductListController {
    async createProductList(req, res) {
        try {
            const { name, products } = req.body;
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            console.log(date);
            let userId = req.decoded.id;

            const data = await productListService.createProductList(name, date, userId, products);
            
            res.status(200).send(data);
            
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async setProductList(req, res) {
        try {
            const listId = req.params.id;
            const userId = req.decoded.id;
            const { products, name } = req.body;

            const data = await productListService.setProductList(userId, listId, name, products);

            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getProductListReport(req, res) {
        try {
            const { dateFrom, dateTo } = req.query;
            const userId = req.decoded.id;
            console.log(dateFrom, dateTo, userId);
            const data = await productListService.getProductListReport(userId, dateFrom, dateTo);

            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new ProductListController();
