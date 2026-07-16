// Main Model
import sq from "../controllers/sequelize/sequelize_controller.js";

class MainModel extends sq.Model {

    // Perform any RAW provided query
    static async rawQuery(queryString: string) {
        const results = await sq.query(queryString);
        return results;
    }
    
}

export default MainModel