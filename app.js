/* Author: Pablo Sagastizabal */

const url_format_element = document.getElementById("url_format");
const url_instance_element = document.getElementById("url_instance");

const summary_element = document.getElementById("summary");
const output_element = document.getElementById("object-output");


generatePathObject();

function generatePathObject() {
    const url_format = url_format_element.value;
    const url_instance = url_instance_element.value;

    /* Regex for extracting variables from url format. */
    const reg_exp_keys_format = /(?<=\:)(\w+?)(?=\/|$)/g;

    /* Regex for extracting constants from url format. */
    const reg_exp_constants = /(?<=\/)(\w+?)(?=\/|$)/g;

    /* Regex for extracting url parameters from url instance. */
    const reg_exp_keys_instance = /(?<=\?|\&)(\w+?)(?=\=)/g;

    /* Regex for extracting the values of the url parameters from url instance. */
    const reg_exp_values_instance = /(?<=\/|\=)(\w+?)(?=\/|\?|\&|$)/g;

    const constants = url_format.match(
        reg_exp_constants
    );

    const variables = url_format.match(
        reg_exp_keys_format
    );

    const parameters = url_instance.match(
        reg_exp_keys_instance
    );
    /* The keys are variables from url format and the url parameters from url instance. */ 
    const keys = [...variables, ...parameters];

    /* Removing contants extracted from url instance*/
    const values = url_instance
        .match(reg_exp_values_instance)
        .filter(value => !constants.includes(value));

    let result = {};

    for (let idx = 0; idx < keys.length; idx++) {
        result[keys[idx]] = values[idx];
    }
    output_element.innerHTML = "";



    /* Iterate the object to display the content in the HTML*/

    Object.keys(result).forEach(key => {
        let newDiv = document.createElement("div");
        let divContent = document.createTextNode(
        `"${key}": ${result[key]}`
        );
        if (typeof result[key] == "undefined") {
        newDiv.classList.add("warning");
        }
        newDiv.appendChild(divContent);
        output_element.appendChild(newDiv);
    });

    /* Filling summary element */
    summary_element.innerHTML = `/* The url is composed by ${constants.length} constant${constants.length > 1 ? 's' : ''}, ${variables.length} variable${variables.length > 1 ? 's' : ''}, and ${parameters.length} url parameter${parameters.length > 1 ? 's' : ''}. */`;
}
