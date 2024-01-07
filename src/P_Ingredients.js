import './CSS_Stock.css'; 
import Component_IngredientTable from './Component_IngredientTable'; 

function P_Ingredients() {
    
    return (
        <div>
            <div className="row">
                <div>
                    <Component_IngredientTable />
                </div>
            </div>
        </div>
    ); 
}

export default P_Ingredients;
