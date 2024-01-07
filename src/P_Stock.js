import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_Stock.css'; 
import Component_IngredientTable from './Component_IngredientTable'; 
import Component_CategoryTable from './Component_CategoryTable';

function P_Stock() {
    
    return (
        <div>
            <div className="row">
                <div>
                    <Component_IngredientTable />
                </div>
                <div>
                    <Component_CategoryTable />
                </div>
            </div>
        </div>
    ); 
}

export default P_Stock;
