import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands} from "../http/brandAPI";

const FilterBar = observer(() => {
    const {car,brand} = useContext(Context)


    useEffect(() => {
        car.clearFilters();
        fetchBrands().then(data => brand.setBrands(data))
    }, [car,brand]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        car.setFilters({
            ...car.filters,
            [name]: value
        });
    };

    return (
        <div>
            <div>
                <label style={{color: "white"}}>Марка машины:</label>
                <div>
                    <select style={{backgroundColor: "#D9D9D9", borderRadius: 5, width: "calc(80% + 10px)"}}
                            name="brand" onChange={handleInputChange}>
                        <option value="">Выберите марку</option>
                        {brand.brands.map(brand =>
                            <option key={brand.id} value={brand.id}>{brand.title}</option>
                        )}
                    </select>
                </div>

            </div>
            <div>
                <label style={{color: "white"}}>Модель:</label>
                <div>
                    <input
                        style={{backgroundColor: "#D9D9D9", borderRadius: 5, border: "none", width: "calc(80% + 10px)"}}
                        type="text" name="model" onChange={handleInputChange}/>
                </div>

            </div>
            <div>
                <label style={{color: "white"}}>Цена:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="priceFrom" placeholder="от" onChange={handleInputChange}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="priceTo" placeholder="до" onChange={handleInputChange}/>
                </div>

            </div>
            <div>
                <label style={{color: "white"}}>Год:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="yearFrom" placeholder="от" onChange={handleInputChange}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="yearTo" placeholder="до" onChange={handleInputChange}/>
                </div>

            </div>
            <div>
                <label style={{color: "white"}}>Пробег:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="mileageFrom" placeholder="от" onChange={handleInputChange}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="mileageTo" placeholder="до" onChange={handleInputChange}/>
                </div>

            </div>

            <div>
                <label style={{color: "white"}}>Мощность (л.с.):</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="horsesFrom" placeholder="от" onChange={handleInputChange}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="horsesTo" placeholder="до" onChange={handleInputChange}/>
                </div>

            </div>
        </div>
    );
});

export default FilterBar;