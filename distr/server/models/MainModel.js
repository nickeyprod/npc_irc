// Main Model
import sq from "../controllers/sequelize/sequelize_controller.js";
class MainModel extends sq.Model {
    // Perform any RAW provided query
    static async rawQuery(queryString) {
        const [results, meta] = await sq.query(queryString);
        return results;
    }
}
export default MainModel;
