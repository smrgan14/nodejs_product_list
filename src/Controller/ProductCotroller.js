import productService from '../Service/ProductService';

class ProductController {
    async createProduct(req, res) {
        try {
            const { name } = req.body;
            const data = await productService.createProduct(name);

            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async setProduct(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const data = await productService.setProduct(id, name);

            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new ProductController();
