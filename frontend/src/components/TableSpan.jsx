import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const TableSpan = ({ data }) => {
    console.log(Object.keys(data));
    return !Object.keys(data).length ? (
        <p>Nothing to show</p>
    ) : (
        <div className="column">
            <h2 className="subtitle">
                Showing <strong>{Object.keys(data).length} items</strong>
            </h2>
            <table className="table is-striped">
                <thead>
                <tr>
                    <th>Brand</th>
                    {Object.entries(data[Object.keys(data)[0]][0]).map(el =>
                        <th key={key(el)}>{capitalizeFirstLetter(el[0])}</th>)}
                </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(k => (
                        <>
                        <tr key={k}>
                            <td rowSpan={data[k].length}>{k}</td>
                            {Object.entries(data[k][0]).map(el => <td key={key(el)}>{el[1]}</td>)}
                        </tr>
                        {data[k].slice(1, data[k].length).map(el => (
                            <tr key={el.plate}>
                                {Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)}
                            </tr>
                        ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )};


export default TableSpan;