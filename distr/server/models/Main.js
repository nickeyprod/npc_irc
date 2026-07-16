// Main Model
import sq from "../controllers/sequelize_controller.js";
class MainModel extends sq.Model {
    async rawQuery(queryString) {
        const results = await sq.query(queryString);
        return results;
    }
}
