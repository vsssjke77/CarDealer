import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands} from "../http/brandAPI";
import {fetchModelsForBrand} from "../http/modelAPI";

const FilterBar = observer(() => {
    const {car,brand,model} = useContext(Context)
    const [brandChoosed, setBrandChoosed] = useState(false)



    useEffect(() => {
        car.clearFilters();
        fetchBrands().then(data => brand.setBrands(data))
    }, [car,brand]);




    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        car.setFilters({
            ...car.filters,
            [name]: value
        });

        if (name === "brand") {
            setBrandChoosed(value !== "");
            if (value !== "") {
                const models = await fetchModelsForBrand(value);
                model.setModelsForBrand(models);
                car.setFilters({
                    ...car.filters,
                    model: ""  // Сброс фильтра модели
                });
            } else {
                model.setModelsForBrand([]);
                car.setFilters({
                    ...car.filters,
                    model: ""
                });
            }
        }else if (name === "model") {
            car.setFilters({
                ...car.filters,
                model: value
            });
        }
    };

    const handleRangeInputChange = (e) => {
        const { name, value } = e.target;
        if (parseInt(value) < 0) return;  // Проверка на отрицательные значения

        car.setFilters({
            ...car.filters,
            [name]: value
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+'|| e.key === '/' || e.key === '*') {
            e.preventDefault();
        }
    };


    return (
        <div>
            <div>
                <div style={{width: "calc(80% + 10px)"}} className={"d-flex justify-content-center"}><h1 style={{margin: 0,fontSize: 26, color: 'white', display: "flex"}}>Фильтр</h1></div>
                <label className={"mt-2"} style={{color: "white"}}>Марка машины:</label>
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
            {brandChoosed && (
                <div>
                    <label style={{ color: "white" }}>Модель:</label>
                    <div>
                        <select
                            style={{ backgroundColor: "#D9D9D9", borderRadius: 5, width: "calc(80% + 10px)" }}
                            name="model" onChange={handleInputChange}
                        >
                            <option value="">Выберите модель</option>
                            {model.modelsForBrand.map(model =>
                                <option key={model.id} value={model.id}>{model.title}</option>
                            )}
                        </select>
                    </div>
                </div>
            )}

            <div>
                <label style={{color: "white"}}>Цена:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="priceFrom" placeholder="от" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="priceTo" placeholder="до" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                </div>
            </div>
            <div>
                <label style={{color: "white"}}>Год:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="yearFrom" placeholder="от" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="yearTo" placeholder="до" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                </div>
            </div>
            <div>
                <label style={{color: "white"}}>Пробег:</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="mileageFrom" placeholder="от" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="mileageTo" placeholder="до" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                </div>

            </div>

            <div>
                <label style={{color: "white"}}>Мощность (л.с.):</label>
                <div style={{gap: 10, width: "100%", display: 'flex'}}>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="horsesFrom" placeholder="от" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                    <input style={{width: "40%", backgroundColor: "#D9D9D9", border: "none", borderRadius: 5}}
                           type="number" name="horsesTo" placeholder="до" min="0" onChange={handleRangeInputChange} onKeyDown={handleKeyDown}/>
                </div>

            </div>
        </div>
    );
});

export default FilterBar;